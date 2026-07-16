import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/foundation/badge';

export function Example() {
  return (
    <Badge variant="primary" icon={<Sparkles className="size-3" strokeWidth={1.75} />}>
      New
    </Badge>
  );
}`,
  props: [
    {
      title: 'Badge',
      rows: [
        {
          name: 'variant',
          type: 'BadgeVariant',
          defaultValue: "'default'",
          description: 'Semantic color — default, primary, secondary, success, warning, danger, or outline.',
        },
        {
          name: 'appearance',
          type: 'BadgeAppearance',
          defaultValue: "'soft'",
          description:
            'Visual style applied to the variant\'s color — soft, solid, outline, or dot. variant="outline" keeps resolving to the outline appearance when appearance is omitted, for backward compatibility.',
        },
        {
          name: 'size',
          type: 'BadgeSize',
          defaultValue: "'md'",
          description: 'Padding and text size — sm, md, or lg.',
        },
        {
          name: 'shape',
          type: 'BadgeShape',
          defaultValue: "'pill'",
          description: 'Corner treatment — pill (rounded-full) or square (rounded-md).',
        },
        {
          name: 'icon',
          type: 'ReactNode',
          description: 'Optional leading icon, rendered before the label and after the status dot.',
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
    'Separates semantic color (`variant`) from visual style (`appearance`) — any of the six colors composes with soft, solid, outline, or dot.',
    '`variant="outline"` keeps resolving to the outline appearance with no color of its own, preserving the original API.',
    '`dot` appearance renders a small animated status dot ahead of the label, springing in on mount via `SPRING_SNAPPY`.',
    'Three sizes (`sm`/`md`/`lg`) and two shapes (`pill`/`square`) for tag-like vs. compact chip contexts.',
    'Accepts an optional leading `icon`, and extends `HTMLAttributes<HTMLSpanElement>` so native span props (`onClick`, `aria-*`) pass through.',
    'Solid appearance auto-flips ink color per token — `text-background` for success/warning (which brighten in dark mode) vs. `text-white` for brand/danger (fixed hue).',
  ],
  aria: [
    {
      attribute: 'aria-hidden',
      element: 'dot indicator (motion.span)',
      purpose: 'Hides the decorative status dot from screen readers so only the label text is announced.',
    },
  ],
  a11yNotes: [
    'Badge renders a plain `<span>` with no implicit ARIA role, since it is a label rather than a control.',
    'Color alone never conveys status — every appearance pairs its color with visible text.',
    'Callers needing live-region announcements can pass `role="status"` or `aria-label` through the pass-through span props.',
    'The `dot` mount animation respects `prefers-reduced-motion`, rendering with no transition when set.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/badge/badge.tsx',
    'packages/ui/src/components/foundation/badge/index.ts',
  ],
};
