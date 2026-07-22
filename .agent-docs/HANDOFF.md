# HANDOFF — Varient session continuation

> **For the agent reading this:** full state transfer from the Claude Code sessions of 2026-07-06/07. Read top to bottom before touching the repo. This file lives in `.agent-docs/` (gitignored, local-only) alongside `DESIGN-DNA.md`, `IMPROVEMENT-SPEC.md`.

## What this project is

**Varient** — a copy-paste animated component library (like shadcn). Bun workspaces + Turborepo monorepo:

- `apps/docs` — Next.js 16 (App Router, Turbopack), Tailwind CSS v4, fumadocs, `motion/react`
- `packages/ui` — the component library (`@varient/ui`; components under `packages/ui/src/components/{foundation,animated}/…`)

## Non-negotiable environment rules

1. **All installs/builds/dev runs go through Windows PowerShell, never WSL:**
   ```
   powershell.exe -NoProfile -Command "cd 'A:\Codebase\OSS\stelth-ui-lib\Varient'; bun run build"
   ```
   WSL `/mnt/a` is too slow and lacks native bindings for `@tailwindcss/oxide` / `lightningcss`.
2. **Never pipe build output** (`| tail`) — the pipe masks the real exit code. Redirect to a file and read it separately.
3. **Turbo caches lie** — a "green" typecheck may be cached. Certify with a clean full build; confirm `cache miss` + `0 cached` in the log.
4. **All implementation is delegated to Sonnet subagents** (`Agent` tool, `model: sonnet`), strict disjoint file ownership per agent. The main loop orchestrates, reviews, integrates. Agents must NOT touch shared/coordination files (barrel `packages/ui/src/index.ts`, `apps/docs/lib/components/demos.ts`, `registry.ts`, any `meta.json`, `apps/docs/app/global.css`, `mdx.tsx`) — they report new exports back; the orchestrator wires them.
5. **Mockup before mass implementation** — get visual sign-off on an artifact mock BEFORE fanning out styling agents.
6. **Commit only when the user says so.**

## Design direction (user-approved)

Varient's own neutral-first design system. Two modes only (light/dark via `.dark` class through fumadocs RootProvider). `dark:` variants are correct usage. Tokens = OKLCH gray ladder + semantic slots in `apps/docs/app/global.css` (+ compat aliases). Ember `#FF5A1F` in the `--brand` slot. Fonts: Inter (body) + Poppins (display). Design law for UI agents: `.agent-docs/DESIGN-DNA.md`. Portable distillation for other projects: same file.

## State: DONE (build-certified)

- **Design system** — token system, docs shell, landing, component detail pages, restyled `packages/ui` foundation components. Old 4-theme engine fully removed.
- **10 new components** (9-agent Sonnet fan-out): Accordion, Dialog, DropdownMenu, Tooltip, Select, Checkbox, RadioGroup (all Radix-backed), Toast (hand-rolled `ToastProvider` + `useToast`), ButtonCopy + MagneticButton (animated). Plus docs backfill for badge/card/switch/tabs/number-ticker. 7 Radix primitives installed into `packages/ui`. New shared `packages/ui/src/lib/animation.ts` (SPRING_DEFAULT etc., barrel-exported).
- **Improvement/polish pass** (10-agent fan-out, driven by `.agent-docs/IMPROVEMENT-SPEC.md`):
  - GLOBAL (orchestrator owns global.css): `--radius` 0.625→0.875rem (rounds all token-mapped corners); registered `--color-success`/`--color-warning` (emerald/amber, dark-bright) — Badge referenced them but they were never defined, so those variants rendered colorless.
  - Per-component: Button sweep box-shadow→GPU scale-x; Input double-ring→single border+soft glow (+`filled`); Checkbox check path reversed to left→right; Radio enlarged +`card`; Switch `default`/`icons`/`labeled` +squash press; Badge `appearance`(soft/solid/outline/dot)×`shape`(pill/square)+icon; Tabs `layoutId` sliding indicator +underline/pills/segmented; Tooltip `color`(6)+`variant`(scale/slide/fade); Select spring-open+stagger+ghost/filled; Accordion default/separated/ghost; ButtonCopy square-loader→circular SVG spinner +label mode.
  - Every full demo is now a scrollable grid of labeled variant cards.
- Certified: clean PowerShell build, TypeScript clean, **43/43 static pages**. Shipped component count 17 (14 foundation + 3 animated).

## State: PENDING / OPEN (user-gated)

1. **Brand color** — ember `#FF5A1F` is the current brand; adjust the four `--color-brand*` values in `apps/docs/app/global.css` if the palette changes.
2. **Visual QA** — user restarts their own dev server (`bun dev` from PowerShell; kill any process on :3000 first) and compares in both modes.
3. **`DESIGN-DNA.md` tuning offer** — bake the other project's brand/stack in if wanted.
4. **Backlog** — mass-produce the remaining ~68 registry components on the new system (Sonnet fan-out, disjoint ownership).
5. `.bg-lines-page` texture PNGs live in `apps/docs/public/` — any project adopting DESIGN-DNA needs those copied or a CSS substitute.

## Known pitfalls already solved (don't re-trip)

- `useState`/hooks in a barrel-imported package component without `'use client'` breaks `next build`.
- `Github` icon no longer exported from lucide-react → `apps/docs/components/site/brand-icons.tsx` has inline SVGs. `packages/ui` has NO lucide dependency (inline SVG only there).
- Type-predicate filters need explicit narrowing (`(item): item is … => …`).
- EADDRINUSE on :3000 is the user's own dev server, not a bug.
- New component pattern: read `.agent-docs/DESIGN-DNA.md` + a sibling Radix component (accordion/select/tooltip) + `packages/ui/src/lib/animation.ts`; agents report barrel/demos/meta/registry lines back for the orchestrator to wire.

## User profile

Piyush. Wants speed; if stuck, ask instead of spinning. Blunt feedback. Orchestrator/Sonnet-subagent workflow is his explicit preference. Durable context lives in `~/.claude/projects/-mnt-a-Codebase-OSS-stelth-ui-lib-Varient/memory/` and auto-loads each session.
