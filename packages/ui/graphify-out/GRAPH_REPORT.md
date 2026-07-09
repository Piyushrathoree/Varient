# Graph Report - ui  (2026-07-08)

## Corpus Check
- 166 files · ~47,296 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 289 nodes · 216 edges · 11 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 30|Community 30]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 80 edges
2. `buttonVariants()` - 4 edges
3. `useToastContext()` - 3 edges
4. `measureBeamCoords()` - 2 edges
5. `updateCoords()` - 2 edges
6. `getBrandConfettiColors()` - 2 edges
7. `fireConfetti()` - 2 edges
8. `centerFallback()` - 2 edges
9. `handlePointerLeave()` - 2 edges
10. `resetTilt()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `useToast()` --calls--> `useToastContext()`  [INFERRED]
  components\foundation\toast\use-toast.ts → components\foundation\toast\toast-provider.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.04
Nodes (1): cn()

### Community 1 - "Community 1"
Cohesion: 0.17
Nodes (3): buttonVariants(), fireConfetti(), getBrandConfettiColors()

### Community 2 - "Community 2"
Cohesion: 0.29
Nodes (2): computeFanPose(), WallCard()

### Community 5 - "Community 5"
Cohesion: 0.4
Nodes (2): handlePointerLeave(), resetTilt()

### Community 6 - "Community 6"
Cohesion: 0.4
Nodes (2): useToastContext(), useToast()

### Community 9 - "Community 9"
Cohesion: 0.5
Nodes (2): centerFallback(), handlePointerLeave()

### Community 11 - "Community 11"
Cohesion: 0.4
Nodes (1): CheckCircleIcon()

### Community 12 - "Community 12"
Cohesion: 0.67
Nodes (2): measureBeamCoords(), updateCoords()

### Community 20 - "Community 20"
Cohesion: 0.67
Nodes (2): createRange(), generatePaginationRange()

### Community 22 - "Community 22"
Cohesion: 0.5
Nodes (1): toggleVariants()

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (2): fadeUp(), transition()

## Knowledge Gaps
- **Thin community `Community 0`** (56 nodes): `getAxisOffset()`, `ChangeItem()`, `cn()`, `aurora-background.tsx`, `bento-grid.tsx`, `blur-fade.tsx`, `border-beam.tsx`, `cursor-spotlight.tsx`, `flip-words.tsx`, `floating-navbar.tsx`, `globe.tsx`, `gradient-text.tsx`, `grid-pattern.tsx`, `magnetic-button.tsx`, `number-ticker.native.tsx`, `number-ticker.tsx`, `orbit.tsx`, `scroll-progress-bar.tsx`, `shimmer-button.tsx`, `wavy-background.tsx`, `word-rotate.tsx`, `badge.tsx`, `breadcrumb.tsx`, `card.tsx`, `checkbox.tsx`, `dropdown-menu.tsx`, `input.tsx`, `select.tsx`, `skeleton.tsx`, `table.tsx`, `textarea.tsx`, `blog-grid.tsx`, `changelog.tsx`, `comparison-table.tsx`, `contact-form.tsx`, `cta.tsx`, `features.tsx`, `hero.tsx`, `integration-grid.tsx`, `logo-cloud.tsx`, `newsletter-signup.tsx`, `not-found-page.tsx`, `pricing.tsx`, `stats-band.tsx`, `testimonials.tsx`, `timeline.tsx`, `handleOpenChange()`, `getThemeColors()`, `tileMotion()`, `cn()`, `cn()`, `utils.ts`, `NumberTicker()`, `NumberTicker()`, `QuoteGlyph()`, `drawWaves()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2`** (8 nodes): `tilt-card-wall.tsx`, `cn()`, `computeFanPose()`, `QuoteIcon()`, `SourceIcon()`, `StarIcon()`, `updateLayout()`, `WallCard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (6 nodes): `tilt-card.tsx`, `handleChange()`, `handlePointerLeave()`, `handlePointerMove()`, `resetTilt()`, `setRefs()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (6 nodes): `toast-provider.tsx`, `use-toast.ts`, `ToastProvider()`, `useToastContext()`, `useToast()`, `withVariant()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (5 nodes): `spotlight.tsx`, `centerFallback()`, `handlePointerEnter()`, `handlePointerLeave()`, `handlePointerMove()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (5 nodes): `toast-icons.tsx`, `toast.tsx`, `handleMouseEnter()`, `handleMouseLeave()`, `CheckCircleIcon()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (4 nodes): `getQuadraticPath()`, `measureBeamCoords()`, `updateCoords()`, `animated-beam.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (4 nodes): `pagination.tsx`, `cn()`, `createRange()`, `generatePaginationRange()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (4 nodes): `toggle-group.tsx`, `toggle.tsx`, `useToggleGroupContext()`, `toggleVariants()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (3 nodes): `faq.tsx`, `fadeUp()`, `transition()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 1`, `Community 2`, `Community 3`, `Community 4`, `Community 5`, `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 23`, `Community 24`, `Community 25`, `Community 26`, `Community 27`, `Community 28`, `Community 29`, `Community 30`, `Community 32`, `Community 33`, `Community 34`?**
  _High betweenness centrality (0.460) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._