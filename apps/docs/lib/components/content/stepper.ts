import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useState } from 'react';
import { Stepper } from '@varient/ui';

const steps = [
  { title: 'Cart', content: 'Review items' },
  { title: 'Shipping', content: 'Delivery address' },
  { title: 'Payment', content: 'Card details' },
];

export function Example() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper activeStep={activeStep} onStepChange={setActiveStep}>
      {steps.map((step) => (
        <Stepper.Item key={step.title} title={step.title} />
      ))}
      <Stepper.Content>{steps[activeStep].content}</Stepper.Content>
    </Stepper>
  );
}`,
  props: [
    {
      title: 'Stepper',
      rows: [
        {
          name: 'activeStep',
          type: 'number',
          description: 'Required — zero-based index of the current step.',
        },
        {
          name: 'onStepChange',
          type: '(step: number) => void',
          description: "Called with a step's index when a reachable step is clicked.",
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          defaultValue: "'horizontal'",
          description: 'Layout of the step list.',
        },
        {
          name: 'isNavigable',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'Unlocks clicking steps ahead of activeStep. Completed steps are always clickable regardless of this flag — it only controls jumping forward.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the outer wrapper.',
        },
      ],
    },
    {
      title: 'Stepper.Item',
      rows: [
        { name: 'title', type: 'ReactNode', description: "Required — the step's label." },
        {
          name: 'description',
          type: 'ReactNode',
          description: 'Optional secondary line under the title.',
        },
      ],
    },
    {
      title: 'Stepper.Content',
      rows: [
        {
          name: 'children',
          type: 'ReactNode',
          description:
            'The panel to show for the current activeStep — pick it yourself (e.g. index into your own panels array).',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the clipping wrapper.',
        },
      ],
    },
  ],
  features: [
    'Compound API (Stepper.Item, optional Stepper.Content) with auto-indexed items — no manual index prop, status derives from each item\'s position vs. activeStep.',
    'Dot states: upcoming (bordered, muted number) → active (ember ring + number) → complete (ember fill, number swaps for a checkmark that draws in via animated pathLength).',
    'Connector lines between dots fill with brand color (scaleX/scaleY from an origin edge) as each step completes, gated by prefers-reduced-motion.',
    'Status is never color-alone: active/complete titles also switch to a heavier font weight.',
    'Optional Stepper.Content is a generic AnimatePresence slide wrapper (mode="wait") that crossfades the active panel in the direction implied by whether activeStep moved forward or backward.',
    'Horizontal and vertical orientations share the same component and connector mechanics.',
  ],
  keyboard: [
    {
      keys: 'Tab / Shift+Tab',
      description:
        'Moves focus between reachable step buttons — disabled (unreachable) steps are skipped natively.',
    },
    { keys: 'Enter / Space', description: 'Activates the focused step button (native button semantics).' },
  ],
  aria: [
    {
      attribute: 'aria-current="step"',
      element: 'active Stepper.Item button',
      purpose: 'Identifies the current step for assistive tech.',
    },
    {
      attribute: 'aria-hidden',
      element: 'connector line',
      purpose: 'Hides the purely decorative connector between steps from assistive tech.',
    },
  ],
  a11yNotes: [
    'The step list renders as a real <ol>, giving assistive tech an implicit list role with count/position.',
    'Each step is a real <button>; steps ahead of activeStep are disabled unless isNavigable is set, so keyboard tabbing only ever lands on reachable steps.',
    'The checkmark path-draw, connector fill, and Stepper.Content slide all collapse to instant transitions under prefers-reduced-motion.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/stepper/stepper.tsx',
    'packages/ui/src/components/foundation/stepper/index.ts',
  ],
};
