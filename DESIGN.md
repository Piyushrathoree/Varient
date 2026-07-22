# DESIGN.md — UI Component Library
> This file is the single source of truth for every agent, contributor, and intern working on this library.
> Before writing a single line of code, read this file completely. Every decision made here is intentional.
> Do not deviate from patterns defined here without updating this file first.

---

## 1. What We Are Building

A component library that covers **everything a website needs** — from a `<Tooltip>` to a full animated `<HeroSection>` — in one place, with a consistent visual identity, copy-paste DX, and animations built in.

**The gap we fill:**
- MagicUI / Aceternity = animations only, no utility components
- Shadcn / Radix Themes = utility only, no animations
- Us = **both, in one place, with full-page sections too**

**The three layers:**
1. **Foundation** — Utility components. Button, Input, Modal, Table, etc. Accessible, Radix-powered, clean.
2. **Animated** — Visual/wow-factor components. Marquee, Border Beam, Globe, Particles, etc. Framer Motion powered.
3. **Sections** — Full page blocks. Hero, Pricing, Testimonials, FAQ, Footer, etc. Drop in, change copy, ship.

**Copy-paste philosophy:** No npm install for individual components. Users visit the docs, copy the component code, paste into their project. They own the code. This is intentional — same as shadcn/ui and MagicUI.

---

## 2. Tech Stack

```
Framework:        Next.js 16 (App Router, Turbopack default)
Language:         TypeScript (strict mode, no `any`)
Styling:          Tailwind CSS v4
Animation:        Framer Motion (motion/react)
Primitives:       Radix UI (for Layer 1 accessibility)
Docs framework:   Fumadocs
Content:          MDX via Contentlayer / Velite
Icons:            Lucide React
Versioning:       Changesets
Package manager:  Bun (workspaces monorepo)
```

**Monorepo structure:**
```
/
├── apps/
│   └── docs/               ← Next.js docs site (the product website)
├── packages/
│   └── ui/                 ← The actual component library
│       ├── src/
│       │   ├── components/
│       │   │   ├── foundation/
│       │   │   ├── animated/
│       │   │   └── sections/
│       │   ├── hooks/
│       │   ├── lib/
│       │   └── index.ts
│       └── package.json
├── package.json            ← workspaces: apps/*, packages/*
└── turbo.json
```

---

## 3. Design Tokens

These are the only values used anywhere in the library. Never hardcode colors, spacing, or radii outside this system.

### 3.1 Color Palette

The library uses a **dark-first** palette with a distinct electric indigo accent. Not purple. Not violet. A specific, ownable indigo that sits between the two.

```css
/* globals.css */
:root {
  /* Brand */
  --brand-50:  #eef0ff;
  --brand-100: #dde2ff;
  --brand-200: #c0c8ff;
  --brand-300: #9aa4ff;
  --brand-400: #7c85fd;
  --brand-500: #6366f1;   /* PRIMARY — the signature indigo */
  --brand-600: #4f46e5;
  --brand-700: #3730a3;
  --brand-800: #2e2a7e;
  --brand-900: #1e1b5e;

  /* Neutral (zinc-based, slightly warm) */
  --neutral-0:   #ffffff;
  --neutral-50:  #fafafa;
  --neutral-100: #f4f4f5;
  --neutral-200: #e4e4e7;
  --neutral-300: #d1d1d6;
  --neutral-400: #a1a1aa;
  --neutral-500: #71717a;
  --neutral-600: #52525b;
  --neutral-700: #3f3f46;
  --neutral-800: #27272a;
  --neutral-850: #1c1c1f;
  --neutral-900: #131316;
  --neutral-950: #0a0a0d;

  /* Semantic */
  --success:     #22c55e;
  --warning:     #f59e0b;
  --danger:      #ef4444;
  --info:        #3b82f6;

  /* Surface (light mode) */
  --bg-base:     var(--neutral-0);
  --bg-subtle:   var(--neutral-50);
  --bg-muted:    var(--neutral-100);
  --border:      var(--neutral-200);
  --border-strong: var(--neutral-300);
  --text-primary:   var(--neutral-950);
  --text-secondary: var(--neutral-500);
  --text-tertiary:  var(--neutral-400);
}

.dark {
  --bg-base:     var(--neutral-950);
  --bg-subtle:   var(--neutral-900);
  --bg-muted:    var(--neutral-850);
  --border:      var(--neutral-800);
  --border-strong: var(--neutral-700);
  --text-primary:   var(--neutral-50);
  --text-secondary: var(--neutral-400);
  --text-tertiary:  var(--neutral-600);
}
```

