# SHOWCASE-SPEC — 2026-07-10 docs-app revamp (7 agents, A1–A7)

You are one of 7 agents revamping the Varient showcase app (`apps/docs`). Read
`.agent-docs/DESIGN-DNA.md` first (design law), then your section. Global rules from
`.agent-docs/POLISH-SPEC.md` apply (tokens, reduced motion, copy voice, focus rings).
User-approved direction: quiet workbench chrome; spotlight strip; real source in the Code tab;
docs for every component via per-slug content modules; replay + per-preview theme controls;
⌘K dogfooding the library's own CommandPalette; lazy-mounted demos.

**Strict file ownership per agent — never edit another agent's files, any component in
`packages/ui`, any demo, any mdx, `demos.ts`-consumers you don't own, `registry.ts`,
`content/index.ts`, or any `meta.json`. ~112 other agents are editing components/demos/mdx in
parallel — expect files to change under you; do not rely on any specific demo's internals.**
Do NOT run installs/builds. Report via the structured schema (`slug` = your agent id, e.g. "A1").

Shared contracts (already true or being built in parallel — code against them):
- `apps/docs/lib/components/content-types.ts` — `ComponentDocContent` (usage/props/features/keyboard/
  aria/a11yNotes/dependencies/sourceFiles).
- `apps/docs/lib/components/content/index.ts` — `docContentBySlug`, `getDocContent(slug)`. Currently an
  empty record; ~112 per-slug modules land in parallel and the orchestrator regenerates the index.
  Code defensively: absent content → skip sections gracefully.
- `registry.ts` gained `isNew?: boolean` on `ComponentEntry`.
- New shared hooks exported from `@varient/ui`: `useFinePointer`, `useViewportActive`, `seededUnit`.
- A1 ships `components/preview/preview-stage.tsx` (see A1) — A3 imports it.
- A7 ships `SITE_URL` in `lib/shared.ts` — A3 imports it.

---

## A1 — Preview infrastructure + performance
**Owns:** `apps/docs/lib/components/demos.ts`, `apps/docs/components/preview/**` (all files; may add
`lazy-mount.tsx`, `preview-stage.tsx`).

1. **demos.ts → lazy.** Convert every entry of both maps to `next/dynamic` per-slug imports so routes
   stop shipping all 102 demos:
   `button: dynamic(() => import('@/components/demos/button-demo').then(m => m.ButtonDemo))`.
   KEEP the file path, export names, and `getDemo(slug, compact?)` signature exactly — other surfaces
   import them. `ssr: false` ONLY for `globe` (WebGL); everything else stays SSR. Keep both maps' keys
   identical to today (grep the current file). No loading spinners — `loading: () => null` is fine
   (LazyMount provides the placeholder).
2. **`preview/lazy-mount.tsx` (new).** `<LazyMount minHeight?: number | string, rootMargin?: string>`
   — renders an empty placeholder div (the given min-height) until the wrapper first nears the viewport
   (IntersectionObserver, default rootMargin '250px'), then mounts children permanently. SSR-safe
   (render placeholder on server; if IO unavailable, mount immediately).
3. **`preview/preview-stage.tsx` (new).** The stage used by the detail page and mdx previews:
   `<PreviewStage minHeight alignTop stageKey?>` renders PreviewFrame styling + a slim top-right
   control cluster INSIDE the frame: Replay (⟳ icon button — bumps an internal key to remount
   children; `aria-label="Replay animation"`) and Preview theme (sun/moon icon button cycling
   inherit → light → dark; implement by wrapping children in `<div className={cn('contents…')}>`
   — apply `light`/`dark` class + `bg-background text-foreground` on the canvas div so tokens flip
   only inside the stage; `aria-label="Preview theme"`; a `.light` token block is being added to
   global.css in parallel by A6 — just use the class). Controls: quiet `icon-button` styling
   (border-transparent → hover border-border bg-card), focus rings, `motion-reduce` safe.
