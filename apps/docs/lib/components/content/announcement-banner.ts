import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { AnnouncementBanner } from '@varient/ui'

<AnnouncementBanner
  variant="brand"
  icon={<SparkleIcon />}
  message="Varient v1.2 is live — 12 new animated components."
  link={{ label: 'Read the changelog', href: '/changelog' }}
/>`,
  props: [
    {
      title: 'AnnouncementBanner',
      rows: [
        { name: 'message', type: 'ReactNode', description: 'Primary banner copy.' },
        { name: 'link', type: '{ label: string; href: string }', description: 'Optional inline link appended after the message.' },
        { name: 'variant', type: "'neutral' | 'brand'", defaultValue: "'neutral'", description: 'Visual style — brand adds a brand/5 wash, brand-tinted border, dot indicator (or icon) and brand link color.' },
        { name: 'icon', type: 'ReactNode', description: 'Optional leading icon rendered before the message, replacing the brand dot indicator.' },
        { name: 'isDismissed', type: 'boolean', description: 'Controlled dismiss state. Omit for uncontrolled behavior.' },
        { name: 'onDismiss', type: '() => void', description: 'Called when the dismiss button is clicked.' },
        { name: 'isAnimated', type: 'boolean', defaultValue: 'true', description: 'Slide-down entrance on mount. Disabled when prefers-reduced-motion is active.' },
        { name: 'dismissLabel', type: 'string', defaultValue: "'Dismiss announcement'", description: 'Accessible label applied to the dismiss button.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root banner wrapper.' },
      ],
    },
  ],
  features: [
    'Uncontrolled or controlled dismiss (isDismissed / onDismiss) with AnimatePresence slide-down entrance and exit.',
    'brand variant carries real visual weight: brand/5 background wash, brand-tinted border, and a brand dot indicator.',
    'Optional icon slot renders a custom leading icon in place of the brand dot for either variant.',
    'dismissLabel lets consumers customize the dismiss button aria-label per instance.',
    'Reduced-motion aware: entrance/exit collapse to instant fades, and the dismiss button press-scale is disabled under motion-reduce.',
  ],
  keyboard: [
    { keys: 'Tab', description: 'Moves focus to the optional link and dismiss button.' },
    { keys: 'Enter / Space', description: 'Activates the focused control.' },
  ],
  aria: [
    { attribute: 'role="region"', element: 'Root wrapper', purpose: 'Identifies the banner as a landmark region.' },
    { attribute: 'aria-labelledby', element: 'Root wrapper', purpose: 'Links the region to the message paragraph id.' },
    { attribute: 'aria-label', element: 'Dismiss button', purpose: 'Accessible name for the icon-only dismiss control, customizable via dismissLabel.' },
    { attribute: 'aria-hidden', element: 'Brand dot / icon slot', purpose: 'Decorative indicator is hidden from assistive tech; the message text carries the meaning.' },
  ],
  a11yNotes: [
    'Entrance/exit animation and the dismiss button press-scale respect prefers-reduced-motion.',
    'The dismiss button is keyboard-reachable with a visible focus-visible ring.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/announcement-banner/announcement-banner.tsx',
    'packages/ui/src/components/sections/announcement-banner/index.ts',
  ],
};