**The visual signature:** The `--brand-500` (#6366f1) indigo is used sparingly — focus rings, active states, key CTAs, and accent moments in animated components. It should feel special, not everywhere.

**Dark mode is the default display mode** for the docs/showcase site. Light mode is fully supported and all components must work in both.

### 3.2 Typography

```css
/* Font stack */
--font-display: 'Cal Sans', 'Inter', sans-serif;   /* headings — has personality */
--font-body:    'Inter', system-ui, sans-serif;     /* body, UI */
--font-mono:    'Geist Mono', 'Fira Code', monospace; /* code */

/* Type scale */
--text-xs:   0.75rem;   /* 12px */
--text-sm:   0.875rem;  /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg:   1.125rem;  /* 18px */
--text-xl:   1.25rem;   /* 20px */
--text-2xl:  1.5rem;    /* 24px */
--text-3xl:  1.875rem;  /* 30px */
--text-4xl:  2.25rem;   /* 36px */
--text-5xl:  3rem;      /* 48px */
--text-6xl:  3.75rem;   /* 60px */
--text-7xl:  4.5rem;    /* 72px */

/* Line heights */
--leading-tight:  1.25;
--leading-snug:   1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;

/* Font weights used */
--weight-normal:   400;
--weight-medium:   500;
--weight-semibold: 600;
--weight-bold:     700;
```

### 3.3 Spacing

Based on 4px grid. Every spacing value is a multiple of 4.

```
1  = 4px
2  = 8px
3  = 12px
4  = 16px
5  = 20px
6  = 24px
8  = 32px
10 = 40px
12 = 48px
16 = 64px
20 = 80px
24 = 96px
32 = 128px
```

### 3.4 Border Radius

```css
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   16px;
--radius-2xl:  24px;
--radius-full: 9999px;
```

**Rule:** Foundation components use `--radius-md` (8px) by default. Cards use `--radius-lg`. Pills/badges use `--radius-full`. Animated components can use larger radii contextually.

### 3.5 Shadows

```css
--shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1);

/* Glow shadows — for animated components only */
--glow-brand: 0 0 20px rgb(99 102 241 / 0.4);
--glow-white: 0 0 20px rgb(255 255 255 / 0.1);
```

### 3.6 Animation Tokens

```css
/* Durations */
--duration-fast:   150ms;
--duration-normal: 250ms;
--duration-slow:   400ms;
--duration-slower: 600ms;

/* Easings */
--ease-in:      cubic-bezier(0.4, 0, 1, 1);
--ease-out:     cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring:  cubic-bezier(0.175, 0.885, 0.32, 1.275);
--ease-bounce:  cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## 4. Component Architecture Rules

These rules apply to **every single component** in the library. No exceptions.

### 4.1 File Structure (per component)

```
packages/ui/src/components/foundation/button/
├── button.tsx          ← The component
├── button.types.ts     ← TypeScript interfaces (if complex)
└── index.ts            ← Re-export

packages/ui/src/components/animated/marquee/
├── marquee.tsx
└── index.ts

packages/ui/src/components/sections/hero/
├── hero.tsx
└── index.ts
```

### 4.2 Prop API Contract

Every component MUST follow this naming convention without deviation:

```typescript
// Size prop — always these exact values
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Variant prop — semantic names only
variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive'

// State props — always boolean, always `is` prefix
isDisabled?: boolean
isLoading?: boolean
isOpen?: boolean
isActive?: boolean
isSelected?: boolean
isRequired?: boolean
isReadOnly?: boolean

// Event handlers — always `on` prefix
onClick?: () => void
onChange?: (value: string) => void
onClose?: () => void
onOpen?: () => void

// Children
children?: React.ReactNode

// Class extension (always last)
className?: string
```

**Never use:** `disabled` (use `isDisabled`), `loading` (use `isLoading`), `active` (use `isActive`). Consistency matters more than convention.

### 4.3 TypeScript Requirements

```typescript
// All props must be typed — no `any`, no `object`
// All components must be typed as React.FC or have explicit return type
// Export both the component AND its props type

// Example pattern:
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  isDisabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', isLoading, isDisabled, ...props }, ref) => {
    // implementation
  }
)
Button.displayName = 'Button'
```

### 4.4 Accessibility Requirements (non-negotiable)

Every Layer 1 (Foundation) component must:
- Have correct ARIA roles and attributes
- Support full keyboard navigation
- Have visible focus rings (use `--brand-500` color)
- Work with screen readers
- Use Radix UI primitives where they handle this complexity (Select, Modal, Tooltip, Dropdown, etc.)

Every Layer 2 (Animated) component must:
- Respect `prefers-reduced-motion` — all animations must be disabled when user prefers reduced motion
- Pattern for every animated component:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
// or use Framer Motion's useReducedMotion() hook
```

### 4.5 Tailwind Usage Rules

```typescript
// ALWAYS use cn() utility for merging classes
import { cn } from '@/lib/utils'

// cn() implementation (install clsx + tailwind-merge)
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// NEVER use inline styles for anything in the design token system
// BAD:
<div style={{ color: '#6366f1' }}>

// GOOD:
<div className="text-brand-500">

// Exception: Framer Motion animated values (transform, opacity via motion values)
// Exception: Dynamic CSS custom property values passed to animated components
```

### 4.6 Dark Mode

```typescript
// Every component must be dark mode compatible
// Use Tailwind dark: prefix everywhere — never JS-based theme switching

// Pattern:
<div className="bg-white dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50">

// Border example:
<div className="border border-neutral-200 dark:border-neutral-800">

// Never use hardcoded hex values in className strings
```

---

## 5. Layer 1 — Foundation Components (25 components)

Each entry defines: component name, Radix primitive used (if any), key props, variants, accessibility notes, and what the intern needs to build.

---

### Button
**File:** `components/foundation/button/button.tsx`
**Radix:** None (native button with forwardRef)

**Variants:** `default` | `primary` | `secondary` | `ghost` | `outline` | `destructive` | `link`
**Sizes:** `xs` | `sm` | `md` | `lg` | `xl`

**Props:**
```typescript
variant?: ButtonVariant      // default: 'default'
size?: ButtonSize            // default: 'md'
isLoading?: boolean          // shows spinner, disables interaction
isDisabled?: boolean         // disables button
leftIcon?: React.ReactNode   // icon before text
rightIcon?: React.ReactNode  // icon after text
asChild?: boolean            // Radix slot pattern for polymorphism
```

**Visual spec:**
- `primary`: bg-brand-500, white text, hover bg-brand-600
- `default`: bg-neutral-900 dark:bg-neutral-100, inverted text
- `secondary`: bg-neutral-100 dark:bg-neutral-800, muted text
- `ghost`: transparent bg, hover bg-neutral-100 dark:hover:bg-neutral-800
- `outline`: transparent bg, border-neutral-300 dark:border-neutral-700, hover bg-neutral-50
- `destructive`: bg-danger, white text
- `link`: no bg/border, brand-500 text, underline on hover
- Loading state: replace content with `<Spinner />` + keep button width stable
- Focus ring: `focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2`

