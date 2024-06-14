#!/bin/bash

echo $(date +"%s") > db/starttime

echo "Initializing local databases"

mkdir -p db
[ -f db/local.db ] && rm db/local.db
touch db/local.db

sqlite3 db/local.db <<EOF
CREATE TABLE repos (
    name TEXT PRIMARY KEY
);

CREATE TABLE packages (
    name TEXT NOT NULL,
    file_name TEXT NOT NULL,
    base TEXT,
    version TEXT NOT NULL,
    description TEXT,
    groups TEXT,
    compressed_size TEXT,
    installed_size TEXT,
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
);
EOF

echo "Completed initializing local databases"

echo $(date +"%s") > db/endtime