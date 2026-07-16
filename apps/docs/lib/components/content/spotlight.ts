import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Spotlight } from '@/components/animated/spotlight';

export function Example() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-foreground p-8">
      <Spotlight />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-background">Hover the card</h3>
      </div>
    </div>
  );
}`,
  props: [
    {
      title: 'Spotlight',
      rows: [
        { name: 'size', type: 'number', defaultValue: "350 (220 for `variant=\"border\"`)", description: 'Radius of the radial glow in pixels.' },
        { name: 'color', type: 'string', defaultValue: 'foreground at 14% alpha', description: 'Spotlight tint via CSS color — a neutral `color-mix(in oklab, var(--color-foreground) 14%, transparent)` by default, not a brand tint.' },
        { name: 'fill', type: 'string', description: 'Optional override for the gradient fill color; takes precedence over `color`.' },
        { name: 'variant', type: "'default' | 'border'", defaultValue: "'default'", description: '`default` is a free-floating glow that follows the pointer anywhere on the surface. `border` clips the same glow to a thin ring that hugs and travels the container edge, projecting the pointer onto the nearest border point.' },
        { name: 'borderWidth', type: 'number', defaultValue: '2', description: 'Ring thickness in pixels, only used when `variant="border"`.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Cursor-following radial glow driven by `useMotionValue` + `useSpring` (`SPRING_SNAPPY`), fading in on pointer enter and out on pointer leave.',
    '`variant="border"` projects the pointer position onto the nearest point on the container perimeter, so the glow hugs and travels the edge instead of floating freely; the visible ring is carved out with a `mask-composite: exclude` padding-box trick sized by `borderWidth`.',
    'Neutral-first default tint (`foreground` at 14% alpha) — pass `color` or `fill` for a brand-tinted glow instead.',
    'Under `prefers-reduced-motion`, pointer tracking and the hover fade are disabled entirely; a static, centered soft glow renders instead with no cursor follow.',
    'On coarse/non-hover pointers (touch, via `useFinePointer`), tracking listeners never attach and the same static soft-glow fallback is shown, avoiding dead `pointermove` listeners on devices that cannot hover.',
    'Fully decorative: `aria-hidden="true"` and `pointer-events-none`, so it never intercepts clicks, focus, or interferes with parent content stacked above it via `relative z-10`.',
  ],
  a11yNotes: [
    'The glow is purely decorative — `aria-hidden="true"` and `pointer-events-none` keep it out of the accessibility tree and out of the hit-testing path entirely.',
    'Parent content must be stacked with `relative z-10` above the `Spotlight`; the component itself renders no focusable or readable content.',
    'Reduced-motion and coarse-pointer users both get the same static fallback glow rather than a broken or jittery tracking experience.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/spotlight/spotlight.tsx',
    'packages/ui/src/components/animated/spotlight/index.ts',
  ],
};