4. **PreviewFrame:** keep API; extract the dotted-canvas styling so PreviewStage reuses it.
5. **`preview/component-preview.tsx` (mdx's preview):** add `variant?: 'default'|'section'` —
   'section' renders full-bleed (minHeight 'section', alignTop, p-0) fixing the sections
   double-framing; switch it to render through PreviewStage (so every mdx preview gets replay/theme
   controls) wrapped in LazyMount.
6. **`preview/component-card.tsx`:** wrap the live preview in `<LazyMount>`; render a quiet `NEW`
   chip when `entry.isNew` (mono 9px uppercase, `text-brand bg-brand/10 border-brand/30`, top-right);
   keep hover lift/border affordances; keep status branches.
7. **`preview/section-preview-scale.tsx`:** keep, but derive the scale transform from a single
   `--section-scale` custom property instead of three magic numbers.

## A2 — Gallery revamp
**Owns:** `apps/docs/components/components-gallery.tsx`, `apps/docs/components/site/gallery-nav-context.tsx`,
`apps/docs/app/(home)/components/page.tsx`.

The workbench. Keep the sidebar contract (anchors + scroll-spy via gallery-nav-context) working.
1. **Toolbar** (sticky below site header, `top-[76px]`-ish, `z-30`, backdrop-blur hairline):
   layer segmented control — dogfood `ToggleGroup variant="segmented"` from `@varient/ui` —
   `All | Foundation | Animated | Sections`; horizontally-scrollable category chip row for the active
   layer (pill chips, active = `text-brand bg-brand/10 border-brand/30`); search field right
   (keep Input + clear button; add `⌘K` Kbd hint that focuses… the ⌘K menu belongs to A4 — the hint
   is just visual, `<Kbd>` chip).
2. **URL state:** sync `?layer=` and `?q=` via `history.replaceState` (read once on mount) so filters
   deep-link. Keep hash-anchor behavior for categories.
3. **Spotlight strip** at top of the unfiltered "All" view only: three editorial tiles at full width
   (grid `1.4fr 1fr 1fr`, taller frames) for slugs `['dock','hero-highlight','globe']` (constant at
   top of file), each a live compact demo in a LazyMount'd frame with name + "Open ↗" affordance
   linking to the detail page. Hidden whenever a query/layer/category filter is active.
4. **Grid:** keep category sections + counts; entrance = staggered blur-fade (gated); card hover
   affordances live in A1's ComponentCard — don't duplicate.
5. **Counts line** under the h1 stays accurate from the registry; add a quiet "N new this week" chip
   when any `entry.isNew`.
6. Empty state: "No components match — clear search" with a real clear button.

## A3 — Component detail page
**Owns:** `apps/docs/components/component-detail.tsx`, `apps/docs/app/(home)/components/[slug]/page.tsx`,
`apps/docs/lib/components/source.ts` (new). Read-only: `docs/props-table.tsx` (reuse `PropsTable`,
do NOT change its `PropRow` shape).

1. **Server page** (`[slug]/page.tsx`): stays SSG. Per slug: look up registry entry +
   `getDocContent(slug)`; resolve source files — `content.sourceFiles` if present, else fall back to
   listing `packages/ui/src/components/<layer>/<dir>` via the slug→dir map in `source.ts` (handle
   `skeleton-loader→skeleton`, `meteor-shower→meteors`, `404-page→not-found-page`, `toggle-group→toggle`);
   read each file (`fs.readFileSync`, repo-root-relative via `path.join(process.cwd(), '../..')` —
   verify cwd is `apps/docs` at build) and highlight with shiki (already a transitive dep; use
   `codeToHtml` with `themes: { light: 'github-light-default', dark: 'github-dark-default' }`,
   `defaultColor: false` so the existing `.shiki` CSS-variable theming applies; cache the highlighter
   instance module-level). Pass `{ entry, content, sources: [{ fileName, code, html }] }` to the
   client component. Build must not fail on a missing dir — fall back to empty sources.
2. **ComponentDetail (client):** DELETE the `propsBySlug`/`usageBySlug`/`contentBySlug` maps entirely.
   Render from props: breadcrumb → badges (+ NEW when `entry.isNew`) → title/description →
   **stage** (PreviewStage from A1 with Preview/Code pill tabs; Preview = live demo; Code = file tabs
   per source file, highlighted HTML (`dangerouslySetInnerHTML`), line numbers via CSS counters,
   sticky copy button copying the raw file, `max-h-[36rem] overflow-auto`) →
   **Installation**: tab 1 "Copy source" (primary): sentence pointing at the Code tab + a command row
   `bun add <content.dependencies.join(' ')>` when deps exist (else "No extra dependencies.");
   tab 2 "shadcn CLI": command row `npx shadcn@latest add ${SITE_URL}/r/${slug}.json` (SITE_URL from
   `lib/shared.ts`, landing in parallel via A7). REMOVE the fake `npx varient add` command everywhere →
   **Features / Accessibility (keyboard + ARIA tables + notes) / Props** from `content` via the
   existing gate pattern (absent → section skipped, TOC updates) — render props with `PropsTable`
   (rows are already `PropRow`-shaped) → prev/next + TOC (keep).
3. **Copy buttons** get `aria-live="polite"` "Copied" announcement (extend usage of
   `site/copy-button.tsx` if it already supports it — that file belongs to A4; if it doesn't support
   aria-live, wrap locally rather than editing it).
4. Usage snippet: `content.usage` when present, else the current generic fallback.

## A4 — Shell + ⌘K dogfood
**Owns:** `apps/docs/components/site/site-header.tsx`, `site/site-footer.tsx`,
`site/components-sidebar.tsx`, `site/copy-button.tsx`, `site/command-menu.tsx` (new),
`apps/docs/app/(home)/layout.tsx`.

1. **`site/command-menu.tsx` (new):** the site ⌘K built on the library's own `CommandPalette` from
   `@varient/ui` (dogfood — flagship overlay finally used by its own site). Groups: per layer
   (Foundation/Animated/Sections) listing all shipped registry entries (name + category hint; select →
   `router.push('/components/<slug>')`), then "Docs" (Getting started → /docs), then "Actions"
   (Toggle theme via next-themes; Open GitHub). Global hotkey ⌘K/Ctrl+K (guard inputs/textareas),
   mounted once in `(home)/layout.tsx` via a small provider/context exposing `openCommandMenu()`.
2. **Header:** two-tone wordmark (`Vari` + brand `ent`, `font-title`, replacing text+dot — keep the
   pill chrome); add a search affordance button (magnifier + `⌘K` Kbd chip, opens command menu);
   keep theme toggle + GitHub (single URL source: import `gitConfig` from `lib/shared.ts` — do not
   hardcode).
3. **Footer:** two-tone wordmark; GitHub URL from `gitConfig`.
4. **Sidebar:** its search button opens the command menu (replace `useSearchContext` usage);
   keep nav/scroll-spy contract with A2's gallery untouched.
5. **copy-button.tsx:** add polite `aria-live` "Copied" announcement (keep API).

## A5 — Landing polish
**Owns:** `apps/docs/app/(home)/page.tsx`, `apps/docs/components/marketing/**` (except `frame.tsx`,
which A6 deletes — don't import it).

1. **Hero showcase leads with motion:** `SHOWCASE_SLUGS` → wow-first compact demos, e.g.
   `['border-beam','shimmer-button','number-ticker','button-copy','switch','marquee']` (verify each
   compact demo reads well small; adjust freely — 2 wide + 4 single grid stays). Wrap tiles in
   A1's `LazyMount` if trivially importable; otherwise leave (above-the-fold anyway).
2. **Announcement-badge shimmer:** stop the infinite loop — sweep once on mount + once per hover
   (respect reduced motion).
3. **Bento showcase band:** keep 8 cells but rebalance toward animated wow (globe cell lazy;
   hero-highlight; tilt-card; animated-beam; dock; sparkles; terminal; marquee) — pick what renders
   well; each cell links to its detail page; LazyMount below-fold cells.
4. **Section order** per DESIGN-DNA §10: Hero → Features → showcase band → Stats → marquee → CTA → FAQ
   (i.e., move Features above the bento band).
5. Stats stay registry-driven; sweep marketing copy for sentence case/plain verbs; keep JSON-LD FAQ.
6. Landing must stay 60fps: everything below the fold LazyMount'd or `whileInView`-gated.

## A6 — Infra cleanup
**Owns:** `apps/docs/app/global.css`, `apps/docs/next.config.mjs`,
`apps/docs/content/docs/index.mdx`; deletions: `apps/docs/motion/springs.ts`,
`apps/docs/components/marketing/frame.tsx`.

1. **`.light` token block** in global.css: duplicate the `:root` light values (the `--color-smooth-*`,
   `--shadow-custom`, `--lines-page`, `--color-input`, success/warning/sidebar/accent-soft/skeleton
   vars) under a `.light { … }` selector so a `light`-classed subtree inside a dark page renders
   correctly (powers per-preview theme toggles). Keep values EXACTLY in sync with `:root`.
2. **Delete dead weight, verify-then-cut (grep first, delete only on zero hits):** the
   "COMPAT ALIASES" `@theme inline` block + its `:root`/`.dark` companion vars (check each alias:
   `bg-base|bg-subtle|bg-muted[^-]|bg-elevated|border-strong|text-primary|text-secondary|text-tertiary|
   accent-hover|accent-contrast|accent-soft|radius-theme|shadow-theme|glow-theme|font-display` — note
   `font-display` IS used; keep any used alias and delete only unused ones), `.shadow-custom-btgray`
   (dangling `--color-bt-gray`), `apps/docs/motion/springs.ts` (0 importers), 
   `apps/docs/components/marketing/frame.tsx` (0 importers). Keep `--skeleton-shimmer` etc. that are used.
3. **next.config.mjs:** `experimental.optimizePackageImports: ['@varient/ui', 'lucide-react']`
   (verify key name for Next 16 — may be top-level `optimizePackageImports`).
4. **content/docs/index.mdx:** fix stale counts (Foundation 32+ / Animated 45+ / Sections 25+ — write
   "112 components" era copy: counts will grow by 10 this week; phrase loosely: "110+ components"),
   remove "First up: Button" stale line.

## A7 — Real shadcn registry endpoint
**Owns:** `apps/docs/app/r/**` (new), `apps/docs/lib/shared.ts`.

Make the shadcn CLI command REAL: `npx shadcn@latest add <SITE_URL>/r/<slug>.json`.
1. **`lib/shared.ts`:** export `SITE_URL` — `process.env.NEXT_PUBLIC_SITE_URL ?? 'https://varient.dev'`.
2. **`app/r/[slug]/route.ts`** (note: shadcn fetches `…/r/<slug>.json` — implement
   `app/r/[...slug]/route.ts` or `app/r/[slug]/route.ts` matching `<slug>.json` by stripping the
   suffix; simplest: `[slug]` segment where the param arrives as `dock.json` → strip `.json`).
   `export const dynamic = 'force-static'` + `generateStaticParams` over shipped registry slugs
   (param WITH `.json` suffix so the static file is emitted at the right path). GET returns
   registry-item JSON: `{ $schema: 'https://ui.shadcn.com/schema/registry-item.json', name: slug,
   type: 'registry:ui', title: entry.name, description: entry.description,
   dependencies: [...(content.dependencies ?? []), 'motion', 'clsx', 'tailwind-merge'],
   files: sources.map(s => ({ path: `ui/varient/${basename}`, type: 'registry:ui', content: s.code })) }`.
   Resolve sources exactly like A3 (content.sourceFiles → fallback dir scan; share nothing — write
   your own small resolver; slug→dir exceptions: skeleton-loader→skeleton, meteor-shower→meteors,
   404-page→not-found-page, toggle-group→toggle). Missing content module → still serve with
   fallback-scanned files. Also **`app/r/registry.json/route.ts`** (or `app/r/route.ts`) serving the
   registry index `{ $schema: …/registry.json, name: 'varient', homepage: SITE_URL, items: [...] }`.
3. Components import `@/lib/…`/`@varient/ui` internally — rewrite import specifiers in served file
   content: `../../../lib/utils` → `@/lib/utils`, `../../../lib/animation` → `@/lib/animation`,
   `../../../lib/use-fine-pointer` → `@/lib/use-fine-pointer`, `../../../lib/use-viewport-active` →
   `@/lib/use-viewport-active`, `../../../lib/random` → `@/lib/random` (string replace is fine), and
   include those five lib files as additional `registry:lib` items listed in every item's
   `registryDependencies` as URLs (`<SITE_URL>/r/utils.json` etc.) — serve them from the same route
   (reserved slugs: utils, animation, use-fine-pointer, use-viewport-active, random).
