#!/bin/bash

echo "Index local database"

sqlite3 db/local.db <<EOF
CREATE INDEX idx_packages_name ON packages(name);
CREATE INDEX idx_packages_repo ON packages(repo);
EOF

echo "Completed indexing local database"