use repoparser;

use std::path::Path;
use std::fs;
use libsql::Builder;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Database {
    pub name: String,
    pub packages: Vec<repoparser::Package>,
}

#[tokio::main]
async fn main() {
    let db_result = Builder::new_local("db/local.db").build().await;
    let db = db_result.expect("Failed to build the database");
    let client = db.connect().expect("Failed to connect to the database");

    client
        .execute(
            "CREATE TABLE repos (
                name TEXT PRIMARY KEY
            )",
            ()
        )
        .await
        .unwrap();
    client
        .execute(
            "CREATE TABLE packages (
                name TEXT NOT NULL,
                file_name TEXT NOT NULL,
                base TEXT,
                version TEXT NOT NULL,
                description TEXT,
                groups TEXT,
                compressed_size INTEGER,
                installed_size INTEGER,
                md5_sum TEXT,
                sha256_sum TEXT,
                pgp_signature TEXT,
                home_url TEXT,
                license TEXT,
                arch TEXT,
                build_date DATE,
                packager TEXT,
                replaces TEXT,
                conflicts TEXT,
                provides TEXT,
                repo TEXT NOT NULL,
                FOREIGN KEY(repo) REFERENCES repos(name)
            )",
            ()
        )
        .await
        .unwrap();

    let root_path = Path::new("./pkgs");
    let entries = fs::read_dir(root_path).unwrap();
    let mut pkg_databases: Vec<Database> = Vec::new();
    
    for entry in entries {
        let entry = entry.unwrap();
        let new_path = entry.path();
        let new_path_str = new_path.to_str().unwrap();
        let strip_path = &new_path_str[7..];
        if strip_path == "starttime" || strip_path == "endtime" || strip_path == ".gitkeep" || strip_path == "aur.json" {
            continue;
        }
        let database = Database {
            name: strip_path.into(),
            packages: Vec::new(),
        };

        pkg_databases.push(database);
    }

    // For each database, Store a list of all the folders inside
    for database_name in pkg_databases.clone() {
        let database_path = root_path.join(database_name.name.clone());
        let entries = fs::read_dir(database_path.clone()).unwrap();
        let mut packages_names: Vec<String> = Vec::new();
        let mut packages: Vec<repoparser::Package> = Vec::new();
        for entry in entries {
            let entry = entry.unwrap();
            let new_path = entry.path();
            let new_path_str = new_path.to_str().unwrap();
            let strip_path = &new_path_str[7..];
            packages_names.push(strip_path.into());
        }
        
        for package_name in packages_names {
            let package_path = root_path.join(package_name);
            let desc_path = package_path.join("desc");
            let desc = fs::read_to_string(desc_path).unwrap();
            let package = archlinux_repo_parser::to_string(&desc).unwrap();
            let package: repoparser::Package = archlinux_repo_parser::from_str(&package).unwrap();
            packages.push(package);
        }
    
        // Add packages to the database
        let mut db = pkg_databases.clone().into_iter().find(|x| x.name == database_name.name).unwrap();
        db.packages = packages;

        // Update the database
        let index = pkg_databases.iter().position(|x| x.name == database_name.name).unwrap();
        pkg_databases[index] = db;
    }

    // Insert the databases into the database
    for database in pkg_databases {
        client
            .execute(
                "INSERT INTO repos (name) VALUES ($1)",
                &[database.name.clone()]
            )
            .await
            .unwrap();
        for package in database.packages {
            client
                .execute(
                    "INSERT INTO packages (name, file_name, base, version, description, groups, compressed_size, installed_size, md5_sum, sha256_sum, pgp_signature, home_url, license, arch, build_date, packager, replaces, conflicts, provides, repo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)",
                    &[
                        package.name,
                        package.file_name,
                        package.base.unwrap_or("NULL".into()),
                        package.version,
                        package.description.unwrap_or("NULL".into()),
                        package.groups.map(|x| x.join(",")).unwrap_or("NULL".into()),
                        package.compressed_size.unwrap_or(0).to_string(),
                        package.installed_size.unwrap_or(0).to_string(),
                        package.md5_sum.unwrap_or("NULL".into()),
                        package.sha256_sum.unwrap_or("NULL".into()),
                        package.pgp_signature.unwrap_or("NULL".into()),
                        package.home_url.unwrap_or("NULL".into()),
                        package.license.map(|x| x.join(",")).unwrap_or("NULL".into()),
                        package.architecture,
                        package.build_date.to_string(),
                        package.packager,
                        package.replaces.map(|x| x.join(",")).unwrap_or("NULL".into()),
                        package.conflicts.map(|x| x.join(",")).unwrap_or("NULL".into()),
                        package.provides.map(|x| x.join(",")).unwrap_or("NULL".into()),
                        database.name.clone(),
                    ]
                )
                .await
                .unwrap();
        }
    }
}