**Accessibility:** `aria-disabled` when `isDisabled`, `aria-busy` when `isLoading`

---

### Input
**File:** `components/foundation/input/input.tsx`
**Radix:** None

**Props:**
```typescript
label?: string
placeholder?: string
helperText?: string
errorText?: string           // triggers error state
isDisabled?: boolean
isReadOnly?: boolean
isRequired?: boolean
leftAddon?: React.ReactNode  // icon or text inside left edge
rightAddon?: React.ReactNode
size?: 'sm' | 'md' | 'lg'
type?: React.InputHTMLAttributes<HTMLInputElement>['type']
```

**Visual spec:**
- Default: border-neutral-300, bg-white dark:bg-neutral-900
- Focus: border-brand-500, ring-2 ring-brand-500/20
- Error: border-danger, ring-2 ring-danger/20, error text in danger color below
- Helper text: text-neutral-500 text-sm below input
- Label: text-sm font-medium text-neutral-700 dark:text-neutral-300, above input

**Accessibility:** `htmlFor` links label to input, `aria-describedby` for helper/error text, `aria-invalid` on error

---

### Textarea
**File:** `components/foundation/textarea/textarea.tsx`
**Radix:** None

Same pattern as Input but multiline. Additional prop: `rows?: number`, `isResizable?: boolean`

---

### Select
**File:** `components/foundation/select/select.tsx`
**Radix:** `@radix-ui/react-select` — USE THIS, do not build native select

**Props:**
```typescript
options: { label: string; value: string; isDisabled?: boolean }[]
placeholder?: string
label?: string
isDisabled?: boolean
isRequired?: boolean
onChange?: (value: string) => void
value?: string
defaultValue?: string
```

**Visual spec:** Trigger looks like Input. Dropdown panel: bg-white dark:bg-neutral-900, border-neutral-200 dark:border-neutral-800, shadow-lg, radius-lg. Items: hover bg-neutral-100 dark:hover:bg-neutral-800. Selected item: brand-500 checkmark on right.

---

### Checkbox
**File:** `components/foundation/checkbox/checkbox.tsx`
**Radix:** `@radix-ui/react-checkbox`

**Props:** `label`, `isChecked`, `isIndeterminate`, `isDisabled`, `onChange`, `helperText`

**Visual spec:** 16px square, radius-sm. Unchecked: border-neutral-300. Checked: bg-brand-500, white checkmark. Indeterminate: bg-brand-500, white dash. Disabled: opacity-50.

---

### Radio
**File:** `components/foundation/radio/radio.tsx` + `radio-group.tsx`
**Radix:** `@radix-ui/react-radio-group`

Build both `Radio` (single item) and `RadioGroup` (wrapper with `orientation?: 'horizontal' | 'vertical'`).

---

### Toggle (Switch)
**File:** `components/foundation/toggle/toggle.tsx`
**Radix:** `@radix-ui/react-switch`

**Visual spec:** Pill shape (radius-full). Off: bg-neutral-300. On: bg-brand-500. Thumb: white circle, translates on state change. Sizes: sm (32×18px), md (44×24px), lg (56×30px). Smooth transition: `transition-all duration-200 ease-spring`.

---

### Badge
**File:** `components/foundation/badge/badge.tsx`
**Radix:** None

**Variants:** `default` | `primary` | `secondary` | `success` | `warning` | `danger` | `outline`
**Sizes:** `sm` | `md` | `lg`

**Visual spec:** Inline pill. radius-full. Tight padding (2px 8px for sm, 3px 10px for md). Subtle bg with matching text color. Never bold text — font-medium at most.

---

### Avatar
**File:** `components/foundation/avatar/avatar.tsx`
**Radix:** `@radix-ui/react-avatar`

**Props:** `src`, `alt`, `fallback` (initials), `size?: 'xs'|'sm'|'md'|'lg'|'xl'`, `shape?: 'circle'|'square'`

**Visual spec:** Fallback shows initials on a generated bg color (derive from string hash — same name always gets same color). AvatarGroup: overlapping avatars with `+N` overflow badge.

Also build `AvatarGroup`:
```typescript
interface AvatarGroupProps {
  avatars: AvatarProps[]
  max?: number       // default 4, shows +N for overflow
  size?: AvatarSize
}
```

---

### Card
**File:** `components/foundation/card/card.tsx`
**Radix:** None

Compound component pattern:
```typescript
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Subtitle</Card.Description>
  </Card.Header>
  <Card.Body>content</Card.Body>
  <Card.Footer>actions</Card.Footer>
</Card>
```

**Props on Card:** `variant?: 'default'|'outline'|'ghost'`, `isHoverable?: boolean`, `isClickable?: boolean`

---

### Divider
**File:** `components/foundation/divider/divider.tsx`
**Radix:** `@radix-ui/react-separator`

**Props:** `orientation?: 'horizontal'|'vertical'`, `label?: string` (centered text in divider), `variant?: 'solid'|'dashed'|'dotted'`

---

### Spinner / Loader
**File:** `components/foundation/spinner/spinner.tsx`
**Radix:** None

**Variants:** `spinner` (rotating ring), `dots` (three pulsing dots), `bars` (vertical bars), `pulse` (fading circle)
**Sizes:** `xs`|`sm`|`md`|`lg`|`xl`
All animated with CSS animations (not Framer Motion — keep it lightweight).

---

### Progress
**File:** `components/foundation/progress/progress.tsx`
**Radix:** `@radix-ui/react-progress`

