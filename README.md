# Varient

**The animation-first UI library for React Native + Web — one component API, two native-quality renderers.**

Varient is a universal component library built for teams who want Aceternity/Magic UI-grade animation and design on the web *and* the same components running natively on iOS/Android — from one shared API. Copy-paste DX: components live in your codebase, no per-component package installs, no black-box abstraction. The design system ships two themes — light and dark — switched by the `.dark` class, with an ember accent (`#FF5A1F`) on a neutral OKLCH gray ladder.

## Why Varient

- **Universal, not "web wrapped for native."** Each component ships a `component.tsx` (web) and a `component.native.tsx` (native) behind one shared `types.ts` props contract. Metro resolves the native file on React Native; web bundlers resolve the plain `.tsx`. No `react-native-web` — it can't do `backdrop-filter`, blend modes, or WebGL shaders, so the web build stays fully hand-tuned instead of being capped to native's lowest common denominator.
- **A design system worth copying.** Neutral-first surfaces, hairline borders, and semantic tokens — light and dark modes (`.dark`) with a single ember accent (`#FF5A1F`) used purposefully on interactive elements.
- **One source of truth for design tokens.** Token *values* live once in `packages/ui/src/tokens/index.ts` and are mirrored to web CSS variables (`themes.css` / `globals.css`) and applied natively via NativeWind `vars()`. Both platforms theme off the same numbers.
- **Copy-paste DX.** You own the code. No versioned npm dependency to upgrade around — components land directly in your project and you're free to modify them.
- **Animation-first.** Built to match or beat Aceternity, Magic UI, and Vengeance on visual polish — powered by Framer Motion + CSS/WebGL on web, Reanimated (+ Skia planned) on native.

## Monorepo layout

```
apps/
  docs/           Next.js 16 + Fumadocs marketing site & docs (pure web)
  mobile/         Expo SDK 57 demo / kitchensink app (native)
packages/
  ui/             The universal component library (@varient/ui, @varient/ui/native, @varient/ui/tokens)
```

## Tech stack

**Web** — Next.js 16 (App Router, Turbopack) · Tailwind CSS v4 · Framer Motion (`motion/react`) · Radix UI (foundation accessibility primitives) · Fumadocs · TypeScript strict.

**Native** — Expo SDK 57 (New Architecture) · React Native 0.86 · React 19.2 · NativeWind v4 (Tailwind v3 — a tracked bridge until NativeWind v5 / Tailwind v4 is production-ready) · Reanimated 4 (+ Skia planned for drawn effects like beams, meteors, particles).

**Shared** — TypeScript strict (no `any`) · `cn()` (clsx + tailwind-merge) · design tokens single-sourced in `packages/ui/src/tokens/index.ts` · Changesets · Bun workspaces + Turborepo.

## Prerequisites

- Node 20+
- Bun 1.3+

## Getting started

```bash
bun install
```

React Native/Metro requires a hoisted `node_modules`, so this repo pins `linker = "hoisted"` in `bunfig.toml` — no extra flags needed, just don't remove that setting.

## Running

### Web

```bash
bun dev
```

Opens the marketing site at [http://localhost:3000](http://localhost:3000); the docs live at `/docs`.

### Native

```bash
cd apps/mobile
```

See [`apps/mobile/README.md`](apps/mobile/README.md) for device/emulator setup and full run instructions.

## Scripts

Run from the repo root (fanned out to all workspaces via Turborepo):

| Command | Description |
| ------- | ----------- |
| `bun dev` | Start dev servers (Turbopack for docs) |
| `bun run build` | Build all packages |
| `bun run types:check` | Typecheck all packages |

## Design source of truth

See [`DESIGN.md`](DESIGN.md) for component specs, prop APIs, design tokens, and the build checklist every component must pass before merge.

## Status & roadmap

Varient is early and under active development.

**Shipped today:** a polished light/dark theme, a marketing site, and 3 components — Button, Input, NumberTicker (web). A universal spike proves the cross-platform architecture end-to-end: the shared token bridge and NumberTicker running natively via Reanimated.

**Next up:**
- Port ~8–10 signature animated components to both web and native — Marquee, Border Beam, Shimmer Button, Meteors, Spotlight, and more
- Docs site Web/Native switcher for side-by-side previews
- A CLI/registry for copy-paste installs (`npx varient add <component>`)
- Layer-3 "Sections" (full page-section compositions)

## License

Apache License 2.0 — see [`LICENSE`](LICENSE).
