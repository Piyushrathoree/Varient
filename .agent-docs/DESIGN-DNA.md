# DESIGN-DNA — Varient design system, portable edition

> **What this is:** a self-contained brief that lets an AI agent (or a human)
> revamp ANY web app to the exact design language now shipping in Varient.
> Copy this one file into the target repo and instruct the agent: *"Read
> DESIGN-DNA.md fully, then revamp this app to it."* Everything needed —
> tokens, recipes, anatomies, process — is below.
>
> **Provenance:** this language is Varient's own neutral-first system,
> battle-tested in the Varient docs site and component library.

---

## 1. The design thesis (read this before any pixel)

Clean, quiet, **neutral-first**: near-white/near-black zero-chroma surfaces,
hairline borders, soft small shadows, ONE brand color used purposefully
(links, active states, primary CTA, selection) — never as a decorative wash.
Motion is small, springy, and functional: things slide 0.2–0.3s with a
fast-out curve, toggles spring with low bounce, presses scale down instantly.
Typography is modest — semibold, tight tracking, small heading scale (an h2 is
`text-lg`, not `text-4xl`). The overall read: **friendly, product-grade,
effortless** — never flashy, never templated-AI (no purple gradients, no giant
glowing heroes, no aurora blobs).

Two themes only — **light and dark — switched by the `.dark` class**
(next-themes, `attribute: 'class'`, `defaultTheme: 'system'`). Never build a
multi-identity theme engine; never use a `data-theme` attribute for colors.
Tailwind `dark:` variants are correct and encouraged.

---

## 2. Stack assumptions

Built for **Next.js (App Router) + Tailwind CSS v4 + motion/react +
next-themes**, with Radix primitives where accessibility is hard (accordion,
etc.). If the target app differs:
- Tailwind v3 → move the `@theme inline` registrations into
  `tailwind.config.{js,ts}` `theme.extend.colors` etc.; keep the `:root`/`.dark`
  CSS variable blocks as-is.
- No motion/react → use CSS transitions with the same durations/curves (§6);
  the spring feel degrades gracefully to `cubic-bezier(0.22, 1, 0.36, 1)`.
- Interactive shared components must be `'use client'` if they're imported
  into Server Components (hooks in a barrel-imported file WILL break the build
  otherwise — this bit us).

---

## 3. The token system (copy this verbatim into the global CSS)

The palette is a 12-step **zero-chroma OKLCH gray ladder** (`smooth-50…1000`)
that FLIPS between modes, plus one brand slot. **To rebrand: change ONLY the
four `--color-brand*` values.** (Varient uses ember `#FF5A1F`.)

