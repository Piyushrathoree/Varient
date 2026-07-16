import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Progress } from '@varient/ui'\n\n<Progress value={65} max={100} showValueLabel aria-label="Upload progress" />`,
  props: [
    {
      title: 'Progress',
      rows: [
        { name: 'value', type: 'number', defaultValue: '0', description: 'Current progress value.' },
        { name: 'max', type: 'number', defaultValue: '100', description: 'Maximum value.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Track height preset.' },
        { name: 'isIndeterminate', type: 'boolean', defaultValue: 'false', description: 'Shows an animated sweep instead of a fixed fill.' },
        { name: 'showValueLabel', type: 'boolean', defaultValue: 'false', description: 'Renders the numeric percentage beside the track.' },
        { name: 'aria-label', type: 'string', description: 'Required accessible name when no visible label is present.' },
      ],
    },
    {
      title: 'ProgressLabel',
      rows: [
        { name: 'value', type: 'number', description: 'Value used to compute the displayed percentage.' },
        { name: 'max', type: 'number', defaultValue: '100', description: 'Maximum value used for the percentage calculation.' },
      ],
    },
  ],
  features: [
    'Built on @radix-ui/react-progress for correct progressbar semantics.',
    'Three track sizes (sm/md/lg) via a size prop.',
    'Optional numeric value label rendered beside the track, or standalone via ProgressLabel.',
    'Indeterminate mode sweeps a moving segment using a spring-free eased animation.',
    'Sweep animation collapses to a static 50% bar under prefers-reduced-motion.',
  ],
  aria: [
    { attribute: 'role="progressbar"', element: 'Progress root', purpose: 'Identifies the element as a progress indicator (via Radix Progress.Root).' },
    { attribute: 'aria-valuenow / aria-valuemin / aria-valuemax', element: 'Progress root', purpose: 'Exposes the current value range when determinate; omitted when isIndeterminate.' },
    { attribute: 'aria-hidden', element: 'value label span', purpose: 'Hides the ellipsis placeholder from assistive tech while indeterminate.' },
  ],
  a11yNotes: [
    'Always pass an aria-label (or aria-labelledby) — Progress has no visible text label of its own.',
    'Indeterminate mode intentionally omits aria-valuenow so screen readers announce a busy state rather than a stale percentage.',
    'The sweep animation is disabled under prefers-reduced-motion, replaced with a static centered bar.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/progress/progress.tsx',
    'packages/ui/src/components/foundation/progress/index.ts',
  ],
};
