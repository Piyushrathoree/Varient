# NEW-COMPONENTS-SPEC — 2026-07-10 (10 new components)

You are one of 10 agents, each building exactly ONE new Varient component, end to end, ready to ship.
Read `.agent-docs/POLISH-SPEC.md` FIRST — every global rule there (ownership, tokens, reduced motion,
offscreen pause, demo conventions, content module, report format) applies verbatim to new components.
Then read `.agent-docs/DESIGN-DNA.md` and study TWO exemplars before writing code:
`packages/ui/src/components/foundation/switch/switch.tsx` (API + gating) and
`packages/ui/src/components/animated/button-copy/button-copy.tsx` (morph craft).

## Deliverables (all four, every agent)

1. `packages/ui/src/components/<layer>/<slug>/<slug>.tsx` + `index.ts` (re-export component + types).
2. `apps/docs/components/demos/<slug>-demo.tsx` exporting `<Pascal>Demo` (labeled card grid) and
   `<Pascal>PreviewCompact` (single best instance, reads well at ~300×160).
3. `apps/docs/content/docs/<layer>/<slug>.mdx` — copy the structure of a sibling mdx
   (frontmatter title/description, `<ComponentPreview name="<slug>" />`, Installation (copy-source
   + real `bun add` deps if any), Usage, `<PropsTable props={[...]} />`, Accessibility).
4. `apps/docs/lib/components/content/<slug>.ts` content module per POLISH-SPEC.

Report `barrelAdd` with the exact export line contents (component + all types) — the orchestrator
wires the barrel, demos map, registry, and meta.json. Do NOT touch those files. No new npm deps
unless your spec grants one.

## House quality bar (all 10)

- Springs from `lib/animation`; every animation reduced-motion-gated; perpetual loops (if any)
  `useViewportActive`-gated; transform/opacity in loops.
- `forwardRef`, exported prop types, `isX` booleans, `Record` size maps, `cn()`, `'use client'`.
- Inline SVG only inside packages/ui. Semantic tokens only.
- Real keyboard support + ARIA where interactive — these must be genuinely shippable.
- Overlay scrims: `bg-black/40` (house pattern). Modal overlays: Escape closes, focus is trapped or
  restored sanely, body scroll locked while open (copy the Dialog's `onExitComplete` pattern from
  `packages/ui/src/components/foundation/dialog/dialog.tsx` for exit animations).

---

## 1. text-scramble — animated / Text Effects — `TextScramble`

Characters shuffle through a charset, resolving left→right into the real text (decrypt effect).
Props: `text: string`, `duration?: number` (default 0.8s total), `speed?: number` (shuffle tick, default
0.04s), `characterSet?: string` (default upper+lower+digits+`!<>-_\\/[]{}—=+*^?#`), `isTriggeredOnView?: boolean`
(default true — fires once via `useInView`; false = fires on mount), `as?: 'span'|'p'|...` (default span),
plus `onScrambleComplete?`. Implementation: interval ticks; each tick, resolved prefix grows by
`textLength / (duration/speed)` chars; unresolved chars render random charset glyphs. Clear timers on
unmount. Layout stability: wrap in `inline-block` with the final text as an invisible sizer (or
`font-variant-ligatures: none` + fixed content) so width never jitters — recommend `font-mono` in docs.
Reduced motion: render final text immediately. A11y: wrapper `aria-label={text}`, animating span
`aria-hidden`. Demo cards: default / slow cinematic / binary charset / replay-on-hover card.

## 2. sliding-number — animated / Text Effects — `SlidingNumber`

Odometer: each digit column rolls vertically to its new value on change (complements NumberTicker's
count-up). Props: `value: number`, `padStart?: number`, `decimalPlaces?: number` (default 0),
`isGrouped?: boolean` (thousands separators as static chars). Implementation: split formatted value
into digit/separator tokens; each digit renders a vertical stack of 0-9 inside `overflow-hidden`
height-1em; animate `y` to `-digit * 1em` with SPRING_DEFAULT (motion `animate` on transform only).
`tabular-nums` mandatory. Non-digit tokens (.,%) static. Handle digit-count growth (99→100) by
AnimatePresence-inserting columns (popLayout, fade+slide). Reduced motion: instant swap, no roll.
A11y: columns `aria-hidden`; sr-only span announces the formatted value (aria-live="polite").
Demo: interactive +/− stepper buttons card / live seconds clock card / price monthly-annual toggle card.

## 3. expandable-card — animated / Cards & Surfaces — `ExpandableCard`

