# Karma Arcs

Architecture & Construction Management platform — Phase 0 foundation.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS
- **shadcn/ui** components
- **PostgreSQL** via Prisma
- **Auth.js v5** (credentials + JWT sessions)
- Deployed on **Vercel** + **Neon**

## Getting started

```bash
npm install
cp .env.example .env   # set DATABASE_URL and AUTH_SECRET
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Dev credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@karmaarcs.dev | admin123 |
| Architect | architect@karmaarcs.dev | dev123 |
| Supervisor | supervisor@karmaarcs.dev | dev123 |
| CRM | crm@karmaarcs.dev | dev123 |
| Purchase | purchase@karmaarcs.dev | dev123 |
| Accounts | accounts@karmaarcs.dev | dev123 |

## Sprint 2 deliverables

- Role-based access control (6 roles)
- App shell with sidebar + mobile nav
- Placeholder pages for all modules
- Activity log utility
- File upload API (`POST /api/upload`)
- Search filter utilities
- Seeded dev users for every role

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:seed` | Seed local database |
| `npm run db:seed:remote` | Seed remote (set `DATABASE_URL`) |

## Staging

https://karma-arcs.vercel.app

After deploy, re-seed the Neon database:

```bash
DATABASE_URL="..." npm run db:seed:remote
```
