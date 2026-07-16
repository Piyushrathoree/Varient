import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { LogoCloud } from '@varient/ui'

<LogoCloud
  title="Trusted by teams at"
  logos={[
    { name: 'Acme' },
    { name: 'Northwind' },
    { name: 'Vertex' },
  ]}
/>`,
  props: [
    {
      title: 'LogoCloud',
      rows: [
        { name: 'title', type: 'string', defaultValue: "'Trusted by teams at'", description: 'Small centered eyebrow above the logo row — `text-sm text-muted-foreground`.' },
        { name: 'logos', type: '{ name: string; icon?: ReactNode }[]', defaultValue: '(6 placeholder wordmarks)', description: 'Partner logos — each renders an inline SVG mark plus name when `icon` is omitted.' },
        { name: 'isMarquee', type: 'boolean', defaultValue: 'false', description: 'When true, scrolls the row in an infinite CSS translate loop. Falls back to a static row under reduced motion.' },
        { name: 'durationSeconds', type: 'number', defaultValue: '28', description: 'Marquee loop duration in seconds. Only applies when `isMarquee` is true.' },
        { name: 'isIconOnly', type: 'boolean', defaultValue: 'false', description: 'Hide logo name text and render marks only.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section.' },
      ],
    },
  ],
  features: [
    'Static row fades and rises into view once via `whileInView` (matches the reveal used by sibling sections), skipped under reduced motion.',
    'Optional infinite marquee with a self-contained CSS `@keyframes` translate loop and edge fade masks, its speed tunable via `durationSeconds`.',
    'Six hand-drawn inline SVG placeholder marks cycle by index when a logo omits `icon`.',
    '`isIconOnly` hides logo name text for a marks-only presentation while keeping the name in the `title` attribute.',
    'Marquee automatically disables and falls back to the static row under `prefers-reduced-motion`.',
  ],
  a11yNotes: [
    'Root is a `<section>` with `aria-label` from `title` (or a generic partner label when `title` is omitted).',
    'Decorative SVG marks are `aria-hidden`.',
    'The duplicated marquee track (the second copy used for the seamless loop) is `aria-hidden` so screen readers do not hear logos twice.',
    'Marquee animation is disabled under `prefers-reduced-motion`; the static reveal is likewise skipped.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/logo-cloud/logo-cloud.tsx',
    'packages/ui/src/components/sections/logo-cloud/index.ts',
  ],
};