A card in a grid that morphs into a centered modal (shared-layout). API:
`<ExpandableCard title description media={ReactNode} footer={ReactNode}> {expandedBody} </ExpandableCard>`
— collapsed card shows media/title/description; click/Enter expands. Implementation: `useId`-scoped
`layoutId`s on container, media, title (so multiple instances never collide); AnimatePresence portal:
`bg-black/40` overlay + centered `motion.div` sharing the layoutIds, SPRING_DEFAULT; close via Escape,
overlay click, and a visible close button (inline SVG ×); body scroll-lock while open; focus close
button on open, restore trigger focus on close. Collapsed card is a real `<button>` or
`role="button"`+tabIndex with focus ring. Expanded: `role="dialog" aria-modal aria-labelledby`.
Reduced motion: plain fade, no layout morph. Demo: 3-card article grid (each expandable) /
media-less compact variant card. Give the collapsed card the house hoverable-card treatment.

## 4. morphing-dialog — animated / Cards & Surfaces — `MorphingDialog`

Generic trigger→dialog shared-layout morph (the primitive under expandable-card, exposed properly).
Compound API mirroring Dialog: `MorphingDialog` (controlled `isOpen`/`onOpenChange` or uncontrolled) +
`MorphingDialog.Trigger` (any element; gets the layoutId) + `MorphingDialog.Content` (portal overlay +
morphing panel) + `.Title` + `.Description` + `.Close`. `useId`-scoped layoutIds via context.
Same overlay/Escape/scroll-lock/focus rules as expandable-card. SPRING_DEFAULT morph; content inside
panel fades in slightly after the container settles (~0.05s delay). Reduced motion: crossfade.
Do NOT import from expandable-card (parallel agent) — independent implementation is fine.
Demo: button→settings-panel morph / avatar→profile-card morph / notes-card→editor morph.

## 5. dynamic-island — animated / Layout & Navigation — `DynamicIsland`

iOS-style morphing status pill. API: `state: string`, `views: Record<string, ReactNode>`,
`onStateChange?`; pill auto-sizes to the active view via `layout` (width+height spring,
SPRING_BOUNCE at low bounce), content crossfades via AnimatePresence `mode="popLayout"`.
The pill reads as a dark island in BOTH themes: wrap the pill's inner surface in a `dark` classed
subtree and style with semantic tokens inside it (`<div className="dark"><div className="bg-background
text-foreground rounded-full …">` — tokens flip within the subtree; add a hairline `border-border`).
Reduced motion: instant size/content swap. A11y: `role="status"` + `aria-live="polite"` so state
changes announce; interactive content inside views keeps its own semantics. Export a couple of tiny
preset view builders in the demo (not the component): timer, music, call. Demo: interactive state
switcher (segmented buttons) driving one island / compact-vs-expanded comparison cards.

## 6. prompt-input — foundation / Forms & Inputs — `PromptInput`

