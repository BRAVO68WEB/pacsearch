#!/bin/bash

echo "Updating local schema"

[ -f .env ] && source .env

pnpm gq "$HASURA_GRAPHQL_URL" \
    -H "X-Hasura-Admin-Secret: $HASURA_TOKEN" \
    --introspect > graphql/schema.graphql

echo "Schema updated"