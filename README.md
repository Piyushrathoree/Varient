# Varient

UI library for whole websites — from modern to minimal, in every varient.

Foundation utilities, Framer Motion animations, and full-page sections. Copy-paste DX — you own the code.

## Monorepo structure

```
apps/docs     → Next.js 16 docs + marketing site (Fumadocs)
packages/ui   → Component library source
```

## Prerequisites

- Node.js 20+
- pnpm 10+

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the marketing site. Docs live at `/docs`.

## Scripts

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Start docs dev server (Turbopack) |
| `pnpm build` | Build all packages |
| `pnpm types:check` | Typecheck all packages |

## Design source of truth

See `DESIGN.md` for component specs, prop APIs, design tokens, and the build checklist.
