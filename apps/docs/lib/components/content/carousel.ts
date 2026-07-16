import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Carousel } from '@varient/ui'\n\n<Carousel align="center" gap={16} className="w-full max-w-md">\n  <Carousel.Item className="w-full">Slide one</Carousel.Item>\n  <Carousel.Item className="w-full">Slide two</Carousel.Item>\n  <Carousel.Item className="w-full">Slide three</Carousel.Item>\n  <Carousel.Previous />\n  <Carousel.Next />\n  <Carousel.Dots />\n</Carousel>`,
  props: [
    {
      title: 'Carousel',
      rows: [
        {
          name: 'align',
          type: "'start' | 'center'",
          defaultValue: "'center'",
          description: 'How each slide snaps against the viewport edge.',
        },
        {
          name: 'gap',
          type: 'number',
          defaultValue: '16',
          description: 'Gap between slides in pixels.',
        },
        {
          name: 'index',
          type: 'number',
          description: 'Controlled active slide index — pair with onIndexChange.',
        },
        {
          name: 'defaultIndex',
          type: 'number',
          defaultValue: '0',
          description: 'Initial active slide index for uncontrolled usage.',
        },
        {
          name: 'onIndexChange',
          type: '(index: number) => void',
          description: 'Fires whenever the active slide changes — drag, arrows, dots, or keyboard.',
        },
        {
          name: 'isLooping',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'Wraps Previous/Next/Dots navigation past the first/last slide. Drag itself stays bounded to the real track — there is no clone rail.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged onto the outer wrapper via cn().',
        },
      ],
    },
    {
      title: 'Carousel.Item',
      rows: [
        {
          name: 'className',
          type: 'string',
          description:
            'Additional Tailwind classes — controls slide width (`w-full` for one-at-a-time, `w-[70%]` etc. for a peek layout). Accepts any standard `div` props otherwise.',
        },
      ],
    },
    {
      title: 'Carousel.Previous / Carousel.Next',
      rows: [
        {
          name: 'className',
          type: 'string',
          description:
            'Additional Tailwind classes merged via cn(). Disabled automatically at the bounds when `isLooping` is false. Accepts any standard `button` props otherwise.',
        },
      ],
    },
    {
      title: 'Carousel.Dots',
      rows: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged onto the dots row via cn().',
        },
      ],
    },
  ],
  features: [
    'Drag-to-snap with real physics — dragEnd projects the release velocity forward and animates to the nearest slide with SPRING_DEFAULT, no embla dependency.',
    'Slide width is fully consumer-controlled via `Carousel.Item`\'s `className` (`w-full`, `w-[70%]`, responsive variants), so one component covers single-slide, multi-up, and centered "peek" layouts.',
    'Positions are measured live from the DOM (item offsets + viewport width) via `ResizeObserver`, so resizing the window or changing slide count keeps everything snapped correctly.',
    '`Carousel.Previous`, `Carousel.Next`, and `Carousel.Dots` can be written anywhere inside `<Carousel>` — the root splits `Carousel.Item` children into the draggable track and renders everything else as a sibling automatically.',
    'Fully controlled or uncontrolled active index (`index`/`defaultIndex`/`onIndexChange`), matching the Tabs convention.',
    'Fully respects `prefers-reduced-motion` — drag itself still works, but the release/settle snap becomes an instant jump with no spring.',
  ],
  keyboard: [
    { keys: 'Tab', description: 'Moves focus to the carousel viewport, then to Previous/Next/Dots buttons.' },
    { keys: 'ArrowLeft / ArrowRight', description: 'Navigate to the previous/next slide when the viewport is focused.' },
    { keys: 'Enter / Space', description: 'Activates a focused Previous/Next/Dots button.' },
  ],
  aria: [
    {
      attribute: 'role="region" aria-roledescription="carousel"',
      element: 'viewport (focusable container)',
      purpose: 'Identifies the focusable region as a carousel for assistive tech.',
    },
    {
      attribute: 'role="group" aria-roledescription="slide" aria-label="N of M"',
      element: 'Carousel.Item',
      purpose: 'Announces each slide\'s position, computed automatically from render order.',
    },
    {
      attribute: 'aria-label="Previous slide" / "Next slide"',
      element: 'Carousel.Previous / Carousel.Next',
      purpose: 'Accessible name for the icon-only navigation buttons.',
    },
    {
      attribute: 'aria-label="Go to slide N" aria-current',
      element: 'Carousel.Dots buttons',
      purpose: 'Accessible name and current-slide indication for each dot.',
    },
  ],
  a11yNotes: [
    'Previous/Next render as real `<button disabled>` elements at the bounds when `isLooping` is false, rather than only visually dimming — they are unreachable by activation, not just by style.',
    'Offscreen/adjacent slides are not `aria-hidden` — the spec keeps this simple since all rendered slides sit directly adjacent to the viewport.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/carousel/carousel.tsx',
    'packages/ui/src/components/animated/carousel/index.ts',
  ],
};