```css
@theme inline {
  --font-body: var(--font-inter);
  --font-title: var(--font-poppins);
  --shadow-custom: var(--shadow-custom);
  --shadow-custom-brand: var(--shadow-custom-brand);

  --color-brand: var(--color-brand);
  --color-brand-secondary: var(--color-brand-secondary);
  --color-brand-light: var(--color-brand-light);
  --color-brand-lighter: var(--color-brand-lighter);
  --color-smooth-50: var(--color-smooth-50);
  --color-smooth-100: var(--color-smooth-100);
  --color-smooth-200: var(--color-smooth-200);
  --color-smooth-300: var(--color-smooth-300);
  --color-smooth-400: var(--color-smooth-400);
  --color-smooth-500: var(--color-smooth-500);
  --color-smooth-600: var(--color-smooth-600);
  --color-smooth-700: var(--color-smooth-700);
  --color-smooth-800: var(--color-smooth-800);
  --color-smooth-900: var(--color-smooth-900);
  --color-smooth-950: var(--color-smooth-950);
  --color-smooth-1000: var(--color-smooth-1000);

  /* semantic slots — components use THESE, never smooth-N directly */
  --color-background: var(--color-smooth-50);
  --color-foreground: var(--color-smooth-1000);
  --color-primary: var(--color-smooth-100);          /* subtle raised surface */
  --color-primary-foreground: var(--color-smooth-950);
  --color-secondary: var(--color-smooth-200);
  --color-secondary-foreground: var(--color-smooth-900);
  --color-muted: var(--color-smooth-200);
  --color-muted-foreground: var(--color-smooth-800);
  --color-card: var(--color-smooth-50);
  --color-card-foreground: var(--color-smooth-1000);
  --color-popover: var(--color-smooth-50);
  --color-popover-foreground: var(--color-smooth-1000);
  --color-border: var(--color-smooth-500);
  --color-input: var(--color-smooth-600);
  --color-ring: var(--color-brand);
  --color-accent: var(--color-brand);
  --color-accent-foreground: #fff;
  --color-destructive: var(--destructive);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  /* BRAND SLOT — the only thing you change per project */
  --color-brand: #ff5a1f;            /* main brand */
  --color-brand-secondary: #f03e0c;  /* darker sibling (gradients, hovers) */
  --color-brand-light: #ff7e44;
  --color-brand-lighter: #ffa377;
  --destructive: #ef4444;

  --color-smooth-50: oklch(0.99 0 0);
  --color-smooth-100: oklch(0.98 0 0);
  --color-smooth-200: oklch(0.96 0 0);
  --color-smooth-300: oklch(0.95 0 0);
  --color-smooth-400: oklch(0.93 0 0);
  --color-smooth-500: oklch(0.91 0 0);
  --color-smooth-600: oklch(0.89 0 0);
  --color-smooth-700: oklch(0.83 0 0);
  --color-smooth-800: oklch(0.65 0 0);
  --color-smooth-900: oklch(0.62 0 0);
  --color-smooth-950: oklch(0.54 0 0);
  --color-smooth-1000: oklch(0.2 0 0);

  --radius: 0.625rem;                /* 10px — the house radius */
  --shadow-custom:
    0px 0px 0px 1px rgba(0, 0, 0, 0.08),
    0px 1px 2px -1px rgba(0, 0, 0, 0.08), 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  --shadow-custom-brand:
    0px 1px 2px rgba(0, 0, 0, 0.4),
    0px 0px 0px 1px var(--color-brand-secondary),
    inset 0px 0.75px 0px rgba(255, 255, 255, 0.2);
}

.dark {
  --color-smooth-50: oklch(20.02% 0 0);
  --color-smooth-100: oklch(22.64% 0 0);
  --color-smooth-200: oklch(25.62% 0 0);
  --color-smooth-300: oklch(27.68% 0 0);
  --color-smooth-400: oklch(30.12% 0 0);
  --color-smooth-500: oklch(32.5% 0 0);
  --color-smooth-600: oklch(36.39% 0 0);
  --color-smooth-700: oklch(43.13% 0 0);
  --color-smooth-800: oklch(54.52% 0 0);
  --color-smooth-900: oklch(59.31% 0 0);
  --color-smooth-950: oklch(70.58% 0 0);
  --color-smooth-1000: oklch(94.61% 0 0);
  --shadow-custom:
    0px -1px 0px 0px hsla(0, 0%, 100%, 0.06),
    0px 0px 0px 1px hsla(0, 0%, 100%, 0.06), 0px 0px 0px 1px #27272a,
    0px 1px 2px 0px rgba(0, 0, 0, 0.32), 0px 2px 4px 0px rgba(0, 0, 0, 0.32);
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}

::selection { @apply bg-brand-secondary/20 text-brand; }

:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}

html { scrollbar-gutter: stable; scrollbar-width: thin;
  scrollbar-color: var(--color-smooth-600) transparent; }

.gradient-brand { @apply from-brand-secondary to-brand bg-gradient-to-bl; }

/* the signature demo/preview canvas — dotted paper over a raised surface */
.frame-box {
  @apply bg-primary inset-ring-background border inset-ring-2
    before:absolute before:inset-0
    before:bg-[radial-gradient(var(--dots-color)_1px,transparent_1px)]
    before:[background-size:16px_16px]
    before:[--dots-color:--alpha(var(--color-foreground)/5%)];
}
```

**Usage discipline:** components reference semantic slots (`bg-background`,
`text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`,
`bg-muted`, `bg-card`, `text-brand`, `bg-brand`, `ring-ring`, `border-input`).
Direct `smooth-N` usage is allowed inside the CSS layer only. Never hardcode
hex in component classNames (the two sanctioned exceptions noted in §7).

---

## 4. Typography