**Props:** `value: number` (0-100), `variant?: 'default'|'brand'|'success'|'warning'|'danger'`, `size?: 'sm'|'md'|'lg'`, `isIndeterminate?: boolean`, `label?: string`, `showValue?: boolean`

---

### Tooltip
**File:** `components/foundation/tooltip/tooltip.tsx`
**Radix:** `@radix-ui/react-tooltip` — USE THIS for accessibility and portal

**Props:** `content: React.ReactNode`, `side?: 'top'|'right'|'bottom'|'left'`, `align?: 'start'|'center'|'end'`, `delayDuration?: number`

**Visual spec:** Dark bg (neutral-900 dark:neutral-100), white text (dark:neutral-900), radius-md, shadow-lg, small arrow. Smooth fade + slide-in animation on open.

---

### Modal / Dialog
**File:** `components/foundation/modal/modal.tsx`
**Radix:** `@radix-ui/react-dialog` — USE THIS for focus trap, portal, escape key

**Props:** `isOpen`, `onClose`, `title?`, `description?`, `size?: 'sm'|'md'|'lg'|'xl'|'full'`

**Visual spec:**
- Overlay: `bg-black/60` with `backdrop-blur-sm`
- Dialog: white dark:neutral-900, radius-xl, shadow-xl
- Smooth scale + fade animation on open/close
- X close button top-right
- Mobile: slides up from bottom (drawer behavior)

Also build `ConfirmModal` — a convenience wrapper for yes/no confirmation dialogs.

---

### Drawer
**File:** `components/foundation/drawer/drawer.tsx`
**Radix:** `@radix-ui/react-dialog` (re-used with different animation)

**Props:** `side?: 'left'|'right'|'top'|'bottom'`, `size?: 'sm'|'md'|'lg'|'full'`

Slides in from the specified side. Overlay same as Modal.

---

### Dropdown Menu
**File:** `components/foundation/dropdown/dropdown.tsx`
**Radix:** `@radix-ui/react-dropdown-menu`

Support: items, separators, sub-menus, checkbox items, radio items, disabled items, icons in items.

---

### Tabs
**File:** `components/foundation/tabs/tabs.tsx`
**Radix:** `@radix-ui/react-tabs`

**Props:** `variant?: 'underline'|'pills'|'boxed'`, `orientation?: 'horizontal'|'vertical'`
- `underline`: thin indicator that slides under active tab
- `pills`: active tab has bg-neutral-100 dark:bg-neutral-800 pill
- `boxed`: all tabs in a rounded container, active has white bg card

---

### Accordion
**File:** `components/foundation/accordion/accordion.tsx`
**Radix:** `@radix-ui/react-accordion`

**Props:** `type?: 'single'|'multiple'`, `collapsible?: boolean`
Chevron rotates 180° on open. Content slides down with height animation.

---

### Toast / Notification
**File:** `components/foundation/toast/toast.tsx` + `use-toast.ts`
**Radix:** `@radix-ui/react-toast`

**Props:** `title`, `description?`, `variant?: 'default'|'success'|'warning'|'danger'`, `duration?`, `action?: { label: string; onClick: () => void }`

Build `useToast()` hook: `toast.success('message')`, `toast.error('message')`, `toast.warning('message')`, `toast.info('message')`.
Toasts stack bottom-right, animate in from right, stack with offset on hover.

---

### Table
**File:** `components/foundation/table/table.tsx`

Compound component:
```typescript
<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head sortable onSort={...}>Name</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row isSelected>
      <Table.Cell>value</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

Features: sticky header, row hover, row selection (checkbox column), sort indicators, loading skeleton state, empty state slot.

---

### Pagination
**File:** `components/foundation/pagination/pagination.tsx`

**Props:** `currentPage`, `totalPages`, `onPageChange`, `siblingCount?: number`, `showFirstLast?: boolean`

---

### Combobox / Command
**File:** `components/foundation/combobox/combobox.tsx`
**Radix:** `@radix-ui/react-popover` + custom search logic

Searchable select with fuzzy filtering. Keyboard navigable. Shows empty state when no results.

---

### Date Picker
**File:** `components/foundation/date-picker/date-picker.tsx`
**Radix:** `@radix-ui/react-popover` + `react-day-picker`

Supports: single date, date range, min/max date, disabled dates.

---

### Slider
**File:** `components/foundation/slider/slider.tsx`
**Radix:** `@radix-ui/react-slider`

**Props:** `min`, `max`, `step`, `value`, `onChange`, `isRange?: boolean`, `showTooltip?: boolean`

---

### Navbar
**File:** `components/foundation/navbar/navbar.tsx`

Compound component. Responsive: desktop = horizontal, mobile = hamburger + slide-down menu.
**Props:** `isSticky?: boolean`, `variant?: 'default'|'transparent'|'blur'` (blur uses backdrop-filter)

---

### Sidebar
**File:** `components/foundation/sidebar/sidebar.tsx`

**Props:** `isCollapsible?: boolean`, `defaultCollapsed?: boolean`, `width?: number`
Collapses to icon-only mode. Items have `icon`, `label`, `href`, `badge?`, `children?` (nested nav).

---

## 6. Layer 2 — Animated Components (30 components)

All use Framer Motion. All respect `prefers-reduced-motion`. All are dark mode compatible.

**Standard animated component template:**
```typescript
'use client' // required — all animated components are client components

import { motion, useReducedMotion } from 'framer-motion'

