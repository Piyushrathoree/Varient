import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { BrowserFrame } from '@/components/animated/browser-frame';

export function Example() {
  return (
    <BrowserFrame url="https://varient.dev/docs">
      <div className="px-6 py-8 text-center">
        <p className="font-semibold text-foreground">Your preview here</p>
      </div>
    </BrowserFrame>
  );
}`,
  props: [
    {
      title: 'BrowserFrame',
      rows: [
        { name: 'url', type: 'string', defaultValue: 'https://varient.dev', description: 'URL shown in the address bar.' },
        { name: 'isDark', type: 'boolean', defaultValue: 'false', description: 'When true, chrome uses dark smooth tokens; otherwise light chrome.' },
        { name: 'isAnimated', type: 'boolean', defaultValue: 'true', description: 'Whether the frame plays a subtle float/tilt entrance when scrolled into view.' },
        { name: 'children', type: 'ReactNode', description: 'Content rendered inside the browser viewport.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Traffic-light chrome and URL bar with a composable content slot for showcasing UI',
    'Dark/light chrome via isDark, using smooth-token surfaces for the dark variant',
    'Subtle whileInView float/tilt entrance (opacity, y, rotateX, rotateY) that plays once when scrolled into view',
    'Inline SVG globe glyph in the URL bar — no external icon dependency',
  ],
  aria: [
    { attribute: 'aria-hidden="true"', element: 'Traffic-light dots wrapper', purpose: 'Decorative chrome, not exposed to assistive tech.' },
    { attribute: 'aria-hidden="true"', element: 'Globe SVG glyph', purpose: 'Decorative icon in the URL bar, not exposed to assistive tech.' },
  ],
  a11yNotes: [
    'The frame is a presentational mockup — traffic lights and the URL-bar globe glyph are aria-hidden.',
    'Content passed as children retains its own semantics and is always rendered, never hidden.',
    'Under prefers-reduced-motion, or when isAnimated is false, the frame renders statically with no transform animation.',
    'Only opacity and transform (y, rotateX, rotateY) animate in the default motion path.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/browser-frame/browser-frame.tsx',
    'packages/ui/src/components/animated/browser-frame/index.ts',
  ],
};
