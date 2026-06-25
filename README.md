# Varient

UI library for whole websites — from modern to minimal, in every varient.

Foundation utilities, Framer Motion animations, and full-page sections. Copy-paste DX — you own the code.

## Monorepo structure

```
apps/docs     → Next.js 16 docs + marketing site (Fumadocs)
packages/ui   → Component library source
```

## Prerequisites

- Bun 1.2+

## Development

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) for the marketing site. Docs live at `/docs`.

## Scripts

| Command | Description |
| ------- | ----------- |
| `bun dev` | Start docs dev server (Turbopack) |
| `bun run build` | Build all packages |
| `bun run types:check` | Typecheck all packages |

## Design source of truth

See `DESIGN.md` for component specs, prop APIs, design tokens, and the build checklist.