export const AnimatedComponent = ({ className, ...props }) => {
  const prefersReduced = useReducedMotion()

  // If reduced motion preferred, render static version
  if (prefersReduced) return <StaticFallback {...props} />

  return <motion.div ...>...</motion.div>
}
```

---

### Animated Gradient Text
**File:** `components/animated/animated-gradient-text/`

Text with an animated gradient that cycles through brand colors.
```typescript
interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: string[]   // array of colors, defaults to brand palette
  duration?: number     // animation duration in seconds, default 3
  animationDirection?: 'horizontal' | 'diagonal'
}
```
Implementation: CSS `background-clip: text` + `@keyframes` background-position animation. No Framer Motion needed — pure CSS is more performant for this.

---

### Border Beam
**File:** `components/animated/border-beam/`

Animated beam of light that travels around a container's border.
```typescript
interface BorderBeamProps {
  size?: number          // beam size, default 150
  duration?: number      // seconds for one loop, default 15
  delay?: number
  colorFrom?: string     // default '#ffaa40'
  colorTo?: string       // default '#9c40ff'
  borderWidth?: number   // default 1.5
  className?: string
}
```
Wraps its children. Uses a conic-gradient pseudo-element rotating via CSS animation. Apply as: `<BorderBeam><YourCard /></BorderBeam>`

---

### Shimmer Button
**File:** `components/animated/shimmer-button/`

Button with a moving shimmer/shine effect across its surface.
```typescript
interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string     // default '#ffffff'
  shimmerSize?: string      // default '0.05em'
  borderRadius?: string     // default '100px'
  shimmerDuration?: string  // default '3s'
  background?: string       // default 'rgba(0, 0, 0, 1)'
  children: React.ReactNode
}
```

---

### Marquee
**File:** `components/animated/marquee/`

Infinite horizontal or vertical scrolling content.
```typescript
interface MarqueeProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  speed?: number           // pixels per second, default 50
  pauseOnHover?: boolean   // default true
  gap?: number             // gap between items in px
  repeat?: number          // how many times to duplicate content, default 4
  className?: string
}
```
Implementation: CSS `@keyframes` translate animation. Duplicate children to make seamless loop.

---

### Particles Background
**File:** `components/animated/particles/`

Canvas-based floating particles.
```typescript
interface ParticlesProps {
  quantity?: number        // default 100
  color?: string           // default '#ffffff'
  size?: number            // default 0.4
  vx?: number              // x velocity
  vy?: number              // y velocity
  ease?: number            // easing factor
  staticity?: number       // how stationary particles are
  refresh?: boolean
  className?: string
}
```
Implementation: HTML5 Canvas + requestAnimationFrame. Mouse interaction: particles attracted/repelled by cursor.

---

### Globe 3D
**File:** `components/animated/globe/`

Interactive 3D globe with dots/arcs.
Dependency: `cobe` (npm package — this one is worth the dependency)
```typescript
interface GlobeProps {
  className?: string
  config?: COBEOptions     // full cobe config passthrough
}
```
Default config: dark globe, brand-colored arcs, auto-rotating.

---

### Spotlight
**File:** `components/animated/spotlight/`

Radial spotlight effect that follows mouse cursor.
```typescript
interface SpotlightProps {
  className?: string
  fill?: string    // spotlight color, default 'white'
}
```
Implementation: SVG filter + mouse position tracking via `onMouseMove`.

---

### Bento Grid
**File:** `components/animated/bento-grid/`

CSS Grid layout for feature showcases. Items can span columns/rows.
```typescript
interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

interface BentoCardProps {
  name: string
  description: string
  Icon: React.ElementType
  href?: string
  cta?: string
  background?: React.ReactNode    // decorative bg content
  className?: string
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2
}
```

---

### Number Ticker
**File:** `components/animated/number-ticker/`

Animates a number counting up from 0 (or startValue) to the target value.
```typescript
interface NumberTickerProps {
  value: number
  startValue?: number     // default 0
  direction?: 'up' | 'down'
  duration?: number       // seconds, default 2
  delay?: number
  decimalPlaces?: number  // default 0
  prefix?: string         // e.g. '$'
  suffix?: string         // e.g. 'k'
  className?: string
}
```
Implementation: Framer Motion `useSpring` + `useTransform` for smooth counting.

---

### Animated Beam
**File:** `components/animated/animated-beam/`

Animated SVG beam connecting two elements (used for showing data flow, connections).
```typescript
interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLElement>  // parent container
  fromRef: React.RefObject<HTMLElement>       // source element
  toRef: React.RefObject<HTMLElement>         // target element
  curvature?: number       // beam curve amount, default 0 (straight)
  reverse?: boolean        // reverse animation direction
  duration?: number        // default 3
  delay?: number
  pathColor?: string       // default 'gray'
  pathWidth?: number       // default 2
  pathOpacity?: number     // default 0.2
  gradientStartColor?: string  // default '#ffaa40'
  gradientStopColor?: string   // default '#9c40ff'
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}
```

---

### Orbiting Circles
**File:** `components/animated/orbiting-circles/`

Elements orbiting around a center element.
```typescript
interface OrbitingCirclesProps {
  children: React.ReactNode   // the orbiting items
  radius?: number             // orbit radius, default 50
  duration?: number           // seconds per orbit, default 20
  delay?: number              // start delay
  reverse?: boolean
  className?: string
}
```

---

### Word Rotate
**File:** `components/animated/word-rotate/`

Cycles through an array of words with a flip/slide animation.
```typescript
interface WordRotateProps {
  words: string[]
  duration?: number       // ms between rotations, default 2500
  motionProps?: object    // Framer Motion props override
  className?: string
}
```

---

### Typing Animation
**File:** `components/animated/typing-animation/`

Types out text character by character.
```typescript
interface TypingAnimationProps {
  text: string
  duration?: number        // ms per character, default 50
  delay?: number
  cursor?: boolean         // show blinking cursor, default true
  cursorChar?: string      // default '|'
  className?: string
  onComplete?: () => void
}
```

---

### Text Reveal
**File:** `components/animated/text-reveal/`

Text revealed on scroll — each word/line fades in as it enters viewport.
```typescript
interface TextRevealProps {
  text: string
  className?: string
  revealBy?: 'word' | 'line' | 'character'
  threshold?: number      // intersection threshold, default 0.5
}
```
Implementation: `IntersectionObserver` + Framer Motion staggered children.

---

### Blur Fade
**File:** `components/animated/blur-fade/`

Content fades in with a blur effect on mount or when it enters the viewport.
```typescript
interface BlurFadeProps {
  children: React.ReactNode
  className?: string
  variant?: { hidden: MotionProps; visible: MotionProps }
  duration?: number       // default 0.4
  delay?: number
  yOffset?: number        // vertical slide offset, default 6
  inView?: boolean        // trigger on scroll, default false
  blur?: string           // blur amount, default '6px'
}
```

---

### Confetti
**File:** `components/animated/confetti/`

Trigger confetti burst from any point.
```typescript
// Imperative API via ref
interface ConfettiRef {
  fire: (options?: ConfettiOptions) => void
}

