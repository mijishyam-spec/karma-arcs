#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "ERROR: DATABASE_URL is not set."
  echo "Example:"
  echo '  DATABASE_URL="postgresql://..." npm run db:seed:remote'
  exit 1
fi

echo "Applying migrations to remote database..."
npx prisma migrate deploy

echo "Seeding staging admin user..."
npx prisma db seed

echo "Staging database is ready."
