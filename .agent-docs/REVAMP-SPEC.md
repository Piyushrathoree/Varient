# REVAMP-SPEC — "SIGNAL" identity (2026-07)

**This document is law for the dashboard revamp.** Every agent working on `apps/docs` or
`packages/ui/src/styles` reads this first and follows it exactly. It supersedes the visual
language in DESIGN-DNA.md (the *engineering* rules there — semantic tokens, reduced-motion,
two-mode theming, no new deps — still apply).

## 0. Thesis

Varient was warm neutral + ember orange (#FF5A1F). That identity is dead.

**SIGNAL** is a motion studio's instrument panel: cool blue-graphite surfaces, one luminous
**jade** accent with a **cyan** gradient partner (aurora, not flame), drafting-table structure
(hairline rails with `+` joints at section boundaries), and type set in **Sora** over
**Geist Sans**, with a single **Instrument Serif italic** accent word where it counts.

Never: purple/indigo gradients, orange/amber accents, warm creams, PNG textures, ambient
drop-shadow blobs. Depth = surface ladder + hairline + catch-light, same as before.

## 1. Color tokens

### 1.1 `apps/docs/app/global.css` — smooth ladder (cool graphite, hue ≈ 240–250)

`:root` (light) and `.light` (keep in exact sync):

```css
--color-smooth-50: oklch(0.99 0.002 240);
--color-smooth-100: oklch(0.977 0.003 240);
--color-smooth-200: oklch(0.96 0.004 240);
--color-smooth-300: oklch(0.945 0.005 240);
--color-smooth-400: oklch(0.925 0.006 240);
--color-smooth-500: oklch(0.9 0.007 240);
--color-smooth-600: oklch(0.87 0.008 240);
--color-smooth-700: oklch(0.81 0.009 240);
--color-smooth-800: oklch(0.61 0.015 240);
--color-smooth-900: oklch(0.55 0.018 240);
--color-smooth-950: oklch(0.45 0.02 240);
--color-smooth-1000: oklch(0.17 0.015 245);
```

`.dark`:

```css
--color-smooth-50: oklch(0.135 0.012 250);
--color-smooth-100: oklch(0.15 0.013 250);
--color-smooth-200: oklch(0.17 0.014 250);
--color-smooth-300: oklch(0.19 0.015 250);
--color-smooth-400: oklch(0.21 0.015 250);
--color-smooth-500: oklch(0.245 0.016 250);
--color-smooth-600: oklch(0.285 0.016 250);
--color-smooth-700: oklch(0.365 0.016 250);
--color-smooth-800: oklch(0.52 0.02 245);
--color-smooth-900: oklch(0.6 0.02 240);
--color-smooth-950: oklch(0.72 0.015 235);
--color-smooth-1000: oklch(0.95 0.008 230);
```

### 1.2 Brand slots — now MODE-SCOPED (move out of the single `:root` definition)

Light (`:root` and `.light`):

```css
--color-brand: #059669;          /* jade-600 — legible ink on light */
--color-brand-secondary: #047857;
--color-brand-light: #10b981;
--color-brand-lighter: #34d399;
--accent-gradient: linear-gradient(120deg, #059669, #0891b2);
```

Dark (`.dark`):

```css
--color-brand: #34d399;          /* jade-400 — luminous on graphite */
--color-brand-secondary: #10b981;
--color-brand-light: #6ee7b7;
--color-brand-lighter: #a7f3d0;
--accent-gradient: linear-gradient(120deg, #34d399, #22d3ee);
```

Status tokens: light `--success: #15803d; --warning: #b45309;` dark
`--success: #4ade80; --warning: #fbbf24;` (success is deliberately NOT the brand jade).
`::selection` → `background: color-mix(in oklch, var(--color-brand) 22%, transparent); color: var(--color-foreground);`

### 1.3 `packages/ui/src/styles/globals.css` — jade scale, ember becomes an alias

```css
--jade-50: #ecfdf5;  --jade-100: #d1fae5; --jade-200: #a7f3d0; --jade-300: #6ee7b7;
--jade-400: #34d399; --jade-500: #10b981; --jade-600: #059669; --jade-700: #047857;
--jade-800: #065f46; --jade-900: #064e3b;
```

- `--ember-*` variables REMAIN DEFINED but each aliases the matching `--jade-*`
  (`--ember-500: var(--jade-500);` etc.) with a comment marking them legacy. This retextures
  every component that still says `ember-*` without touching 100+ files.
- `--brand-*` aliases jade likewise. Add `--color-jade-*` entries in the `@theme` block
  mirroring the ember ones.
- Cool-shift the neutral ladder: `--neutral-950: #0b0e13; --neutral-900: #12151b;
  --neutral-850: #1a1e25; --neutral-800: #242933; --neutral-700: #3d434e;
  --neutral-600: #505866; --neutral-500: #6f7784; --neutral-400: #9fa7b2;
  --neutral-300: #ccd2da; --neutral-200: #e2e6ec; --neutral-100: #f2f4f7;
  --neutral-50: #f9fafc; --neutral-0: #ffffff;`
- Glows: `--glow-brand: 0 0 20px rgb(16 185 129 / 0.4); --glow-brand-strong: 0 0 28px rgb(16 185 129 / 0.45);`

### 1.4 `packages/ui/src/styles/themes.css`

Light: `--accent: var(--jade-600); --accent-hover: var(--jade-700); --accent-contrast: #ffffff;
--accent-gradient: linear-gradient(120deg, var(--jade-600), #0891b2);
--glow-theme: 0 0 0 3px rgb(5 150 105 / 0.18);`

Dark: `--accent: var(--jade-400); --accent-hover: var(--jade-300); --accent-contrast: #052e22;
--accent-gradient: linear-gradient(120deg, var(--jade-400), #22d3ee);
--glow-theme: 0 0 0 1px rgb(52 211 153 / 0.3), 0 0 18px -2px rgb(52 211 153 / 0.22);`

Update the file's header comment (EMBER references) to SIGNAL/jade.

### 1.5 Hardcoded hex cleanup (exactly these files)

- `packages/ui/src/components/animated/confetti-burst/confetti-burst.tsx` —
  `FALLBACK_BRAND_COLORS = ['#10b981', '#059669', '#34d399', '#22d3ee']`
- `packages/ui/src/components/animated/globe/globe.tsx` — update the comment's hexes to jade.
- `packages/ui/src/tokens/index.ts` — mirror the jade scale + cool neutrals (RN parity; keep
  exported names/shape identical, only values and comments change; if it exports `ember`,
  keep the key and point values at jade).
- `apps/docs/lib/components/content/grid-pattern.ts` — swap any orange/ember hex mentions to jade.

## 2. Typography

`apps/docs/app/layout.tsx`:

```tsx
import { Sora, Instrument_Serif } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora', weight: ['400','500','600','700','800'], display: 'swap' });
const serifAccent = Instrument_Serif({ subsets: ['latin'], variable: '--font-instrument-serif', weight: '400', style: ['normal','italic'], display: 'swap' });
```

`<html className={`${GeistSans.variable} ${GeistMono.variable} ${sora.variable} ${serifAccent.variable}`}>`
(body keeps `font-body`). Do not keep Inter/Bricolage imports.

`apps/docs/app/global.css` `@theme inline` font slots (KEEP the token names so existing
`font-title` / `font-body` classes everywhere keep working):

```css
--font-body: var(--font-geist-sans);
--font-title: var(--font-sora);
--font-serif-accent: var(--font-instrument-serif), Georgia, serif;
--font-mono: var(--font-geist-mono), ui-monospace, 'JetBrains Mono', monospace;
```

(`--font-display` compat alias stays → `var(--font-title)`.)

Type scale attitude: headings `font-title font-semibold tracking-[-0.03em]`, section H2s are
LARGER than the old design (`text-3xl sm:text-4xl`), hero H1 `text-5xl sm:text-6xl lg:text-7xl`.
Eyebrows: `font-mono text-[11px] uppercase tracking-[0.18em] text-brand` prefixed with `//`
(e.g. `// why varient`). The italic serif accent (`font-serif-accent italic`) appears in the
hero H1 and MAY appear in the CTA headline — nowhere else.

## 3. New/changed global utilities (phase 1 writes them; section agents ONLY consume)

All defined in `apps/docs/app/global.css`:

- `.bg-aurora` — hero backdrop: two radial glows, brand + cyan:
  ```css
  .bg-aurora {
    background:
      radial-gradient(42% 50% at 30% 0%, color-mix(in oklch, var(--color-brand) 13%, transparent), transparent 70%),
      radial-gradient(34% 42% at 72% 0%, rgb(34 211 238 / 0.09), transparent 70%);
  }
  ```
- `.bg-noise` — inline SVG feTurbulence data-URI overlay, `opacity: 0.025` dark / `0.035` light.
- `.plus-mark` — a 9×9 `+` glyph drawn with two background gradients in `--color-smooth-800`;
  positioned via composition (`absolute -left-[4.5px] -top-[4.5px]` etc.).
- `.section-rails` — content-width wrapper with `border-inline: 1px solid var(--color-border)`.
- Vertical marquee: `@keyframes marquee-up { from{transform:translateY(0)} to{transform:translateY(-50%)} }`,
  `marquee-down` reversed; `.animate-marquee-up { animation: marquee-up var(--marquee-duration, 42s) linear infinite; }`
  `.animate-marquee-down` likewise; `.marquee-col:hover` pauses; reduced-motion disables.
- `.aurora-border` — animated conic border for the CTA panel:
  ```css
  @property --beam-angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
  @keyframes beam-spin { to { --beam-angle: 360deg; } }
  .aurora-border { position: relative; }
  .aurora-border::before {
    content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
    background: conic-gradient(from var(--beam-angle), transparent 0%, var(--color-brand) 12%, rgb(34 211 238/0.9) 20%, transparent 32%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    animation: beam-spin 6s linear infinite; pointer-events: none;
  }
  ```
  (reduced-motion: static 1px `color-mix(brand 40%)` border instead.)
- `.glass` — `background: color-mix(in oklch, var(--color-smooth-50) 78%, transparent); backdrop-filter: blur(14px) saturate(1.4);`
- `.bg-lines-page` is REDEFINED as the CSS fine-grid texture (`.bg-grid-fine` equivalent) so
  legacy references keep rendering; `--lines-page`/PNG references are deleted.
- Keep: `.bg-grid-lines`, `.bg-grid-fine`, `.bg-dot-grid`, `.mask-fade-radial(-top)`,
  `.spotlight-surface`, `.skeleton-shimmer`, `.text-gradient-brand` (now aurora via
  `--accent-gradient`), marquee-left/right, accordion keyframes, prose rules, fd-* overrides.
- `--radius: 0.75rem;` (slightly tighter than 0.875 — instrument-panel crispness).

## 4. Section briefs (`apps/docs/components/…`)

Global rules for every section: composition uses `section-rails`-style hairline structure with
`plus-mark` joints at top corners of each section boundary; eyebrow → H2 → description via the
new `SectionHeader`; motion via `motion/react` springs (stiffness ~260, damping ~30), staggered
reveals `whileInView` once; ALL motion behind `useReducedMotion()` or `motion-reduce:`.

### 4.1 `marketing/hero-section.tsx` — full rebuild (owner: hero agent)

Centered, full-bleed. Backdrop: `bg-aurora` + `bg-grid-lines mask-fade-radial-top` + `bg-noise`.
Content: announcement pill (live shipped count via existing registry import, pulsing jade dot,
link to /components) → H1 `Build interfaces that feel <em class="font-serif-accent italic text-gradient-brand">alive</em>`
→ one-sentence sub → CTA row: primary (jade bg, `--glow-brand` on hover, arrow micro-slide) +
ghost secondary → an install one-liner `npx shadcn add …` in a mono chip with working copy
button. Below, edge-to-edge **demo wall**: 3 columns (2 on mobile) of live `@varient/ui` demo
tiles auto-scrolling vertically (`animate-marquee-up`/`-down` alternating), duplicated content
for the loop, top/bottom fade masks, pause on hover. Reuse the demos the current hero imports;
tiles are hairline cards (`frame-box` successor style: bg-smooth-100, border, radius-lg).
Page-load: one orchestrated stagger (pill → H1 → sub → CTAs → wall fades in). Keep export name
`HeroSection` and any props.

### 4.2 `marketing/features-section.tsx` — "Engineered for motion"

Replace 4-card bento with a 6-card grid (3×2 desktop, 2 cols tablet, 1 mobile): Animated by
default · Copy-paste ownership · Web + React Native · Tailwind v4 tokens · Accessible motion
(reduced-motion aware) · TypeScript strict. Each card: hairline surface, small animated
micro-visual in the card header built with plain motion/CSS (e.g. three staggered spring bars,
a cursor-following dot, a flipping token chip — keep each under ~30 lines), lucide icon, title,
2-line body. Hover: `spotlight-surface` + border brightens to `border-brand/40`. Scroll-reveal
stagger. Export `FeaturesSection`.

### 4.3 `marketing/component-bento-showcase.tsx` — becomes the **Component Theater**

Same file, same export name (`ComponentBentoShowcase`) so `page.tsx` imports keep working.
New internals: a category tab rail (`Foundation / Animated / Sections`, motion `layoutId`
active pill) above a large **stage** — a tall hairline frame (bg-dot-grid backdrop) rendering
one live demo at a time with `AnimatePresence` crossfade — plus a thumbnail strip (4–6 curated
demos per category, name + tiny preview, click to put on stage, jade ring on active). Curate
from existing lazy demos (globe, dock, animated-beam, marquee, spotlight-card, price-flow,
confetti-burst, morphing-tabs …). Each stage view links to `/components/[slug]`. "Browse all
113 components →" link below. Export unchanged.

### 4.4 `marketing/stats-section.tsx` — "Numbers band"

Thin full-width band framed by hairlines top/bottom with plus-joints: 4 slots separated by
vertical hairlines — shipped count (animated count-up on view, `tabular-nums`), `2 platforms`
(web + native), `60fps spring physics`, `MIT · 0 lock-in`. Values in `font-title text-4xl`,
labels in mono eyebrow style. Count-up honors reduced motion (renders final value). Export
`StatsSection`.

### 4.5 `marketing/tech-marquee-section.tsx` — dual-row opposing marquees

Two rows (`animate-marquee-left` / `-right`), chips carry the tech names as now; chips are
monochrome (`text-smooth-900 border-border bg-smooth-100`) and gain `text-brand
border-brand/40` on hover; gradient edge fade masks both sides. Heading shrinks to a single
mono eyebrow: `// runs on your stack`. Export unchanged.

### 4.6 `marketing/cta-section.tsx` — the aurora panel

One large centered panel (`rounded-2xl aurora-border bg-smooth-100`), inside: `bg-dot-grid
mask-fade-radial`, H2 `Stop shipping static.` (optionally one serif-italic word), one line of
sub-copy, install command block (mono, copy button, `$` prompt prefix), primary CTA "Browse
components" + ghost "Star on GitHub". Export `CtaSection`.

### 4.7 `marketing/faq-section.tsx` — split layout

Two-column ≥`lg`: left column sticky (`SectionHeader` + short support links to /docs and
GitHub issues), right column the Radix accordion restyled: hairline separators only (no card
boxes), question rows `font-title text-base`, plus icon that rotates 45° when open (motion),
answer `text-smooth-900`. Keep JSON-LD schema + content. Export unchanged.

### 4.8 `marketing/section-header.tsx`, `divider.tsx`, `bg-lines.tsx`, `dot-grid-mask.tsx`

- `SectionHeader`: mono `//`-prefixed jade eyebrow, `font-title text-3xl sm:text-4xl
  tracking-[-0.03em]` title with `text-wrap: balance`, `text-smooth-900` description, same props.
- `Divider`: hairline with a centered `+` joint (plus-mark), fade to edges.
- `bg-lines.tsx`: now renders the CSS grid texture wrapper (no PNGs).
- `dot-grid-mask.tsx`: keep, retuned opacity for new surfaces.

### 4.9 `site/site-header.tsx` — pill dies, glass bar arrives

Full-width sticky header: transparent at top; after ~24px scroll gains `.glass` + bottom
hairline. Inside a `max-w-7xl` row: left — brand mark (9×9 jade rounded square with a white
spark/asterisk glyph) + `varient` in `font-title font-semibold lowercase tracking-tight`;
center (absolute-centered, hidden `md:flex`) — Components / Docs / Showcase links with a
motion `layoutId` underline on hover/active; right — ⌘K search chip (bordered, mono `⌘K` kbd),
GitHub icon, `ThemeToggle`. Mobile: hamburger → full-screen overlay (AnimatePresence) with
staggered oversized links. Keep all current wiring (CommandMenu trigger, routes, aria). Export
unchanged.

### 4.10 `site/site-footer.tsx` — the monument footer

Top: link columns as now (restyled: mono column headings, `text-smooth-900` links that slide
2px + turn brand on hover). Middle: giant wordmark `VARIENT` spanning the container
(`font-title font-bold uppercase`, `text-[clamp(4rem,14vw,12rem)]`, `leading-none`,
`text-transparent` with `-webkit-text-stroke: 1px var(--color-smooth-700)`; on hover a
`text-gradient-brand` fill sweeps in). Bottom bar between hairlines: © 2026 Varient · MIT,
"Built for the motion-obsessed", live status dot (pulsing jade) + "All systems ship", shipped
count. Export unchanged.

### 4.11 `site/theme-toggle.tsx` + `site/command-menu.tsx`

Toggle: same next-themes wiring, new look — bordered square chip, icon swap animated with
AnimatePresence (sun rays rotate out / moon rotates in). Command menu: restyle surfaces to
smooth ladder + jade active row, `font-mono` shortcut hints; keep behavior + provider API.

### 4.12 `app/(home)/page.tsx` + `app/(home)/layout.tsx` (composition agent ONLY)

New section order: Hero → TechMarquee → Features → Theater(ComponentBentoShowcase) → Stats →
FAQ → CTA (CTA is last-before-footer for conversion). Wrap sections in the rail structure:
one `div.section-rails.relative` containing all sections, `plus-mark` joints at each section
boundary (small absolutely-positioned elements at the rail intersections), `Divider` between
sections. Layout keeps `MotionConfig reducedMotion="user"`, header/footer, CommandMenuProvider.

### 4.13 Gallery surface (`components-gallery.tsx`, `site/components-sidebar.tsx`,
`app/(home)/components/layout.tsx`, `component-detail.tsx`, `components/preview/*`)

