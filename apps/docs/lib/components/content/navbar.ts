import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Navbar } from '@varient/ui'

<Navbar
  brandName="Varient"
  activeHref="/docs"
  items={[
    { label: 'Components', href: '/components' },
    { label: 'Docs', href: '/docs' },
    { label: 'Sections', href: '/docs/sections/hero' },
  ]}
  githubHref="https://github.com/piyush/varient"
  cta={{ label: 'Get started', href: '/docs/getting-started/installation' }}
/>`,
  props: [
    {
      title: 'Navbar',
      rows: [
        { name: 'brandName', type: 'string', defaultValue: "'Varient'", description: 'Wordmark text when `logo` is omitted — first segment in foreground, last three characters in brand color.' },
        { name: 'logo', type: 'ReactNode', description: 'Custom logo node — replaces the default two-tone wordmark.' },
        { name: 'items', type: '{ label: string; href: string }[]', defaultValue: '(see source)', description: 'Center nav links rendered on desktop and in the mobile panel.' },
        { name: 'githubHref', type: 'string', description: 'Optional GitHub profile or repo URL — renders an icon link on the right.' },
        { name: 'cta', type: '{ label: string; href: string }', description: 'Optional primary CTA button on the right — uses the foundation Button.' },
        { name: 'isSticky', type: 'boolean', defaultValue: 'true', description: 'When true, pins the bar with `sticky top-0 z-50`.' },
        { name: 'activeHref', type: 'string', description: 'Href matching the current route — that item renders the `bg-primary text-foreground` pill and gets `aria-current="page"`.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root header.' },
      ],
    },
  ],
  features: [
    'Floating pill shell (`rounded-full border bg-background/80 backdrop-blur-xl`) with two-tone wordmark or custom `logo`.',
    '`activeHref` marks the current route item with the `bg-primary text-foreground` pill and `aria-current="page"`.',
    'Below `md`, links collapse behind a hamburger that toggles a height/opacity slide-down panel — content-push, not an overlay, so it does not lock body scroll.',
    'Optional GitHub icon link and primary CTA button, mirrored in both the desktop bar and the mobile panel.',
    'Escape closes the open mobile menu; all interactive elements share a consistent focus-visible ring.',
    'Reduced-motion users get an instant open/close on the mobile panel — no height or opacity transition.',
  ],
  keyboard: [
    { keys: 'Tab / Shift + Tab', description: 'Moves focus through the wordmark, nav links, GitHub icon, CTA, and menu button.' },
    { keys: 'Enter / Space', description: 'Activates the focused link or button.' },
    { keys: 'Escape', description: 'Closes the mobile menu when open.' },
  ],
  aria: [
    { attribute: 'aria-label="Main"', element: 'nav (desktop links)', purpose: 'Identifies the primary desktop navigation landmark.' },
    { attribute: 'aria-expanded / aria-controls', element: 'mobile menu button', purpose: 'Exposes open/closed state and links the button to the panel it controls.' },
    { attribute: 'aria-label="Mobile"', element: 'nav (mobile panel)', purpose: 'Identifies the mobile navigation landmark distinctly from the desktop one.' },
    { attribute: 'aria-current="page"', element: 'active item link', purpose: 'Marks the link matching `activeHref` as the current page for assistive tech.' },
  ],
  a11yNotes: [
    'The mobile panel expands in place and pushes content down; it intentionally does not trap focus or lock body scroll since it is not a true overlay.',
    'Escape closes the mobile menu from anywhere on the page while it is open.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/navbar/navbar.tsx',
    'packages/ui/src/components/sections/navbar/index.ts',
  ],
};
