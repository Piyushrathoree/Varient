import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { GradientText } from '@/components/animated/gradient-text';

export function Example() {
  return (
    <GradientText className="font-title text-4xl font-semibold tracking-tight">
      Ship faster
    </GradientText>
  );
}`,
  props: [
    {
      title: 'GradientText',
      rows: [
        {
          name: 'children',
          type: 'string',
          description: 'Required — headline text rendered with an animated gradient fill.',
        },
        {
          name: 'colors',
          type: 'string[]',
          defaultValue: 'foreground → muted-foreground → foreground',
          description:
            'Gradient stop colors — use semantic CSS variables. Defaults to a neutral sweep; pass brand tokens such as `var(--color-brand)` for an ember variant.',
        },
        {
          name: 'duration',
          type: 'number',
          defaultValue: '6',
          description: 'Sweep cycle duration in seconds.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn().',
        },
      ],
    },
  ],
  features: [
    'Sweeping gradient fill on headline text via animated `background-position`, driven by a per-instance injected `@keyframes` rule (no shared global animation name collisions).',
    'Neutral by default — the default `colors` stop set is `foreground → muted-foreground → foreground`, not a brand gradient; pass `colors` with brand tokens for an ember variant.',
    'Respects `prefers-reduced-motion`: renders a static fill at `0% 50%` background-position with the keyframes omitted entirely, no sweep.',
    'Pauses the sweep automatically while scrolled offscreen via `useViewportActive`, so mounted instances outside the viewport stop animating.',
    'Forwards a ref to the underlying `<span>` while still observing it internally for offscreen-pause detection.',
  ],
  a11yNotes: [
    'Decorative headline styling only — `children` is plain text in the DOM, read normally by assistive tech regardless of the gradient.',
    'Under `prefers-reduced-motion`, no background-position animation runs and the injected `<style>` keyframes are skipped entirely.',
    'Choose stop colors with sufficient contrast against the surrounding background in both light and dark themes; the component does not enforce contrast.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/gradient-text/gradient-text.tsx',
    'packages/ui/src/components/animated/gradient-text/index.ts',
  ],
};