interface ConfettiProps {
  ref?: React.Ref<ConfettiRef>
  onMouseEnter?: () => void   // auto-fire on hover
  className?: string
}
```
Dependency: `canvas-confetti`

---

### Meteors
**File:** `components/animated/meteors/`

Animated meteor shower effect background.
```typescript
interface MeteorsProps {
  number?: number         // meteor count, default 20
  className?: string
}
```
Implementation: CSS animation with random delays and positions. Pure CSS, no canvas.

---

### Ripple
**File:** `components/animated/ripple/`

Concentric ripple circles emanating from center. Used as backgrounds.
```typescript
interface RippleProps {
  mainCircleSize?: number     // default 210
  mainCircleOpacity?: number  // default 0.24
  numCircles?: number         // default 8
  className?: string
}
```

---

### Pulsating Button
**File:** `components/animated/pulsating-button/`

Button with a pulsing glow/ring animation.
```typescript
interface PulsatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string     // default '#6366f1'
  duration?: string       // CSS duration, default '1.5s'
  className?: string
  children: React.ReactNode
}
```

---

### Rainbow Button
**File:** `components/animated/rainbow-button/`

Button with an animated rainbow border/glow effect.
```typescript
interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}
```

---

### Neon Gradient Card
**File:** `components/animated/neon-gradient-card/`

Card with animated neon border gradient.
```typescript
interface NeonGradientCardProps {
  children: React.ReactNode
  borderSize?: number       // default 5
  borderRadius?: number     // default 20
  neonColors?: { firstColor: string; secondColor: string }
  className?: string
}
```

---

### Smooth Cursor
**File:** `components/animated/smooth-cursor/`

Custom cursor that follows mouse with spring physics.
```typescript
interface SmoothCursorProps {
  cursor?: React.ReactNode   // custom cursor element, default dot + ring
  springConfig?: SpringOptions
  className?: string
}
```

---

### Aurora Background
**File:** `components/animated/aurora-background/`

Animated aurora borealis gradient background.
```typescript
interface AuroraBackgroundProps {
  children?: React.ReactNode
  showRadialGradient?: boolean
  className?: string
}
```

---

### Warp Background
**File:** `components/animated/warp-background/`

Animated perspective grid that creates a warp/tunnel effect.
```typescript
interface WarpBackgroundProps {
  children?: React.ReactNode
  perspective?: number
  beamsPerSide?: number
  beamSize?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  gridColor?: string
  className?: string
}
```

---

### Flickering Grid
**File:** `components/animated/flickering-grid/`

Canvas grid where cells randomly flicker on and off.
```typescript
interface FlickeringGridProps {
  squareSize?: number       // default 4
  gridGap?: number          // default 6
  flickerChance?: number    // 0-1, default 0.3
  color?: string            // default '#6366f1'
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
}
```

---

### Animated Shiny Text
**File:** `components/animated/animated-shiny-text/`

Text with a moving shine/gloss effect.
```typescript
interface AnimatedShinyTextProps {
  children: React.ReactNode
  className?: string
  shimmerWidth?: number    // default 100
}
```

---

### Scroll Progress
**File:** `components/animated/scroll-progress/`

Progress bar showing scroll position within the page.
```typescript
interface ScrollProgressProps {
  position?: 'top' | 'bottom'
  color?: string           // default brand-500
  height?: number          // default 4
  className?: string
}
```

---

### Icon Cloud
**File:** `components/animated/icon-cloud/`

3D rotating sphere of icons/logos.
Dependency: `react-icon-cloud`
```typescript
interface IconCloudProps {
  iconSlugs?: string[]    // simple-icons slugs
  images?: string[]       // custom image URLs
  className?: string
}
```

---

## 7. Layer 3 — Section Blocks (20 blocks)

Full page sections. Each is a self-contained component with sensible defaults and full customization via props. Every section uses Layer 2 animated components for visual interest.

**Section component template:**
```typescript
// All sections follow this structure
interface SectionProps {
  // Content props (required data)
  // Visual props (layout options)
  // Animation props (optional overrides)
  className?: string
  id?: string             // for anchor navigation
}
```

---

### Hero Section
**File:** `components/sections/hero/`

The most important section. Multiple layout variants.
```typescript
interface HeroProps {
  badge?: string                  // small pill text above headline
  headline: string | string[]     // supports array for word rotate
  subheadline?: string
  cta?: { label: string; href: string; variant?: ButtonVariant }
  ctaSecondary?: { label: string; href: string }
  media?: React.ReactNode         // image, video, or 3D element
  layout?: 'centered' | 'split-left' | 'split-right'
  background?: 'particles' | 'aurora' | 'grid' | 'warp' | 'none'
  announcement?: { label: string; text: string; href?: string }
}
```

Variants to build:
1. **Centered + Particles** — centered text, particles bg, shimmer CTA button
2. **Split + 3D** — left text, right animated element (Globe or demo)
3. **Simple + Aurora** — minimal text, aurora gradient bg

---

### Features Grid
**File:** `components/sections/features/`

```typescript
interface FeaturesProps {
  eyebrow?: string
  headline: string
  subheadline?: string
  features: {
    icon: React.ElementType
    title: string
    description: string
    href?: string
  }[]
  layout?: 'grid-3' | 'grid-4' | 'bento' | 'alternating'
}
```

`bento` layout uses the `BentoGrid` animated component. `alternating` shows icon+text alternating left/right with scroll reveal.

---

### Pricing Table
**File:** `components/sections/pricing/`

```typescript
interface PricingProps {
  eyebrow?: string
  headline: string
  billing?: { monthly: boolean; onChange: (v: boolean) => void }
  plans: {
    name: string
    price: { monthly: number; annual: number } | 'custom'
    description: string
    features: string[]
    cta: { label: string; href: string }
    isPopular?: boolean
    badge?: string
  }[]
}
```

---

### Testimonials
**File:** `components/sections/testimonials/`

```typescript
interface TestimonialsProps {
  eyebrow?: string
  headline: string
  testimonials: {
    quote: string
    name: string
    title: string
    company?: string
    avatar?: string
    rating?: 1 | 2 | 3 | 4 | 5
  }[]
  layout?: 'marquee' | 'grid' | 'carousel'
}
```

`marquee` layout uses the `Marquee` animated component (two rows, opposite directions).

---

### FAQ Section
**File:** `components/sections/faq/`

```typescript
interface FAQProps {
  eyebrow?: string
  headline: string
  faqs: { question: string; answer: string }[]
  layout?: 'accordion' | 'grid'
}
```

Uses `Accordion` component from Layer 1.

---

### CTA Section
**File:** `components/sections/cta/`

Full-width conversion section.
```typescript
interface CTAProps {
  headline: string
  subheadline?: string
  cta: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  background?: 'brand' | 'dark' | 'border-beam'
}
```
`border-beam` variant wraps section in `BorderBeam` component.

---

### Logo Cloud
**File:** `components/sections/logo-cloud/`

```typescript
interface LogoCloudProps {
  eyebrow?: string
  logos: { name: string; src: string; href?: string }[]
  animate?: boolean    // scrolling marquee vs static grid
}
```

---

### Stats Section
**File:** `components/sections/stats/`

```typescript
interface StatsProps {
  eyebrow?: string
  headline?: string
  stats: {
    value: number | string
    suffix?: string
    prefix?: string
    label: string
    description?: string
  }[]
  animate?: boolean   // uses NumberTicker if true
}
```

---

### Team Grid
**File:** `components/sections/team/`

```typescript
interface TeamProps {
  eyebrow?: string
  headline: string
  members: {
    name: string
    role: string
    bio?: string
    avatar: string
    socials?: { platform: 'twitter' | 'github' | 'linkedin'; href: string }[]
  }[]
}
```

---

### Blog Cards
**File:** `components/sections/blog/`

```typescript
interface BlogProps {
  eyebrow?: string
  headline: string
  posts: {
    title: string
    excerpt: string
    category: string
    publishedAt: string
    readTime: number
    href: string
    coverImage?: string
    author: { name: string; avatar?: string }
  }[]
  layout?: 'grid' | 'list' | 'featured'
}
```

---

### Contact Form
**File:** `components/sections/contact/`

```typescript
interface ContactProps {
  headline: string
  subheadline?: string
  onSubmit: (data: ContactFormData) => Promise<void>
  fields?: ('name' | 'email' | 'company' | 'phone' | 'message' | 'subject')[]
}
```

Uses Layer 1 Input, Select, Textarea, Button. Built-in loading + success states.

---

### Footer
**File:** `components/sections/footer/`

```typescript
interface FooterProps {
  logo: React.ReactNode
  description?: string
  links: {
    heading: string
    items: { label: string; href: string; isNew?: boolean }[]
  }[]
  socials?: { platform: string; href: string; icon: React.ElementType }[]
  bottomLinks?: { label: string; href: string }[]
  copyright?: string
}
```

---

### Auth Pages
**File:** `components/sections/auth/`

Build three variants:
- `SignIn` — email + password, forgot password link, social auth buttons
- `SignUp` — name + email + password, terms acceptance
- `ForgotPassword` — email only

All three: centered card on full-page bg (aurora or particles optional), fully accessible forms.

---

### 404 Page
**File:** `components/sections/not-found/`

```typescript
interface NotFoundProps {
  headline?: string         // default '404'
  subheadline?: string
  description?: string
  cta?: { label: string; href: string }
}
```

Include an animated element (orbiting circles, particles) to make it feel designed.

---

### Dashboard Layout
**File:** `components/sections/dashboard-layout/`

```typescript
interface DashboardLayoutProps {
  sidebar: React.ReactNode
  header: React.ReactNode
  children: React.ReactNode
  sidebarWidth?: number
}
```

Uses Layer 1 `Sidebar` + `Navbar`. Handles collapse, mobile responsiveness.

---

### Waitlist Section
**File:** `components/sections/waitlist/`

```typescript
interface WaitlistProps {
  headline: string
  subheadline?: string
  placeholder?: string
  ctaLabel?: string
  onSubmit: (email: string) => Promise<void>
  socialProof?: { count: number; label: string; avatars?: string[] }
  background?: 'aurora' | 'particles' | 'none'
}
```

---

### Changelog Block
**File:** `components/sections/changelog/`

```typescript
interface ChangelogProps {
  entries: {
    version: string
    date: string
    title: string
    description: string
    tags?: ('feature' | 'fix' | 'improvement' | 'breaking')[]
    items: string[]
  }[]
}
```

Timeline layout. Each entry has a dot on a vertical line. Tags have colored badges.

---

### Comparison Table
**File:** `components/sections/comparison/`

```typescript
interface ComparisonProps {
  eyebrow?: string
  headline: string
  competitors: string[]
  features: {
    category: string
    items: {
      name: string
      values: (boolean | string)[]   // index matches competitors array
    }[]
  }[]
  highlightIndex?: number   // which competitor column to highlight (yours)
}
```

---

## 8. Docs Site Architecture

The docs site IS the product. First impression = GitHub stars.

### Structure
```
apps/docs/
├── app/
│   ├── page.tsx                  ← Landing page (marketing)
│   ├── docs/
│   │   ├── getting-started/
│   │   │   ├── introduction.mdx
│   │   │   ├── installation.mdx
│   │   │   └── theming.mdx
│   │   ├── foundation/           ← Layer 1 docs
│   │   ├── animated/             ← Layer 2 docs
│   │   └── sections/             ← Layer 3 docs
│   └── layout.tsx
```

### Every Component Page Must Have

1. **Live preview** — the component rendered, interactive, in a framed sandbox
2. **Live playground** — sliders/inputs to change props and see updates in real time (this is the differentiator)
3. **Code block** — copy button, syntax highlighted, shows the exact code to paste
4. **Props table** — name, type, default, description for every prop
5. **Installation** — what to copy, what dependencies to install
6. **Examples** — 2-3 usage variants

### Component Page MDX Template

```mdx
---
title: ComponentName
description: One sentence description
---

