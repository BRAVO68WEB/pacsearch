mod parser;

use std::path::Path;
use std::fs;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Database {
    pub name: String,
    pub packages: Vec<parser::Package>,
}

fn main() {
    let root_path = Path::new("./db");
    let entries = fs::read_dir(root_path).unwrap();
    let mut pkg_databases: Vec<Database> = Vec::new();
    
    for entry in entries {
        let entry = entry.unwrap();
        let new_path = entry.path();
        let new_path_str = new_path.to_str().unwrap();
        let strip_path = &new_path_str[5..];
        println!("strip_path: {:?}", strip_path);
        if strip_path == "starttime" || strip_path == "endtime" || strip_path == ".gitkeep" {
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
        let mut packages: Vec<parser::Package> = Vec::new();
        for entry in entries {
            let entry = entry.unwrap();
            let new_path = entry.path();
            let new_path_str = new_path.to_str().unwrap();
            let strip_path = &new_path_str[5..];
            packages_names.push(strip_path.into());
        }
        
        for package_name in packages_names {
            let package_path = root_path.join(package_name);
            let desc_path = package_path.join("desc");
            let desc = fs::read_to_string(desc_path).unwrap();
            let package = archlinux_repo_parser::to_string(&desc).unwrap();
            let package: parser::Package = archlinux_repo_parser::from_str(&package).unwrap();
            packages.push(package);
        }
    
        // Add packages to the database
        let mut db = pkg_databases.clone().into_iter().find(|x| x.name == database_name.name).unwrap();
        db.packages = packages;

        // Update the database
        let index = pkg_databases.iter().position(|x| x.name == database_name.name).unwrap();
        pkg_databases[index] = db;
    }

    // print databases
    println!("databases: {:?}", pkg_databases);
}
