#!/bin/bash

echo "Updating local schema"

# Input Hasura Token
echo "Enter Hasura Token: "
read -s HASURA_TOKEN

pnpm gq https://pacsearch-api.b68.dev/v1/graphql \
    -H "X-Hasura-Admin-Secret: $HASURA_TOKEN" \
    --introspect > graphql/schema.graphql

echo "Schema updated"