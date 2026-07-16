import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Marquee } from '@varient/ui'\n\n<Marquee gap={12} speed={20}>\n  <span>Item one</span>\n  <span>Item two</span>\n  <span>Item three</span>\n</Marquee>`,
  props: [
    {
      title: 'Marquee',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Content rendered in the scrolling strip. Duplicated once for a seamless loop.' },
        { name: 'direction', type: "'left' | 'right' | 'up' | 'down'", defaultValue: "'left'", description: 'Scroll direction.' },
        { name: 'speed', type: 'number', defaultValue: '20', description: 'Seconds for one full loop.' },
        { name: 'isPaused', type: 'boolean', defaultValue: 'false', description: 'When true, the animation is paused.' },
        { name: 'pauseOnHover', type: 'boolean', defaultValue: 'true', description: 'Pause the animation while the pointer is over the track.' },
        { name: 'isReverse', type: 'boolean', defaultValue: 'false', description: 'Flip the scroll direction.' },
        { name: 'gap', type: 'number', defaultValue: '16', description: 'Gap between items in pixels.' },
        { name: 'edgeFade', type: "'none' | 'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Width of the edge fade masks. `none` removes them entirely.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Transform-only CSS keyframe animation for a seamless, GPU-cheap infinite loop.',
    'Horizontal and vertical directions, with an `isReverse` flip and adjustable `speed`.',
    'Configurable edge fade masks (`none`/`sm`/`md`/`lg`) that soften the strip overflow.',
    'Hover-to-pause and a manual `isPaused` override.',
    'Pauses automatically while scrolled offscreen via an IntersectionObserver, resuming on re-entry.',
    'Renders a static, non-animated row under `prefers-reduced-motion`.',
  ],
  a11yNotes: [
    'The duplicated content used to create the seamless loop is marked `aria-hidden` so screen readers do not hear items twice.',
    'The track sets `aria-live="off"` to avoid announcing every scroll tick.',
    'Under `prefers-reduced-motion`, no animation runs and no perpetual motion is rendered.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/marquee/marquee.tsx',
    'packages/ui/src/components/animated/marquee/index.ts',
  ],
};
