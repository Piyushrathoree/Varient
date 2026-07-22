# POLISH-SPEC — 2026-07-10 mass polish pass (all ~102 components)

You are one of ~102 agents, each polishing exactly ONE Varient component, driven by a fresh
full-library audit. This is a **polish pass, not a rebuild** — keep every public API working;
add, don't break. Read this whole file, then execute the component brief in your prompt.

## Context

- Monorepo: `packages/ui` (the library) + `apps/docs` (Next.js 16 + Tailwind v4 + motion/react + fumadocs).
- Design law: `.agent-docs/DESIGN-DNA.md` — read it once (neutral-first, ember brand, springs, quiet craft).
- Shared motion constants: `packages/ui/src/lib/animation.ts` (SPRING_DEFAULT/SPRING_SNAPPY/SPRING_BOUNCE/EASE_OUT/EASE_IN_OUT/DURATION/DURATION_INSTANT).
- **NEW shared utilities — use these instead of local copies:**
  - `packages/ui/src/lib/use-fine-pointer.ts` → `useFinePointer()` — gate pointer-tracking effects.
  - `packages/ui/src/lib/use-viewport-active.ts` → `useViewportActive(ref)` — pause perpetual loops (rAF, `repeat: Infinity`, setInterval cycles) while scrolled offscreen. Loops must stop burning CPU when not visible.
  - `packages/ui/src/lib/random.ts` → `seededUnit(seed)` — SSR-stable pseudo-random.
  Import them with relative paths inside packages/ui (e.g. `../../../lib/use-fine-pointer`).

## Your file ownership (strict — touch NOTHING else)

1. Your component dir: `packages/ui/src/components/<layer>/<dir>/**` (dir named in your prompt).
2. Your demo: `apps/docs/components/demos/<demo-file>` (named in your prompt).
3. Your mdx: `apps/docs/content/docs/<layer>/<slug>.mdx`.
4. Your NEW content module: `apps/docs/lib/components/content/<slug>.ts` (create it — see below).

**NEVER touch:** `packages/ui/src/index.ts` (barrel), `packages/ui/src/lib/*` (shared libs),
`apps/docs/lib/components/{demos.ts,registry.ts,content/index.ts,content-types.ts}`, any `meta.json`,
`apps/docs/app/global.css`, `apps/docs/components/{mdx.tsx,component-detail.tsx,components-gallery.tsx}`,
`apps/docs/components/{preview,site,marketing,docs}/**`, any other component's files, any package.json.
If you need a new barrel export, report it in `barrelAdd` — the orchestrator wires it.
Do NOT run installs, builds, or dev servers.

## The content module (REQUIRED for every component)

Create `apps/docs/lib/components/content/<slug>.ts`:

