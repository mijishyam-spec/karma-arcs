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

## Staging deployment (Vercel + Neon)

The app is configured for deployment to **Vercel** with a **Neon** PostgreSQL database.

### 1. Create Neon database

1. Create a project at [https://neon.tech](https://neon.tech)
2. Create a database named `karma_arcs`
3. Copy the pooled connection string (PostgreSQL)

### 2. Push code to GitHub

```bash
git remote add origin <your-github-repo-url>
git push -u origin cursor/phase-0-foundation-7702
```

### 3. Deploy to Vercel

1. Import the GitHub repository at [https://vercel.com/new](https://vercel.com/new)
2. Framework preset: **Next.js**
3. Set environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Neon pooled connection string |
| `AUTH_SECRET` | Output of `openssl rand -base64 32` |
| `AUTH_TRUST_HOST` | `true` |
| `NEXT_PUBLIC_APP_NAME` | `Karma Arcs` |

4. Deploy the project

The build runs `prisma migrate deploy` automatically before `next build`.

### 4. Seed staging admin user

After the first deploy, seed the staging database from your machine:

```bash
DATABASE_URL="your-neon-connection-string" npm run db:seed:remote
```

### 5. Verify staging login

```bash
AUTH_URL="https://your-app.vercel.app" npm run verify:auth
```

Then open `https://your-app.vercel.app/login` and sign in with:

- Email: `admin@karmaarcs.dev`
- Password: `admin123`

### Vercel CLI (optional)

```bash
npx vercel login
npx vercel link
npx vercel env add DATABASE_URL
npx vercel env add AUTH_SECRET
npx vercel env add AUTH_TRUST_HOST
npm run deploy:staging
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Run migrations, generate Prisma client, and build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Apply Prisma migrations (local dev) |
| `npm run db:seed` | Seed development data |
| `npm run db:seed:remote` | Migrate + seed a remote/staging database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run verify:auth` | Verify admin seed and login flow |
| `npm run deploy:staging` | Deploy preview via Vercel CLI |

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
- README and deployment configuration (Vercel + Neon)

Sprint 1 exit criteria met locally. Connect GitHub + Neon + Vercel to publish staging.

## License

Private — Karma Arcs internal use.
