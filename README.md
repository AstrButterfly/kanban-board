# Kanban Board

A small Kanban task tracker built with **Next.js (App Router)**, **TypeScript** and **PostgreSQL**.
This is a learning / portfolio project that is developed in small, well-described commits.

## Status

- [x] Project setup (Next.js, TypeScript, Tailwind CSS, ESLint, Prettier, Vitest)
- [x] PostgreSQL + Drizzle ORM, first migration (`users`)
- [x] User registration (validation with Zod, bcrypt password hashing)
- [ ] Sign in / sign out and sessions
- [ ] Boards, columns and tasks (CRUD)
- [ ] Drag-and-drop with persisted order
- [ ] CI (GitHub Actions) and deployment

## Tech stack

| Area         | Tools                                        |
| ------------ | -------------------------------------------- |
| Framework    | Next.js 16 (App Router, Server Actions)      |
| Language     | TypeScript                                   |
| Styling      | Tailwind CSS                                 |
| Database     | PostgreSQL 16                                |
| ORM          | Drizzle ORM + drizzle-kit (SQL migrations)   |
| Validation   | Zod                                          |
| Passwords    | bcryptjs                                     |
| Tests        | Vitest (unit + PostgreSQL integration tests) |
| Code quality | ESLint, Prettier                             |

## Getting started

Requirements: Node.js 20+ and Docker (for PostgreSQL).

```bash
# 1. Start PostgreSQL
docker compose up -d

# 2. Configure environment variables
cp .env.example .env

# 3. Install dependencies and create the database tables
npm install
npm run db:migrate

# 4. Run the app
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command               | What it does                                          |
| --------------------- | ----------------------------------------------------- |
| `npm run dev`         | Start the development server                          |
| `npm run build`       | Production build                                      |
| `npm run lint`        | Run ESLint                                            |
| `npm run typecheck`   | Run the TypeScript compiler without emitting files    |
| `npm run format`      | Format the code with Prettier                         |
| `npm test`            | Run the tests (needs the database from step 1)        |
| `npm run db:generate` | Create a new SQL migration from changes in the schema |
| `npm run db:migrate`  | Apply pending migrations to the database              |
| `npm run db:studio`   | Open Drizzle Studio to browse the data                |

## Project structure

```
src/
  app/                 Routes and pages (Next.js App Router)
    register/          Registration page, form and Server Action
  db/                  Database: connection, schema, error helpers
  lib/
    auth/              Business logic (registerUser)
    validation/        Zod schemas
    password.ts        bcrypt hashing helpers
drizzle/               Generated SQL migrations (commit them!)
docker-compose.yml     Local PostgreSQL
```

## Commit convention

[Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `docs:`, `test:`.