Restyle to SIGNAL (tokens do most of it): sidebar active items get jade text + `inset 2px 0 0`
jade rail; layer filter chips become mono-label chips with layoutId active pill; search inputs
`bg-smooth-100 border-border focus:ring-brand`; cards hairline + spotlight hover; detail page
header gets mono eyebrow + `font-title` H1 + jade copy-button feedback; preview stage chrome
(replay/theme buttons) becomes bordered chip cluster. NO behavioral changes: keep scroll-spy,
deep links, lazy mounting, provider contexts, exports, props.

## 5. Copy (use verbatim unless it collides with real data)

- Hero H1: `Build interfaces that feel alive` (italic serif on "alive")
- Hero sub: `Varient is an open-source library of animated, copy-paste components for React
  and React Native — spring physics, semantic tokens, zero lock-in.`
- Eyebrows: hero pill `v1 · {count} components shipped`; features `// why varient`; theater
  `// the collection`; stats `// at a glance`; marquee `// runs on your stack`; faq `// answers`;
  cta `// get started`.
- Features H2: `Engineered for motion`. Theater H2: `See them run`. FAQ H2: `Answers, upfront.`
  CTA H2: `Stop shipping static.`

## 6. Hard rules for every agent

1. **File ownership is absolute.** Touch only the files your brief assigns. NEVER edit
   `apps/docs/app/global.css`, `apps/docs/lib/components/demos.ts`, `registry.ts`,
   `packages/ui/src/index.ts`, or another agent's files. Need a new keyframe/utility? Define
   it locally in your component (inline `<style>` is banned — use motion variants, Tailwind
   arbitrary values, or a `styles` const with the `style` prop).
2. **Semantic tokens only.** `bg-background`, `text-foreground`, `text-brand`, `bg-smooth-*`,
   `border-border`, `ring-brand`… Raw hex is banned in TSX (exceptions listed in §1.5).
   Never `dark:` overrides for colors the tokens already flip.
3. **Keep public surface identical**: export names, props, provider contexts, route behavior,
   aria labels/roles, JSON-LD, analytics.
4. **Reduced motion is sacred**: every animation gated by `useReducedMotion()` (from
   `motion/react` or the local hook) or `motion-reduce:` classes.
5. **No new dependencies.** `motion`, `lucide-react`, `@radix-ui/react-accordion`,
   `@varient/ui`, `geist` are what exist.
6. **TypeScript strict; Next 16 App Router; RSC boundaries stay as they are** (`'use client'`
   stays where it is; add it only if you add hooks to a server file — prefer not to).
7. Verify your file compiles in your head: imports exist, JSX balanced, no unused vars.
8. Do NOT run builds/dev servers (WSL is banned for this repo; the orchestrator builds at the
   end via PowerShell).
9. When done, return a 3-line summary: what you built, files touched, anything the
   orchestrator must know (e.g. "expects utility X from global.css").
