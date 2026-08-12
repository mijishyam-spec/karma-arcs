# Karma Arcs

Architecture & Construction Management platform for Karma Arcs.

This repository contains the Phase 0 foundation: authentication, PostgreSQL database, and a protected dashboard stub. CRM, site reports, and role-based navigation are added in later sprints.

## Prerequisites

- Node.js 20+
- PostgreSQL 16+
- npm

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with your PostgreSQL connection string and auth secret.

Generate an auth secret:

```bash
openssl rand -base64 32
```

4. Run database migrations:

```bash
npm run db:migrate
```

5. Seed the development admin user:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

7. Open [http://localhost:3000/login](http://localhost:3000/login) and sign in.

## Development admin credentials

For local development and staging only:

| Field | Value |
|-------|-------|
| Email | `admin@karmaarcs.dev` |
| Password | `admin123` |

Do not use these credentials in production.

## Verify setup

With the dev server running:

```bash
npm run verify:auth
```

This checks that the seeded admin user exists and that login/session works.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Generate Prisma client and build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Apply Prisma migrations |
| `npm run db:seed` | Seed development data |
| `npm run db:studio` | Open Prisma Studio |
| `npm run verify:auth` | Verify admin seed and login flow |

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- PostgreSQL + Prisma
- Auth.js (credentials provider)

## Project structure

```
src/
  app/
    (auth)/login/     # Login page
    (dashboard)/      # Protected dashboard stub
    api/auth/         # Auth.js routes
  components/         # UI and auth components
  lib/                # Auth, Prisma, utilities
prisma/
  schema.prisma       # Database schema
  seed.ts             # Development seed data
```

## Sprint 1 status

Completed:

- Next.js scaffold
- shadcn/ui theme
- Prisma schema and migrations
- Auth.js login/logout
- Protected dashboard stub
- Admin seed and verification script

Next (Sprint 1 task 1.9):

- Staging deployment

## License

Private — Karma Arcs internal use.
