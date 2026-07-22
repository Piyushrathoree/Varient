---
name: varient
description: Load this skill when the task involves or depends on Varient. Covers: OSS React UI component library, 3 layers, copy-paste DX.
last-verified: 2026-06-25
type: primary
stale: false
---

## What This Repo Does
Varient is an OSS React UI component library covering three layers — Foundation (25 Radix-powered utility components), Animated (30 Framer Motion components), and Sections (20 full-page blocks) — delivered via a copy-paste DX model where users own the code.

## Entry Points
- `packages/ui/src/index.ts` — main component library barrel export (to be created)
- `apps/docs/app/page.tsx` — landing page / marketing site (to be created)
- `apps/docs/app/docs/` — per-component MDX documentation (to be created)
- `DESIGN.md` — single source of truth for every architecture and component decision

## Core Architecture
The repo is a Bun monorepo with two workspaces: `apps/docs` (Next.js 16 docs + marketing site, powered by Fumadocs) and `packages/ui` (the component library source). Components are organised into three layers under `packages/ui/src/components/`: `foundation/`, `animated/`, and `sections/`. Sections compose from Layer 1 + Layer 2 — no logic is duplicated inside section files. Design tokens live in a single `globals.css`; every color, spacing, radius, shadow, and animation value is a CSS custom property (`--brand-500`, `--radius-md`, etc.) — raw values are never used in component code. The copy-paste model means there is no per-component npm package; users copy component files directly into their project.

## Conventions
- **Prop naming**: `isDisabled` not `disabled`, `isLoading` not `loading`, `isOpen` not `open` — `is` prefix for all boolean state props; `on` prefix for all event handlers
- **Class merging**: always `cn()` from `@/lib/utils` (clsx + tailwind-merge) — never string concatenation
- **Design tokens**: `--brand-500` not `#6366f1`; semantic names not raw Tailwind slate/zinc names
- **TypeScript**: strict mode, zero `any`; every component exports both the component and its props interface
- **Animated components**: always `'use client'` directive; always `useReducedMotion()` from Framer Motion; always provide a static fallback when reduced motion is preferred
- **Radix UI**: always use Radix primitives for Select, Modal, Tooltip, Dropdown, Checkbox, Radio, Switch, Tabs, Accordion, Toast, Slider, Progress, Separator, Avatar — never build native equivalents
- **forwardRef**: used on every component where DOM access is needed; `displayName` always set
- **Commit format**: `type(scope): description` — types: `feat` / `fix` / `docs` / `refactor` / `chore` / `test`
- **File naming**: kebab-case for files, PascalCase for components, camelCase for props/hooks, SCREAMING_SNAKE for constants

## Public Surface
The library exposes components via `packages/ui/src/index.ts`. Users do not install per-component packages — they copy source files. Each component page in the docs site provides the exact code to paste plus a dependency list.

Three layers of exports:
- **Foundation**: Button, Input, Textarea, Select, Checkbox, Radio, Toggle, Badge, Avatar, AvatarGroup, Card, Divider, Spinner, Progress, Tooltip, Modal, Drawer, Dropdown, Tabs, Accordion, Toast, Table, Pagination, Combobox, DatePicker, Slider, Navbar, Sidebar
- **Animated**: AnimatedGradientText, BorderBeam, ShimmerButton, Marquee, Particles, Globe, Spotlight, BentoGrid, NumberTicker, AnimatedBeam, OrbitingCircles, WordRotate, TypingAnimation, TextReveal, BlurFade, Confetti, Meteors, Ripple, PulsatingButton, RainbowButton, NeonGradientCard, SmoothCursor, AuroraBackground, WarpBackground, FlickeringGrid, AnimatedShinyText, ScrollProgress, IconCloud
- **Sections**: Hero, Features, Pricing, Testimonials, FAQ, CTA, LogoCloud, Stats, Team, Blog, Contact, Footer, Auth (SignIn/SignUp/ForgotPassword), NotFound, DashboardLayout, Waitlist, Changelog, Comparison

## Key Files
- `DESIGN.md` — complete component specs, prop APIs, visual specs, build checklist, naming conventions (source of truth)
- `AGENTS.md` — non-negotiables, technical accuracy rules, session behaviour for all AI agents
- `CONTEXT.md` — current focus, stack, settled decisions, contribution conventions, open questions
- `packages/ui/src/index.ts` — barrel export (to be created at scaffold)
- `apps/docs/app/layout.tsx` — root layout for the docs site (to be created)
- `packages/ui/src/lib/utils.ts` — `cn()` utility (first file to create)
- `packages/ui/src/styles/globals.css` — all design tokens as CSS custom properties (first CSS file to create)

## Gotchas
- Never import from shadcn — Varient has its own color system and token names
- Tailwind v4 config format differs from v3 — verify syntax before writing config
- Next.js 16 requires Node.js 20+; Turbopack is the default bundler (no webpack config needed for dev)
- All animated components are client components — `'use client'` is mandatory
- The live playground (DESIGN.md §9) is non-negotiable for every Layer 2 component; do not ship without it
- Layer 3 sections must compose from Layer 1 + Layer 2 only — never duplicate logic inside a section file
- Dark mode is the default for the docs/showcase site; every component must work in both modes
- Repo is at pre-scaffold stage — no source code exists yet; all structure is defined in DESIGN.md §2