The AI-chat input, done in Varient's quiet language (no purple, no sparkle-slop). API:
`value?/defaultValue/onValueChange`, `onSubmit(value)`, `isLoading?: boolean`, `onStop?`,
`placeholder?`, `maxRows?: number` (default 6), `leftSlot?/rightSlot?: ReactNode` (attach button, model
chip), `isDisabled?`. Chassis: rounded-xl hairline container on `bg-background`, focus-within ring per
Input's frame treatment; auto-growing textarea (measure scrollHeight, animate height with a gated
spring, clamp to maxRows); Enter submits, Shift+Enter newline (document it); submit button morphs
idle↑arrow → loading spinner → stop■ via AnimatePresence popLayout (mirror ButtonCopy's morph craft),
`aria-label` per state, `aria-busy` while loading; disabled submit when empty. Inline SVG icons.
A11y: real `<textarea>` with `aria-label` fallback, visible focus ring, kbd hint row optional
(`<Kbd>` composition in demo, not in component). Demo: default / with attachment chips + model chip
in slots / loading-with-stop state / disabled.

## 7. carousel — animated / Layout & Navigation — `Carousel`

Drag-to-snap carousel, no embla. Compound: `Carousel` (props: `align?: 'start'|'center'` default
center, `gap?: number` default 16, `index?/defaultIndex/onIndexChange`, `isLooping?: boolean` default
false) + `Carousel.Item` + `Carousel.Previous` + `Carousel.Next` + `Carousel.Dots`. Implementation:
track is `motion.div` with `drag="x"`, constraints measured from refs (ResizeObserver); on dragEnd,
compute nearest snap offset from velocity+position, animate x with SPRING_DEFAULT; arrows/dots animate
to exact offsets; disable Previous/Next at bounds when not looping (isLooping just wraps index, no
clone rail needed). Keyboard: viewport is focusable `role="region"` `aria-roledescription="carousel"`;
ArrowLeft/Right navigate. Items: `role="group"` `aria-roledescription="slide"` `aria-label="N of M"`;
offscreen items `aria-hidden` optional — keep simple, all visible-adjacent. Dots: buttons with
`aria-label="Go to slide N"` + `aria-current`. Reduced motion: instant snap, drag still works.
Demo: image-card carousel with arrows+dots / centered peek variant / testimonial quotes carousel.

## 8. stepper — foundation / Navigation — `Stepper`

Multi-step progress + content transitions. Compound: `Stepper` (props: `activeStep: number`,
`onStepChange?`, `orientation?: 'horizontal'|'vertical'`, `isNavigable?: boolean` — clickable completed
steps) + `Stepper.Item` (props: `title`, `description?`, index auto from context) + optional
`Stepper.Content` (per-step panel; AnimatePresence `mode="wait"` slide ± by direction, SPRING_SNAPPY).
Visuals: step dot = numbered circle → active: ember ring + number → complete: ember fill + check path
draw-in (pathLength, SPRING_SNAPPY); connector line `scaleX` fills with brand on completion (origin
left / top), gated. States also encoded in text weight/color (not color-alone). A11y: `<ol>` list,
`aria-current="step"` on active, connectors `aria-hidden`, clickable steps are real buttons
(disabled for future steps unless isNavigable). Reduced motion: instant fills, no draw. Demo:
horizontal 4-step checkout with Back/Next buttons wired / vertical settings variant / non-linear
(isNavigable) card.

## 9. image-comparison — animated / Cards & Surfaces — `ImageComparison`

Before/after reveal slider. Props: `before: ReactNode | {src,alt}`, `after: ReactNode | {src,alt}`,
`defaultPosition?: number` (0-100, default 50), `mode?: 'drag'|'hover'` (default drag),
`beforeLabel?/afterLabel?: string` (quiet corner chips), `isSpring?: boolean` default true.
Implementation: container relative overflow-hidden rounded-xl border; after-layer clipped via
`clip-path: inset(0 0 0 X%)` driven by a motion value (useSpring when isSpring); divider = 2px
`bg-brand` hairline + circular grip (ember, white chevrons ‹›, shadow); pointer drag on the whole
surface; hover mode tracks pointer x. KEYBOARD IS REQUIRED: grip is `role="slider"` tabIndex=0,
`aria-valuemin/max/now` (0-100), `aria-label="Comparison position"`, Arrow keys ±5, Home/End 0/100.
Reduced motion: still fully functional (position conveys info — the scroll-progress exception),
just no spring smoothing. Images: `select-none pointer-events-none draggable={false}`, fill container.
Demo: photo before/after / LIGHT-vs-DARK UI screenshot comparison (dogfood: render a small themed Card
subtree on each side instead of images) / hover mode card.

## 10. sortable-list — animated / Layout & Navigation — `SortableList`

Drag-to-reorder with springs, built on motion's `Reorder`. API: `items: T[]`,
`onReorder(items: T[])`, `renderItem(item) => ReactNode`, `getKey?(item) => string|number` (default
identity/id), `showHandle?: boolean` (default false — whole row drags; true = grip handle is the only
drag surface via `useDragControls` + `dragListener={false}`). Row visuals: house list row (rounded-lg
border bg-card px-4 py-3); while dragging: scale 1.02, shadow-lg, z-10, cursor-grabbing (whileDrag),
siblings reflow via Reorder's layout springs (tune with SPRING_DEFAULT via `layout` transition).
KEYBOARD IS REQUIRED: each row focusable; ArrowUp/Down moves focus; Alt+ArrowUp/Down (and visible
per-row ↑/↓ buttons that appear on focus/hover) reorder; announce moves via a polite live region
("Item X moved to position N of M"). Reduced motion: no lift/scale, instant reflow, reorder still works.
Demo: task list with checkboxes (whole-row drag) / handle variant / compact density card.

---

Slugs ↔ names ↔ layers (for your files; registry/demos/barrel wiring is the orchestrator's):

| slug | export | layer | category |
|---|---|---|---|
| text-scramble | TextScramble | animated | Text Effects |
| sliding-number | SlidingNumber | animated | Text Effects |
| expandable-card | ExpandableCard | animated | Cards & Surfaces |
| morphing-dialog | MorphingDialog | animated | Cards & Surfaces |
| dynamic-island | DynamicIsland | animated | Layout & Navigation |
| prompt-input | PromptInput | foundation | Forms & Inputs |
| carousel | Carousel | animated | Layout & Navigation |
| stepper | Stepper | foundation | Navigation |
| image-comparison | ImageComparison | animated | Cards & Surfaces |
| sortable-list | SortableList | animated | Layout & Navigation |
