#!/bin/bash

# read the first argument

hasura_token=$1

curl 'https://pacsearch-api.b68.dev/v1/metadata' -X POST -H 'Content-Type: application/json' -H "x-hasura-admin-secret: $hasura_token" --data-raw '{"type":"bulk","source":"pacmandb","resource_version":3,"args":[{"type":"postgres_track_tables","args":{"allow_warnings":true,"tables":[{"table":{"name":"packages","schema":"public"},"source":"pacmandb"},{"table":{"name":"repos","schema":"public"},"source":"pacmandb"}]}}]}'
curl 'https://pacsearch-api.b68.dev/v1/metadata' --compressed -X POST -H 'Content-Type: application/json' -H "x-hasura-admin-secret: $hasura_token" --data-raw '{"type":"export_metadata","version":2,"args":{}}'

curl 'https://pacsearch-api.b68.dev/v1/metadata' -X POST -H 'Content-Type: application/json' -H "x-hasura-admin-secret: $hasura_token" --data-raw '{"type":"bulk","source":"pacmandb","resource_version":4,"args":[{"type":"pg_create_array_relationship","args":{"name":"packages","table":{"name":"repos","schema":"public"},"using":{"foreign_key_constraint_on":{"table":{"name":"packages","schema":"public"},"column":"repo"}},"source":"pacmandb"}},{"type":"pg_create_object_relationship","args":{"name":"repoByRepo","table":{"name":"packages","schema":"public"},"using":{"foreign_key_constraint_on":"repo"},"source":"pacmandb"}}]}'
curl 'https://pacsearch-api.b68.dev/v1/metadata' --compressed -X POST -H 'Content-Type: application/json' -H "x-hasura-admin-secret: $hasura_token" --data-raw '{"type":"export_metadata","version":2,"args":{}}'
