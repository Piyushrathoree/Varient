# IMPROVEMENT-SPEC — component polish pass (2026-07-07)

You are one of several agents improving EXISTING Varient components based on direct user feedback. This is a **polish/upgrade pass, not a rebuild** — keep each component's public API working; add, don't break. Read this whole file, then your component-specific brief.

## The user's cross-cutting complaints (apply to everything)

1. **"Everything is too squarish / edgy — make it rounded-squarish everywhere."** The global `--radius` was just raised to `0.875rem`, so the token-mapped utilities `rounded-sm/md/lg/xl` are already rounder. Your job: make sure your component uses soft corners — `rounded-md`/`rounded-lg`/`rounded-xl` (token-driven) or `rounded-full`. **Never** leave a sharp or barely-rounded corner. Small controls should read as soft rounded rectangles, not boxes. Do NOT hardcode arbitrary tiny radii like `rounded-[0.3rem]` — prefer the token utilities.

2. **"Most components feel like Base UI — make them better: animation, smoothness, design."** Raise the craft. Springs over linear tweens, motion that feels physical and intentional, layout animations for anything that moves (use `layout` / `layoutId` from motion). Import shared springs from `@varient/ui` (`SPRING_DEFAULT`, `SPRING_SNAPPY`, `EASE_OUT`) — or the local `../../../lib/animation` inside packages/ui. Every animation MUST be gated by `useReducedMotion()`.

3. **"Give multiple options for the smaller components, and show each variation as its own card so I can scroll and compare."** See the two rules below.

## Multi-variant rule

For components flagged "add types/styles/variants" in your brief: add a **new prop** (usually `variant` — or extend the existing one) offering **2–4 genuinely distinct visual styles**, each polished. Keep the current default visually close to today's look unless the brief says the current look is bad. New union types are additive and must not change existing prop names/behavior.

## Demo card-grid rule (IMPORTANT — this is what the user sees)

Every demo file exports the SAME two names as today (e.g. `ButtonDemo`, `ButtonPreviewCompact`) — do not rename them; `demos.ts` imports them and you must not touch `demos.ts`.

- **`XDemo` (full detail-page demo):** present the variants/states as a **responsive grid of labeled cards** so the user can scroll and compare. Each card:
  ```tsx
  <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
    <YourComponent variant="..." />
    <span className="text-xs font-medium text-muted-foreground">Variant name</span>
  </div>
  ```
  Lay them out in `grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3` (tune columns to the component — tiny things like badges can go 2–3 per row inside one card too). The `PreviewFrame` grows vertically to fit — a tall grid is fine and expected; the page scrolls. Group related states with small section headings (`text-sm font-medium text-muted-foreground`) if helpful, matching the existing switch-demo tone.
- **`XPreviewCompact` (gallery grid card):** keep it a SINGLE representative, best-looking instance. Minimal, no card grid — it renders inside a small preview tile.

## Hard rules

- First line `'use client';` on any file using hooks/state/motion.
- `forwardRef` where a DOM node is exposed. `isX` boolean prop names (`isDisabled`, `isChecked`). Size maps as `Record<Size, string>`. `cn()` from `../../../lib/utils`.
- **Semantic tokens ONLY** (no raw hex, no `gray-500`-style palette classes): `background, foreground, card, card-foreground, popover, popover-foreground, muted, muted-foreground, primary, primary-foreground, secondary, secondary-foreground, border, input, ring, brand, brand-secondary, brand-light, brand-lighter, destructive, success, warning`. (`success`/`warning` are newly available — emerald/amber, dark-mode aware. `bg-success/10 text-success` etc. now work.) The one sanctioned literal is `emerald-500` for a "copied/done" flourish, already used elsewhere.
- Icons inside `packages/ui`: inline SVG only (no `lucide-react` there). Demo files in `apps/docs` MAY use `lucide-react`.
- **Do NOT touch any shared/coordination file:** `packages/ui/src/index.ts` (barrel), `apps/docs/lib/components/demos.ts`, `apps/docs/lib/components/registry.ts`, any `meta.json`, `apps/docs/app/global.css`, `apps/docs/components/mdx.tsx`, or any component you don't own. If you add a NEW exported type/name that belongs in the barrel, REPORT it — the orchestrator wires it.
- You MAY edit your own component's `.mdx` doc page to document new variants (inline `<PropsTable props={[...]} />` — do not touch `mdx.tsx` or `props-table.tsx`).
- Do NOT run installs, builds, or dev servers.

## Reference material

- `.agent-docs/DESIGN-DNA.md` — the Varient design law (visual/motion language).
- Exemplars already in-repo: `switch.tsx` (API + reduced-motion), `card.tsx` (compound), `button.tsx` (variant maps), `switch-demo.tsx` (demo tone).

## Final message format (raw data, no prose)

- BARREL_ADD: any new exported names/types to add to the barrel (or "none")
- DEMO_EXPORTS: confirm the two demo export names are unchanged
- FILES: files you created/edited
- NOTES: anything the orchestrator must know (behavior changes, new props)
