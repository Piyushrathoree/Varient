import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { LineDraw } from '@varient/ui';

export function Example() {
  return (
    <div className="space-y-6">
      <LineDraw preset="underline" className="h-6 w-full" duration={1.2} />
      <LineDraw preset="arrow" className="h-12 w-48" isLooping />
      <LineDraw
        path="M 0 50 L 100 50"
        viewBox="0 0 100 100"
        className="size-24"
      />
    </div>
  );
}`,
  props: [
    {
      title: 'LineDraw',
      rows: [
        {
          name: 'preset',
          type: "'underline' | 'scribble' | 'arrow'",
          defaultValue: "'underline'",
          description: 'Built-in decorative path when path is omitted.',
        },
        {
          name: 'path',
          type: 'string',
          description: 'Custom SVG path d attribute — overrides preset.',
        },
        {
          name: 'duration',
          type: 'number',
          defaultValue: '1.2',
          description: 'Draw duration in seconds.',
        },
        {
          name: 'delay',
          type: 'number',
          defaultValue: '0',
          description: 'Delay before drawing starts, in seconds.',
        },
        {
          name: 'strokeWidth',
          type: 'number',
          defaultValue: '2',
          description: 'Stroke width in pixels.',
        },
        {
          name: 'isLooping',
          type: 'boolean',
          defaultValue: 'false',
          description: 'When true, the draw animation repeats after completing (0.6s repeat delay).',
        },
        {
          name: 'stroke',
          type: 'string',
          defaultValue: 'var(--color-foreground)',
          description: 'Stroke color for preset/path mode — pass var(--color-brand) for a brand-tinted stroke.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: 'Custom SVG children — top-level path elements are animated automatically; other children pass through untouched.',
        },
        {
          name: 'viewBox',
          type: 'string',
          description: "Overrides the preset's viewBox — required alongside a custom path if its coordinate space differs.",
        },
        {
          name: 'className',
          type: 'string',
          description: 'Size and layout classes on the root SVG.',
        },
      ],
    },
  ],
  features: [
    'Three ready-made decorative presets (underline, scribble, arrow) with matched viewBox + path data, or pass a fully custom `path`/`viewBox` pair.',
    'Drawing is scroll-triggered via useInView — the stroke animates pathLength/pathOffset from hidden to fully drawn as the SVG enters the viewport.',
    'isLooping keeps the useInView watch non-`once`, so the draw repeats with a 0.6s pause on every re-entry and naturally pauses again once it scrolls offscreen.',
    'Custom SVG children mode: pass your own `<path>`/`<motion.path>` elements and each top-level path is auto-wired with the same draw animation; non-path children render untouched.',
    'Respects prefers-reduced-motion — renders the fully drawn static path with no stroke animation, skipping the JS motion.svg entirely.',
  ],
  aria: [
    {
      attribute: 'aria-hidden="true"',
      element: 'svg (root)',
      purpose: 'The stroke drawing is decorative; pair it with visible text when the path itself conveys meaning.',
    },
  ],
  a11yNotes: [
    'Under prefers-reduced-motion, the component renders a plain `<svg>` with the path already at full pathLength — no motion/react runtime is invoked.',
    'Looping draws are gated by the same useInView instance used for the initial reveal, so the SVG animates back to hidden and the visible repeat cycle stops once it scrolls out of the viewport.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/line-draw/line-draw.tsx',
    'packages/ui/src/components/animated/line-draw/index.ts',
  ],
};
