use std::fs::File;
use std::io::BufReader; // (1)
use std::time::Instant;

use serde_json::Value;
use libsql::Builder;

fn load_from_file(path: &str) -> Value {
    let file = File::open(path).expect("a valid path");
    let reader = BufReader::new(file); // (2)
    serde_json::from_reader(reader).expect("successfully parsed JSON")
}

#[tokio::main]
async fn main() {
    let start = Instant::now();

    let db_result = Builder::new_local("db/local.db").build().await;
    let db = db_result.expect("Failed to build the database");
    let client = db.connect().expect("Failed to connect to the database");
    
    let mut data_source = load_from_file("pkgs/aur.json");

    client
        .execute(
            "INSERT INTO repos (name) VALUES ($1)",
            &["aur"]
        )
        .await
        .unwrap();

    for package in data_source.as_array_mut().unwrap() {
        let package = package.as_object_mut().unwrap();
        let name = package.get("Name").unwrap().as_str().unwrap();
        let version = package.get("Version").unwrap().as_str().unwrap();
        let file_name = name.to_string() + ".tar.gz";
        let base = package.get("PackageBase").unwrap().as_str().unwrap();
        let description = package.get("Description").unwrap_or(&Value::Null).as_str().unwrap_or("NULL");
        let home_url = package.get("URL").unwrap_or(&Value::Null).as_str().unwrap_or("NULL");
        let groups = "NULL";
        let compressed_size = "NULL";
        let installed_size = "NULL";
        let md5_sum = "NULL";
        let sha256_sum = "NULL";
        let pgp_signature = "NULL";
        let license = package.get("License").unwrap_or(&Value::Null).as_str().unwrap_or("NULL");
        let arch = package.get("Architecture").unwrap_or(&Value::Null).as_str().unwrap_or("NULL");
        let build_date = package.get("LastModified").unwrap_or(&Value::Null).as_str().unwrap_or("NULL");
        let packager = package.get("Maintainer").unwrap_or(&Value::Null).as_str().unwrap_or("NULL");
        let replaces = "NULL";
        let conflicts = "NULL";
        let provides = "NULL";
        let download_url = "https://aur.archlinux.org".to_string() + package.get("URLPath").unwrap().as_str().unwrap();

        client
            .execute(
                "INSERT INTO packages (
                    name,
                    file_name,
                    base,
                    version,
                    description,
                    groups,
                    compressed_size,
                    installed_size,
                    md5_sum,
                    sha256_sum,
                    pgp_signature,
                    home_url,
                    license,
                    arch,
                    build_date,
                    packager,
                    replaces,
                    conflicts,
                    provides,
                    download_url,
                    repo
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)",
                &[
                    name,
                    &file_name,
                    base,
                    version,
                    description,
                    groups,
                    compressed_size,
                    installed_size,
                    md5_sum,
                    sha256_sum,
                    pgp_signature,
                    home_url,
                    license,
                    arch,
                    build_date,
                    packager,
                    replaces,
                    conflicts,
                    provides,
                    &download_url,
                    "aur"
                ]
            )
            .await
            .unwrap();
    }

    println!("Elapsed time: {:?}", start.elapsed());
}