<ComponentPreview name="component-name" />

## Installation

<ComponentInstall dependencies={['framer-motion']} />

<ComponentSource name="component-name" />

## Usage

<ComponentCode>
```tsx
import { ComponentName } from "@/components/..."
export default function Demo() {
  return <ComponentName prop="value" />
}
```
</ComponentCode>

## Playground

<ComponentPlayground name="component-name" />

## Props

<PropsTable component="component-name" />

## Examples

### Variant name
<ComponentPreview name="component-name-variant" />
```

---

## 9. The Live Playground (Critical Feature)

Every Layer 2 component page has a playground panel where users can:
- Change colors (color picker)
- Adjust speeds/durations (sliders)
- Toggle boolean props (switches)
- Change text content (text inputs)

And see the component update in real time without page reload.

**Implementation:**
```typescript
// components/playground/playground.tsx
interface PlaygroundConfig {
  component: React.ComponentType
  props: {
    name: string
    type: 'color' | 'number' | 'boolean' | 'string' | 'select'
    label: string
    default: any
    min?: number         // for number type
    max?: number
    step?: number
    options?: string[]   // for select type
  }[]
}
```

Build this in week 3. It is the biggest differentiator vs MagicUI and Aceternity.

---

## 10. Component Build Checklist

Before any PR is merged, the component must pass ALL of these:

```
CODE QUALITY
[ ] TypeScript strict — zero errors, zero `any`
[ ] Props interface exported
[ ] Component has displayName set
[ ] forwardRef used where DOM access needed
[ ] cn() used for all className merging

