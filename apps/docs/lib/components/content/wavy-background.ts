import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { WavyBackground } from '@varient/ui'

<WavyBackground className="min-h-64 rounded-xl border border-border" speed="slow">
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
    <h2 className="text-2xl font-semibold">Wavy backdrop</h2>
  </div>
</WavyBackground>`,
  props: [
    {
      title: 'WavyBackground',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Content rendered above the wave canvas.' },
        {
          name: 'colors',
          type: 'string[]',
          description:
            'Stroke colors for each wave layer — defaults to neutral foreground/muted-foreground washes with a faint ember accent.',
        },
        {
          name: 'waveWidth',
          type: 'number',
          defaultValue: '50',
          description: 'Approximate vertical spacing between wave crests in pixels.',
        },
        {
          name: 'blur',
          type: 'number',
          defaultValue: '10',
          description: 'Softness of the wave strokes, approximated with layered thick strokes.',
        },
        {
          name: 'speed',
          type: "'slow' | 'fast'",
          defaultValue: "'slow'",
          description: 'Phase drift speed — slow is calmer, fast is more lively.',
        },
        {
          name: 'waveOpacity',
          type: 'number',
          defaultValue: '0.5',
          description: 'Global opacity multiplier for wave strokes (0–1).',
        },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
        {
          name: 'containerClassName',
          type: 'string',
          description: 'Classes applied to the outer container alongside className.',
        },
      ],
    },
  ],
  features: [
    'Layered sine-wave strokes drift across a canvas backdrop via requestAnimationFrame.',
    'Blur is approximated with layered thick strokes reused from a single path instead of a per-frame ctx.filter blur, keeping the loop cheap.',
    'The animation loop pauses automatically while offscreen (IntersectionObserver) and resumes on re-entry.',
    'Under prefers-reduced-motion, a single static frame is drawn and the loop never starts.',
    'A ResizeObserver keeps the canvas sized to its container and repaints the current frame on resize.',
    'Neutral-first default palette with a faint ember accent; fully overridable via colors.',
  ],
  aria: [
    { attribute: 'aria-hidden="true"', element: 'canvas', purpose: 'Marks the decorative wave layer as non-content for assistive tech.' },
    { attribute: 'pointer-events-none', element: 'canvas', purpose: 'Keeps clicks and focus passing through to interactive children.' },
  ],
  a11yNotes: [
    'The canvas is purely decorative and never intercepts clicks or focus.',
    'Children render in a relative z-10 wrapper above the canvas and remain fully interactive.',
    'Respects prefers-reduced-motion by drawing one static frame with no animation loop.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/wavy-background/wavy-background.tsx',
    'packages/ui/src/components/animated/wavy-background/index.ts',
  ],
};
