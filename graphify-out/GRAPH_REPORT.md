# Graph Report - Varient  (2026-07-08)

## Corpus Check
- 370 files · ~165,921 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 779 nodes · 721 edges · 27 communities detected
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 36|Community 36]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 104 edges
2. `useReducedMotion()` - 13 edges
3. `getDemo()` - 8 edges
4. `getReadyCount()` - 8 edges
5. `SectionHeader()` - 7 edges
6. `getCategoryAnchorId()` - 7 edges
7. `getComponentBySlug()` - 6 edges
8. `getComponentHref()` - 4 edges
9. `getComponentsByLayer()` - 4 edges
10. `getComponentsGroupedByCategory()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `HomePage()` --calls--> `getReadyCount()`  [INFERRED]
  apps\docs\app\(home)\page.tsx → apps\docs\lib\components\registry.ts
- `ComponentPage()` --calls--> `getComponentBySlug()`  [INFERRED]
  apps\docs\app\(home)\components\[slug]\page.tsx → apps\docs\lib\components\registry.ts
- `CtaSection()` --calls--> `useReducedMotion()`  [INFERRED]
  apps\docs\components\marketing\cta-section.tsx → apps\docs\hooks\use-reduced-motion.ts
- `FeatureCard()` --calls--> `useReducedMotion()`  [INFERRED]
  apps\docs\components\marketing\features-section.tsx → apps\docs\hooks\use-reduced-motion.ts
- `handleCategoryClick()` --calls--> `getCategoryAnchorId()`  [INFERRED]
  apps\docs\components\site\components-sidebar.tsx → apps\docs\lib\components\registry.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.02
Nodes (94): NotFoundPageDemo(), NotFoundPagePreviewCompact(), AccordionDemo(), AccordionPreviewCompact(), AnimatedListDemo(), AnimatedListPreviewCompact(), AnimatedProgressRingDemo(), AnimatedProgressRingPreviewCompact() (+86 more)

### Community 1 - "Community 1"
Cohesion: 0.02
Nodes (2): cn(), toggleVariants()

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (24): getDemo(), getAdjacentInCategory(), getCategoryAnchorId(), getCategoryHref(), getComponentBySlug(), getComponentHref(), getComponentsByLayer(), getComponentsByLayerAndCategory() (+16 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (16): AlertDialogRoot(), buttonVariants(), CommandPaletteRoot(), fireConfetti(), getBrandConfettiColors(), useConfetti(), DialogRoot(), DrawerRoot() (+8 more)

### Community 4 - "Community 4"
Cohesion: 0.22
Nodes (5): ToastButtons(), ToastDemo(), ToastPreviewCompact(), useToastContext(), useToast()

### Community 5 - "Community 5"
Cohesion: 0.29
Nodes (5): SidebarBrand(), SidebarDemo(), SidebarPreviewCompact(), useSidebar(), useSidebarContext()

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (2): computeFanPose(), WallCard()

### Community 7 - "Community 7"
Cohesion: 0.32
Nodes (3): isValidEmail(), validateLoginFields(), validateSignupFields()

### Community 8 - "Community 8"
Cohesion: 0.29
Nodes (2): SkeletonLoaderDemo(), SkeletonLoaderPreviewCompact()

### Community 9 - "Community 9"
Cohesion: 0.29
Nodes (1): Github()

### Community 12 - "Community 12"
Cohesion: 0.4
Nodes (2): handlePointerLeave(), resetTilt()

### Community 14 - "Community 14"
Cohesion: 0.4
Nodes (2): ParticlesDemo(), ParticlesPreviewCompact()

### Community 15 - "Community 15"
Cohesion: 0.4
Nodes (2): TooltipDemo(), TooltipPreviewCompact()

### Community 17 - "Community 17"
Cohesion: 0.5
Nodes (2): centerFallback(), handlePointerLeave()

### Community 19 - "Community 19"
Cohesion: 0.4
Nodes (1): CheckCircleIcon()

### Community 20 - "Community 20"
Cohesion: 0.67
Nodes (2): getPageImage(), getPageMarkdownUrl()

### Community 21 - "Community 21"
Cohesion: 0.5
Nodes (1): BentoGridPreviewCompact()

### Community 22 - "Community 22"
Cohesion: 0.5
Nodes (2): ContactFormDemo(), ContactFormPreviewCompact()

### Community 23 - "Community 23"
Cohesion: 0.5
Nodes (2): GradientTextDemo(), GradientTextPreviewCompact()

### Community 24 - "Community 24"
Cohesion: 0.5
Nodes (2): MeteorShowerDemo(), MeteorShowerPreviewCompact()

### Community 25 - "Community 25"
Cohesion: 0.5
Nodes (2): MorphingTextDemo(), MorphingTextPreviewCompact()

### Community 26 - "Community 26"
Cohesion: 0.5
Nodes (2): ProgressDemo(), ProgressPreviewCompact()

### Community 27 - "Community 27"
Cohesion: 0.5
Nodes (2): ShimmerButtonDemo(), ShimmerButtonPreviewCompact()

### Community 28 - "Community 28"
Cohesion: 0.5
Nodes (2): TextRevealDemo(), TextRevealPreviewCompact()

### Community 29 - "Community 29"
Cohesion: 0.5
Nodes (2): ToggleDemo(), TogglePreviewCompact()

### Community 30 - "Community 30"
Cohesion: 0.67
Nodes (2): measureBeamCoords(), updateCoords()

### Community 36 - "Community 36"
Cohesion: 0.67
Nodes (2): createRange(), generatePaginationRange()

## Knowledge Gaps
- **Thin community `Community 1`** (130 nodes): `useAccordionItemContext()`, `useAccordionRootContext()`, `collectListItems()`, `pushEntry()`, `clampValue()`, `buildAnimatedBlobs()`, `buildStaticGradient()`, `setRef()`, `buildBeamPaths()`, `getAxisOffset()`, `cn()`, `TrafficLights()`, `ChangeItem()`, `cn()`, `setRefs()`, `useDockContext()`, `handleOpenChange()`, `getThemeColors()`, `cn()`, `GlowOrb()`, `tileMotion()`, `setRefs()`, `cn()`, `if()`, `cn()`, `InputOTPCaret()`, `useInputOTPFieldContext()`, `cn()`, `cn()`, `animated-list.tsx`, `animated-progress-ring.tsx`, `aurora-background.tsx`, `avatar-circles.tsx`, `background-beams.tsx`, `bento-grid.tsx`, `bento-showcase.tsx`, `blur-fade.tsx`, `border-beam.tsx`, `browser-frame.tsx`, `cursor-spotlight.tsx`, `dock.tsx`, `flip-words.tsx`, `floating-navbar.tsx`, `globe.tsx`, `gradient-text.tsx`, `grid-pattern.tsx`, `hero-highlight.tsx`, `lamp.tsx`, `magnetic-button.tsx`, `morphing-text.tsx`, `moving-border.tsx`, `orbit.tsx`, `particles.tsx`, `retro-grid.tsx`, `scroll-progress-bar.tsx`, `shimmer-button.tsx`, `terminal.tsx`, `text-reveal.tsx`, `typewriter-text.tsx`, `wavy-background.tsx`, `word-rotate.tsx`, `accordion.tsx`, `badge.tsx`, `breadcrumb.tsx`, `card.tsx`, `checkbox.tsx`, `dropdown-menu.tsx`, `input.tsx`, `input-otp.tsx`, `kbd.tsx`, `popover.tsx`, `progress.tsx`, `radio-group.tsx`, `select.tsx`, `separator.tsx`, `skeleton.tsx`, `slider.tsx`, `switch.tsx`, `table.tsx`, `textarea.tsx`, `toggle-group.tsx`, `toggle.tsx`, `tooltip.tsx`, `announcement-banner.tsx`, `blog-grid.tsx`, `changelog.tsx`, `comparison-table.tsx`, `contact-form.tsx`, `cta.tsx`, `features.tsx`, `hero-grid.tsx`, `hero.tsx`, `hero-showcase.tsx`, `hero-spotlight.tsx`, `integration-grid.tsx`, `logo-cloud.tsx`, `newsletter-signup.tsx`, `not-found-page.tsx`, `pricing.tsx`, `stats-band.tsx`, `team-grid.tsx`, `testimonials.tsx`, `timeline.tsx`, `utils.ts`, `createParticles()`, `resolveDefaultColor()`, `seededUnit()`, `PopoverRoot()`, `usePopoverContext()`, `formatPercent()`, `cn()`, `useRadioGroupContext()`, `cn()`, `clearPress()`, `clearPress()`, `cn()`, `IconGithub()`, `IconLinkedin()`, `IconX()`, `getLineText()`, `TrafficLights()`, `QuoteGlyph()`, `setRef()`, `splitWords()`, `useToggleGroupContext()`, `toggleVariants()`, `getEntrance()`, `TooltipProvider()`, `normalizePhrases()`, `drawWaves()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (8 nodes): `tilt-card-wall.tsx`, `cn()`, `computeFanPose()`, `QuoteIcon()`, `SourceIcon()`, `StarIcon()`, `updateLayout()`, `WallCard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (7 nodes): `skeleton-loader-demo.tsx`, `DemoCard()`, `MediaCardSkeleton()`, `ProfileCardSkeleton()`, `SkeletonLoaderDemo()`, `SkeletonLoaderPreviewCompact()`, `TextBlockSkeleton()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (7 nodes): `brand-icons.tsx`, `site-footer.tsx`, `site-header.tsx`, `Github()`, `XLogo()`, `FooterLinkItem()`, `handler()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (6 nodes): `tilt-card.tsx`, `handleChange()`, `handlePointerLeave()`, `handlePointerMove()`, `resetTilt()`, `setRefs()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (5 nodes): `particles-demo.tsx`, `DemoCard()`, `ParticlesDemo()`, `ParticlesPreviewCompact()`, `ParticleStage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (5 nodes): `tooltip-demo.tsx`, `DemoCard()`, `IconTrigger()`, `TooltipDemo()`, `TooltipPreviewCompact()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (5 nodes): `spotlight.tsx`, `centerFallback()`, `handlePointerEnter()`, `handlePointerLeave()`, `handlePointerMove()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (5 nodes): `toast-icons.tsx`, `toast.tsx`, `handleMouseEnter()`, `handleMouseLeave()`, `CheckCircleIcon()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (4 nodes): `page.tsx`, `source.ts`, `getPageImage()`, `getPageMarkdownUrl()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (4 nodes): `bento-grid-demo.tsx`, `BentoGridPreviewCompact()`, `GradientHeader()`, `SkeletonHeader()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (4 nodes): `contact-form-demo.tsx`, `ContactFormDemo()`, `ContactFormPreviewCompact()`, `DemoCard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (4 nodes): `gradient-text-demo.tsx`, `DemoCard()`, `GradientTextDemo()`, `GradientTextPreviewCompact()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (4 nodes): `meteor-shower-demo.tsx`, `MeteorShowerDemo()`, `MeteorShowerPreviewCompact()`, `MeteorStage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (4 nodes): `morphing-text-demo.tsx`, `DemoCard()`, `MorphingTextDemo()`, `MorphingTextPreviewCompact()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (4 nodes): `progress-demo.tsx`, `DemoCard()`, `ProgressDemo()`, `ProgressPreviewCompact()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (4 nodes): `shimmer-button-demo.tsx`, `DemoCard()`, `ShimmerButtonDemo()`, `ShimmerButtonPreviewCompact()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (4 nodes): `text-reveal-demo.tsx`, `DemoCard()`, `TextRevealDemo()`, `TextRevealPreviewCompact()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (4 nodes): `toggle-demo.tsx`, `DemoCard()`, `ToggleDemo()`, `TogglePreviewCompact()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (4 nodes): `getQuadraticPath()`, `measureBeamCoords()`, `updateCoords()`, `animated-beam.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (4 nodes): `pagination.tsx`, `cn()`, `createRange()`, `generatePaginationRange()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 1` to `Community 3`, `Community 5`, `Community 6`, `Community 7`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 16`, `Community 17`, `Community 18`, `Community 19`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 37`?**
  _High betweenness centrality (0.337) - this node is a cross-community bridge._
- **Why does `getDemo()` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.219) - this node is a cross-community bridge._
- **Why does `useReducedMotion()` connect `Community 3` to `Community 2`?**
  _High betweenness centrality (0.195) - this node is a cross-community bridge._
- **Are the 10 inferred relationships involving `useReducedMotion()` (e.g. with `CtaSection()` and `FeatureCard()`) actually correct?**
  _`useReducedMotion()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `getReadyCount()` (e.g. with `HomePage()` and `buildStats()`) actually correct?**
  _`getReadyCount()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `SectionHeader()` (e.g. with `useReducedMotion()` and `fadeUp()`) actually correct?**
  _`SectionHeader()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._