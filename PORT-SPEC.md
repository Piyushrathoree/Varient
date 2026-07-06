# PORT-SPEC — Varient adopts the SmoothUI UI (v1)

> **Read fully before writing a line.** This supersedes NOCTURNE-SPEC.md (deleted)
> and the color/type/motion sections of DESIGN.md. Component architecture,
> naming, and a11y rules in DESIGN.md §4/§10/§11 still apply.

## 0. The order

Piyush's exact direction: *"copy the ui — https://github.com/educlopez/smoothui —
this is the exact ui that i want, you can literally directly copy."*

So: **do not reinterpret, do not improvise. Copy.** SmoothUI is MIT-licensed
(verified) — direct copying is legal; we credit it (README + footer line).
When you must choose between "my taste" and "what SmoothUI does", SmoothUI wins.
Adapt only: branding (Varient, `npx varient add <slug>`), content (our registry,
our component demos), and stack differences listed below.

## 1. Source of truth (read these files, copy from them)

A full clone lives at:
`/tmp/claude-1000/-mnt-a-Codebase-OSS-stelth-ui-lib-Varient/f0f2bd08-f571-42d8-b9d2-9bf0b4191e32/scratchpad/smoothui`

Key paths inside it (all under `apps/docs/` unless noted):
- `app/global.css` — THE token system (light + dark via `.dark`), fonts, base styles
- `app/smoothui.css` — extra utility/animation css
- `app/layout.tsx` + `app/provider.tsx` — root layout, theme provider wiring
- `app/(home)/layout.tsx` + `app/(home)/page.tsx` — landing shell + page
- `app/docs/layout.tsx` + `app/docs/[...slug]/` — the docs three-column shell
- `components/landing/` — hero, features, faqs, footer, navbar/, section-header,
  components-slideshow, bg-lines, divider…
- `components/preview/`, `components/gallery/`, `components/ui/`, `mdx-components.tsx`
  — doc-page building blocks (preview frame, code tabs, installation, props)
- `packages/smoothui/components/` (repo root) — their actual library components
  (for restyling our packages/ui components to match)

## 2. Theming — hard rules

1. **Two modes only: light + dark**, switched by the `.dark` class (next-themes /
   fumadocs RootProvider). The 4-identity engine (`data-theme`, Nocturne/Studio/
   Paper/Aurora, ThemeIdentityProvider, ThemeSwitcher, theme-init-script,
   identities.ts, View-Transition wipe) is **REMOVED**. Never reference it.
2. **Token names = SmoothUI's names**, copied from their `global.css`
   (`--background`, `--foreground`, `--primary`, `--brand`, `--border` etc. —
   whatever the file actually defines, verbatim values included). Our brand
   accent may stay ember `#FF5A1F` wherever SmoothUI uses their pink `--brand`
   — same slot, our hue. Everything else: their values.
3. The substrate agent exposes **compat aliases** for the old semantic classes
   (`bg-bg-base→background`, `text-text-primary→foreground`,
   `text-text-secondary/tertiary`, `border-border`, `bg-accent`, `rounded-theme`,
   `shadow-theme`…) so not-yet-ported files keep rendering. New/ported code uses
   SmoothUI token classes directly.
4. Tailwind `dark:` variants are **allowed again** (SmoothUI uses them) — the
   `.dark` class is back as the one dark-mode mechanism.

## 3. Stack differences (the only allowed adaptations)

- We're on **Next 16 + Tailwind v4 + fumadocs + motion/react** — same family as
  SmoothUI. Port their markup/classes as-is; adjust imports to our paths.
- Our library import is `@varient/ui` (not `smoothui/…`). Keep our components'
  public APIs (Button, Input, Switch, Tabs, Badge, Card props) — restyle their
  visual look to match SmoothUI's equivalents, don't break props.
- Registry/data stays ours: `apps/docs/lib/components/registry.ts`,
  `lib/components/demos.ts` shapes are stable contracts.
- CLI line in docs: `npx varient add <slug>` (their pattern, our name).
- If SmoothUI uses a dep we don't have (e.g. `next-themes`, `cmdk`): add it to
  `apps/docs/package.json` — do NOT hand-roll a substitute. Note it in your
  final summary so the orchestrator can `bun install` once.

## 4. Quality floor (every file, before "done")

```
[ ] Looks like SmoothUI's equivalent surface (side-by-side with their source)
[ ] Light AND dark correct (`.dark`), 375px responsive
[ ] Keyboard accessible, visible focus, correct ARIA
[ ] prefers-reduced-motion respected
[ ] TS strict, no `any`; stable exports for files other agents compose
[ ] Zero references to the removed theme engine
```

## 5. Credit

Footer + README get one line: “UI design adapted from
[SmoothUI](https://smoothui.dev) by Edu Calvo (MIT).”
