import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Skeleton } from '@varient/ui'

export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-3" aria-busy="true" aria-label="Loading profile">
      <Skeleton shape="circle" className="size-10" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}`,
  props: [
    {
      title: 'Skeleton',
      rows: [
        {
          name: 'variant',
          type: "'shimmer' | 'pulse'",
          defaultValue: "'shimmer'",
          description: 'Animation style — moving highlight sweep or opacity pulse.',
        },
        {
          name: 'shape',
          type: "'rect' | 'circle'",
          defaultValue: "'rect'",
          description: 'Corner treatment — rounded-md rectangle or rounded-full circle (avatars).',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Tailwind classes for size and layout (e.g. h-4 w-full, size-10).',
        },
      ],
    },
  ],
  features: [
    'Two animation styles — shimmer (moving gradient highlight) and pulse (opacity fade).',
    'Rect and circle shapes for composing avatars, text lines, and media blocks.',
    'Size and layout fully controlled via className — compose freely into any card or list.',
    'Perpetual shimmer/pulse loop pauses automatically while scrolled offscreen.',
    'Reduced-motion users get a static bg-muted block instead of any animation.',
  ],
  aria: [
    { attribute: 'aria-hidden', element: 'Each <Skeleton />', purpose: 'Prevents empty placeholder nodes from cluttering the accessibility tree.' },
    { attribute: 'aria-busy="true"', element: 'Parent wrapper (consumer-authored)', purpose: 'Signals that content is not yet available.' },
    { attribute: 'aria-label="Loading …"', element: 'Parent wrapper (consumer-authored)', purpose: 'Gives context for what is loading.' },
  ],
  a11yNotes: [
    'Skeleton nodes are decorative only — wrap the loading region in a container with aria-busy and aria-label to communicate state to assistive tech.',
    'Under prefers-reduced-motion, both variants render as a static bg-muted block with no animation.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/skeleton/skeleton.tsx',
    'packages/ui/src/components/foundation/skeleton/index.ts',
  ],
};