ACCESSIBILITY
[ ] Keyboard navigable (Tab, Enter, Space, Arrow keys as appropriate)
[ ] Focus ring visible (brand-500 ring)
[ ] ARIA roles/labels correct
[ ] Screen reader tested (at minimum, correct semantic HTML)
[ ] Radix primitive used where appropriate

VISUAL
[ ] Light mode: looks correct
[ ] Dark mode: looks correct, no invisible text
[ ] Mobile responsive (tested at 375px width)
[ ] Hover states defined
[ ] Active/pressed states defined
[ ] Disabled states defined (where applicable)
[ ] Loading states defined (where applicable)
[ ] Empty states defined (where applicable)

ANIMATION (Layer 2 only)
[ ] prefers-reduced-motion respected
[ ] No jank on initial render
[ ] Animation tokens used (not hardcoded durations)
[ ] Works without Framer Motion (static fallback)

DOCS
[ ] MDX page created in apps/docs
[ ] Live preview works
[ ] Props table complete
[ ] At least one code example
[ ] Copy button on all code blocks
```

---

## 11. Naming Conventions

```
Files:          kebab-case          button.tsx, animated-beam.tsx
Components:     PascalCase          Button, AnimatedBeam
Props:          camelCase           isDisabled, colorFrom
CSS classes:    kebab-case via twMerge
Hooks:          usePrefix           useToast, useReducedMotion
Utilities:      camelCase           cn, formatDate
Constants:      SCREAMING_SNAKE     DEFAULT_DURATION, MAX_ITEMS
Types/Interfaces: PascalCase + suffix  ButtonProps, ButtonVariant
```

---

## 12. Commit Convention

```
feat(button): add destructive variant
fix(modal): fix focus trap on mobile
docs(marquee): add playground config
refactor(select): migrate to radix-select v2
chore: update framer-motion to 11.x
```

Format: `type(scope): description`
Types: `feat` | `fix` | `docs` | `refactor` | `chore` | `test`

---

## 13. What Makes This Different — The Agent Reminder

When in doubt, refer back to these three things:

1. **Completeness** — We cover everything. If a developer is building a website, they should never need to leave our library. Tooltip to Hero section, all in one place.

2. **The playground** — Every animated component has a live prop editor. This is our biggest DX differentiator. Do not ship an animated component without it.

3. **Visual identity** — We are not shadcn. We are not MagicUI. We have our own color system, our own `--brand-500` indigo, our own token names. Never import shadcn defaults. Never use the generic slate/zinc color names directly — always use our semantic token names.

---

*Last updated: project init*
*Owner: Piyush*
*Status: v0.1 — initial agent context*