```ts
import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Dock } from '@varient/ui'\n\n<Dock items={...} />`,
  props: [{ title: 'Dock', rows: [{ name: 'items', type: 'DockItem[]', description: '…' }] }],
  features: ['…3-6 true, checked-against-source bullets…'],
  keyboard: [{ keys: 'Tab', description: '…' }],          // only if interactive
  aria: [{ attribute: 'role="toolbar"', element: 'Dock', purpose: '…' }],
  a11yNotes: ['…'],
  dependencies: ['@radix-ui/react-dialog'],               // npm deps beyond base; omit if none
  sourceFiles: ['packages/ui/src/components/animated/dock/dock.tsx'], // main file first, list ALL component files
};
```

Rules: read `apps/docs/lib/components/content-types.ts` first. `DocPropRow` matches the `PropRow`
shape your mdx already uses — copy rows from your mdx `<PropsTable props={[...]} />` and UPDATE them
to match the source after your changes (audits found drifted defaults; yours must be exact).
Every claim checked against the implementation. `sourceFiles` must list every file in your component
dir (the Code tab and the shadcn registry endpoint read them). Do NOT read
`apps/docs/components/component-detail.tsx` — it is being rewritten in parallel; your mdx + source
are the truth.

## Global sweeps (apply to your component even if the brief doesn't repeat them)

1. **Reduced motion is law.** Every animation gated via `useReducedMotion()` / `DURATION_INSTANT` /
   `motion-reduce:` — including plain Tailwind `active:scale-*` press classes
   (`motion-reduce:transition-none motion-reduce:active:scale-100`). Cycling timers (setInterval word
   rotators) should pause the cycle under reduced motion, not just skip the transition.
2. **Perpetual loops pause offscreen.** Any `repeat: Infinity`, rAF loop, or interval cycle gets
   `useViewportActive` gating. Ambient loops in ANIMATED-layer components are the product — keep them,
   but pause offscreen. In SECTIONS, perpetual decorative motion violates the design law: settle
   entrances after one or two iterations, or make looping an explicit opt-in prop.
3. **Tokens only.** Semantic tokens (`background/foreground/card/muted/primary/secondary/border/input/
   ring/brand/brand-secondary/brand-light/brand-lighter/destructive/success/warning`). No raw hex, no
   `gray-500`-family classes. Sanctioned exceptions: `emerald-500` copied-flourish; `bg-black/40`
   overlay scrims; physical-light values (glare/masks) parameterized via CSS vars; canvas/WebGL reading
   computed styles at runtime.
4. **No `lucide-react` inside packages/ui.** Inline SVG only (16×16 or 20×20 viewBox, `stroke="currentColor"`,
   `strokeWidth={1.75}`, `aria-hidden`). Demo files in apps/docs MAY use lucide-react.
5. **API conventions:** `'use client'` first line wherever hooks/motion are used; `forwardRef` where a
   DOM node is exposed; `isX` booleans for NEW props (never rename existing props — additive only);
   size/variant maps as `Record<Size, string>`; `cn()` from `../../../lib/utils`; export new types.
6. **Springs over tweens** for anything that moves positionally; `layout`/`layoutId` for anything that
   reflows. Loops animate only transform/opacity where feasible.
7. **A11y:** decorative layers `aria-hidden` + `pointer-events-none`; interactive elements keyboard-reachable
   with visible `focus-visible` rings; content is NEVER rendered only inside an `aria-hidden` wrapper.
8. **Presence calibration.** Where your brief says "presence bump", raise the default visual confidence
   (glow, density, tint) while staying neutral-first + ember-only — this is an animated library; the
   animated layer may be confident. Never add rainbow/purple gradients.

## Demo conventions

- `XDemo` (detail page): responsive grid of labeled variant/state cards:
  ```tsx
  <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
    <YourComponent ... />
    <span className="text-xs font-medium text-muted-foreground">Label</span>
  </div>
  ```
  in `grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3` (tune columns). Group with small headings.
  Every meaningful prop axis should be visible. Sections: your XDemo must demonstrate the CONTENT API —
  pass real custom props (copy/items/links), never mount bare defaults only.
- `XPreviewCompact` (gallery tile): ONE best-looking instance, minimal, must read well at ~300×160.
- **Do not rename the two demo exports** — `demos.ts` imports them by name.
- SECTIONS ONLY: in your mdx, change `<ComponentPreview name="<slug>" />` to
  `<ComponentPreview name="<slug>" variant="section" />` (full-bleed stage — the prop is being added
  in parallel; just set it).

## mdx upkeep

Update your mdx where your changes add variants/props (extend the inline `<PropsTable props={[...]}/>`
rows), and fix any doc-vs-source drift you find (audits flagged several stale defaults). Keep the
existing section structure (Installation/Usage/Props/Accessibility). Do not add new MDX shortcut
components — inline `<PropsTable props={[...]}/>` only.

## Definition of done

- [ ] Brief executed; public API backward-compatible
- [ ] Reduced-motion + offscreen-pause rules hold for every animation you own
- [ ] Tokens clean; no lucide inside packages/ui
- [ ] Demo = labeled card grid (or justified exception); compact = single best instance
- [ ] mdx accurate; content module created with exact props + sourceFiles
- [ ] No forbidden file touched; no installs/builds run

## Final report (StructuredOutput)

Fill the schema exactly: `slug`, `status` (done/partial/blocked), `files` (created/edited),
`barrelAdd` (new exports needing barrel wiring, else empty), `demoExports` (confirm the two names),
`notes` (behavior changes, new props, anything the orchestrator must know — terse).
