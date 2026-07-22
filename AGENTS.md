## Project Identity
Varient — OSS React UI component library covering three layers: Foundation (25 utility components, Radix-powered), Animated (30 Framer Motion components), and Sections (20 full-page blocks). Copy-paste DX model — users visit the docs, copy the code, paste into their project. They own the code.
Repo: TBD — add URL once pushed to GitHub
Owner: Piyush

## Non-Negotiables
- TypeScript strict, zero `any` — no exceptions; catches prop contract violations before they spread across 75 components
- Prop naming contract: `isDisabled` not `disabled`, `isLoading` not `loading` — consistency across all components is the contract
- Design tokens only: `--brand-500` not `#6366f1`, semantic names not raw Tailwind slate/zinc names — the visual identity is the product
- `cn()` for all className merging — import from `@/lib/utils`, never concatenate Tailwind classes as strings
- Never import shadcn defaults — Varient has its own color system, its own `--brand-500` indigo, its own token names

## Technical Accuracy Rules
- Before calling a component complete, verify every item in DESIGN.md §10 build checklist passes
- Never assume Tailwind v4 syntax matches v3 — config format and several utility names changed
- Radix UI primitives handle a11y complexity for Layer 1 — always check if Radix covers the component before building native
- Every Layer 2 animated component requires `useReducedMotion()` — shipping without it is an accessibility failure
- Live playground is non-negotiable for every Layer 2 component (DESIGN.md §13) — it is the library's biggest DX differentiator
- Layer 3 Sections compose from Layer 1 + Layer 2 — never duplicate component logic inside a section file

## Session Behavior

At session start:
1. Read CONTEXT.md §0. Orient to current focus before anything else.
2. Check .agents/skills/ for any SKILL.md whose description matches the current task. Load it.
3. If any loaded skill has `stale: true` — warn the user before proceeding. Recommend /update-skills.

Before making changes to an unfamiliar area:
- Read 2-3 existing examples of similar functionality in the codebase first.
- Follow the patterns found, not patterns assumed.