- **Body:** Inter (`next/font/google`, variable `--font-inter`) — the default
  on `<body>` via `font-body`.
- **Titles:** Poppins 400–900 (`--font-poppins`) as `font-title` — headings,
  wordmark, hero. Used at MODEST sizes:

| Element | Classes |
|---|---|
| Page h1 | `text-3xl font-bold -tracking-wide` |
| Section h2 | `text-lg font-semibold tracking-tight` |
| h3 | `text-base font-semibold` |
| h4 | `text-sm font-semibold` |
| Body | `text-base` (prose) / `text-sm` (UI) `text-muted-foreground` |
| Labels/captions | `text-sm font-medium text-muted-foreground` |
| Hero display | `text-4xl md:text-5xl lg:text-6xl font-title font-semibold tracking-tight`, `text-wrap: balance` |

Mono only for code/kbd: `ui-monospace, 'JetBrains Mono', Menlo, Consolas`.
Wordmark pattern: two-tone — `<span>Vari</span><span class="text-brand">ent</span>`.

Root layout wiring:
```tsx
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], variable: '--font-poppins',
  weight: ['400','500','600','700','800','900'] });
<html className={`${inter.className} ${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
```
Theme provider: next-themes (or fumadocs RootProvider) with
`{ attribute: 'class', defaultTheme: 'system', enableSystem: true, themes: ['light','dark'] }`.

---

## 5. Surfaces & depth

- **Default card:** `rounded-xl border border-border bg-card shadow-sm`.
  Hoverable: `hover:border-foreground/20 hover:shadow-xl transition-shadow
  duration-300 ease-out motion-reduce:transition-none`.
- **Raised subtle surface** (inputs' container, chips, hover fills): `bg-primary`
  or `bg-muted`.
- **The dotted demo canvas:** `.frame-box` (§3) — every live component preview
  sits on it. `relative overflow-hidden rounded-lg` + generous centered padding.
- **Elevation shadow for real cards/menus:** `shadow-[var(--shadow-custom)]`.
- **Texture (hero/sections):** a repeating faint line-grid image
  (`.bg-lines-page`, light/dark PNG pair) behind heroes — subtle, never loud.
- Radius scale: controls `rounded-md` (8px), cards `rounded-xl` (14px),
  pills/nav `rounded-full`. One knob: `--radius: 0.625rem`.

---

## 6. Motion language

| Interaction | Spec |
|---|---|
| Press (any button) | `active:scale-[0.97]`, `transition-transform duration-150 ease-out` — instant, before async |
| Toggle thumb | motion/react spring `{ type: 'spring', duration: 0.25, bounce: 0.1 }` |
| Slide in/out (numbers, lists) | 0.3s `cubic-bezier(0.22, 1, 0.36, 1)` translateY ±100% + fade |
| Accordion | height keyframes 0.2s `ease-out` (Radix `--radix-accordion-content-height`) |
| Hover reveals | `transition` 150–300ms, opacity/transform only |
| Scroll reveals | `whileInView` fade+rise, once, 40–80ms stagger — sparing |

Rules: animate only `transform`/`opacity` in loops; every animation has a
`prefers-reduced-motion` fallback (`motion-reduce:transition-none`,
`useReducedMotion()` → `{ duration: 0 }`); no ambient/decorative perpetual
motion outside explicit demo components.

---

## 7. Component recipes (exact class strings)

Base button chassis:
```
inline-flex cursor-pointer items-center justify-center rounded-md font-medium
whitespace-nowrap ring-offset-background transition-transform duration-150
ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-ring focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50
```
Sizes: `h-9 px-4 text-sm` (sm) · `h-10 px-4 text-sm` (md) · `h-11 px-8 text-base` (lg).

Variants:
- **brand/CTA ("candy"):** `border-[0.5px] border-white/25 bg-gradient-to-b
  from-brand to-brand-secondary text-white shadow-black/20 shadow-md ring-1
  ring-(--ring-color)
  [--ring-color:color-mix(in_oklab,var(--color-foreground)_15%,var(--color-brand))]
  hover:from-brand-secondary hover:to-brand-secondary [&_svg]:drop-shadow-sm`
- **default (neutral):** `bg-primary text-primary-foreground shadow-xs hover:bg-primary/90`
- **secondary:** `bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80`
- **ghost:** `hover:bg-background hover:text-foreground hover:shadow-sm`
- **outline:** `border border-input bg-background shadow-xs hover:bg-accent
  hover:text-white dark:bg-input/30 dark:hover:bg-input/50`
- **destructive:** `bg-gradient-to-b from-[#FD4B4E] to-destructive text-white
  shadow-[0px_1px_2px_rgba(0,0,0,0.4),0px_0px_0px_1px_#F61418,inset_0px_0.75px_0px_rgba(255,255,255,0.2)]
  hover:from-destructive hover:to-destructive`
- **link:** `text-primary underline-offset-4 hover:underline`

**Input:** `border-input bg-background rounded-md border shadow-xs`; focus →
`focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]`;
error → `border-destructive ring-destructive/20`. Label
`text-sm font-medium text-foreground`, helper `text-sm text-muted-foreground`.

**Switch:** real `<button role="switch" aria-checked>`; track
`rounded-full p-0.5`, on `bg-brand`, off `bg-muted-foreground/30`; thumb
`rounded-full border border-border bg-background shadow-sm`, spring §6.
Sizes h-5/w-9 · h-6/w-11 · h-7/w-14.

**Tabs:** underline → transparent list, active trigger `border-b-2
border-brand text-foreground`, inactive `text-muted-foreground`. Pills →
list `bg-muted rounded-lg p-1`, active chip `bg-background shadow-sm
rounded-md` (neutral raised — NOT brand-filled).

**Badge:** `inline-flex items-center rounded-full font-medium` +
default `bg-primary text-primary-foreground` · brand `bg-brand/10 text-brand` ·
destructive `bg-destructive/10 text-destructive` · outline `border border-border
text-muted-foreground`. Sizes: `px-2 py-0.5 text-xs` / `px-2.5 py-0.5 text-sm`.

**Card:** compound (Header/Title/Description/Body/Footer), `p-6` rhythm,
title `font-title text-lg font-semibold tracking-tight`,
description `text-sm text-muted-foreground`. Surface per §5.

**Copy button:** icon swap Copy→Check on success, `text-emerald-500` success
tint, reverts after ~2s.

---

## 8. App shell anatomy

**Navbar** — floating pill: `sticky top-0 z-50` wrapper; inner
`rounded-full border border-border bg-background/80 backdrop-blur-xl` with
comfortable padding. Contents L→R: wordmark (two-tone, `font-title`), nav links
(`text-sm text-muted-foreground hover:text-foreground`, active gets a subtle
`bg-primary` pill), then GitHub icon + theme toggle + (optional) CTA. Mobile:
hamburger → slide-over. Theme toggle: Sun/Moon swap on next-themes
`resolvedTheme` (mounted-gate to avoid hydration mismatch).

**Footer** — brand column (wordmark + one-liner) + 3 link columns
(`text-sm`, headings `text-sm font-medium text-foreground`, links
`text-muted-foreground hover:text-foreground`), dotted divider, bottom row with
copyright + status pill + the credit line (§13).

**Docs sidebar** (for any browse-by-item section) — left rail, own scroll:
1. Search box visual (`bg-card border-border rounded-lg`) with `Ctrl K` kbd
   chips, wired to the app's search (⌘K).
2. Group labels: `text-xs font-medium uppercase tracking-wider text-muted-foreground`.
3. Items: `rounded-lg px-3 py-1.5 text-sm text-muted-foreground` + small lucide
   icon; hover `bg-primary text-foreground`; **active: `bg-brand/10 text-brand`**;
   optional right-aligned status dot (emerald=live, amber=beta, muted=planned).
4. Mobile: hidden below `lg`, replaced by a trigger button opening a drawer
   (scroll-lock + `inert` + Escape-to-close).

---

## 9. Detail/doc page anatomy (the item page)

Three-column: sidebar (§8) · content (max ~48rem) · right TOC rail (`xl:` only).
Content order is FIXED:
1. **Breadcrumb** (`text-sm text-muted-foreground`, current in `text-brand`)
2. **Title row** — h1 + status/category badges; one-sentence description
3. **Live preview stage** — bordered `rounded-xl` card: header bar with
   Preview/Code pill tabs + copy button; body = the real component rendered
   on `.frame-box`; Code tab = highlighted usage snippet
4. **Installation** — CLI tabs (two package flavors), command row
   `font-mono text-sm` + copy button
5. **Features** — plain bullet list, brand-colored dot markers
6. **Accessibility** — "Keyboard interactions" table (kbd chips) +
   "ARIA attributes" table (attribute/element/purpose)
7. **Props** — table: mono brand-colored prop name, mono muted type, default, description.
   Tables: `rounded-xl border border-border` wrapper (`overflow-x-auto`),
   `bg-muted/50` header row, `text-sm`, row dividers `border-border`.
8. **Right TOC** — "On this page", vertical hairline, active item `text-brand`
   with an accent trail segment; scroll-spy; respects reduced motion.

---

## 10. Landing page anatomy

Section order: **Hero → Features → Live slideshow → FAQ** (+ optional
testimonials/sponsors). Section headers: small eyebrow
(`text-sm font-medium text-brand`), modest title (`text-2xl md:text-3xl
font-title font-semibold tracking-tight`), one-line description — left-aligned.
Sections separated by hairline dividers/faint line-texture, generous `py-24+`.

- **Hero:** two-column (`lg:grid-cols-2`): left = announcement pill
  (live count/badge, links into the app), display headline, one-paragraph
  subhead, two CTAs (brand candy + outline), small "built with" text row;
  right = a 2-wide+4-single grid of **real live components in frame-boxes** —
  the product demos itself, no fake screenshot.
- **Features:** 4-card bento — `rounded-xl border bg-card p-6`, small icon,
  `text-base font-semibold` title, `text-sm text-muted-foreground` body.
- **Slideshow/gallery band:** every live item rendered small in a frame-box,
  auto-growing from the data source; CTA → the browse page.
- **FAQ:** Radix accordion, single-open, `border-b border-border` rows,
  chevron rotates, height animation §6.

---

## 11. Copy rules

Sentence case everywhere. Plain verbs on controls ("Copy", "Get started",
"Browse components") — a control says exactly what happens. Short headlines,
no "Build the future of X", no ✨-as-AI-decoration, no exclamation marks.
Errors say what went wrong + how to fix. Empty states invite an action.

---

## 12. Execution playbook (for the agent doing the revamp)

Order of operations — substrate first, then surfaces:
1. **Tokens + fonts + theme provider** (§3–4). If the app has an existing
   token vocabulary, add a temporary `@theme` compat-alias block mapping old
   class names onto the new slots so unported pages keep rendering — bridge,
   not destination; delete it when the port completes.
2. **Kill competing theming** — any multi-theme engine, `data-theme` color
   attributes, hardcoded palettes. Two modes, `.dark`, system default.
3. **Shell** (§8) → **item/detail pages** (§9) → **landing** (§10) →
   **shared components** (§7) → **content chrome** (prose/MDX per §4 scale).
4. Work with strict file ownership if parallelizing agents; freeze public
   component APIs — restyle classes, don't break props.

Pitfalls (each of these bit us — don't repeat them):
- Interactive shared components need `'use client'` (barrel imports into
  Server Components fail the build without it).
- Theme toggle must gate on mount before reading `resolvedTheme` (hydration).
- lucide-react has NO brand icons (Github etc.) — inline your own SVGs.
- Verify builds with the REAL exit code (`bun run build` / `next build`), not
  a `tail`-piped one; typecheck alone misses RSC and CSS-layer errors.
- Don't trust incremental/turbo-cached "green" — force one clean full build
  at the end.
- The `.frame-box` line-texture needs its light/dark PNG pair (or swap in a
  pure-CSS dot/line gradient — acceptable substitute).

Definition of done, per surface:
```
[ ] Matches the recipes/anatomy here (side-by-side sanity check)
[ ] Light AND dark correct; system default respected
[ ] 375px responsive; keyboard accessible; visible focus ring
[ ] prefers-reduced-motion fallback on every animation
[ ] Zero hardcoded hex in classNames (§3 exceptions only)
[ ] Full production build green (real exit code)
```

## 13. Branding

Wherever this system ships, use the project's own brand name and accent color.
No third-party design attribution is required.
