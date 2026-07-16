import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Textarea } from '@varient/ui'

<Textarea
  label="Bio"
  placeholder="Tell us about yourself"
  helperText="Keep it under 280 characters."
  rows={4}
  isRequired
/>`,
  props: [
    {
      title: 'Textarea',
      rows: [
        { name: 'label', type: 'string', description: 'Label text rendered above the textarea.' },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text inside the textarea.',
        },
        {
          name: 'helperText',
          type: 'string',
          description: 'Helper text shown below the textarea when there is no error.',
        },
        {
          name: 'errorText',
          type: 'string',
          description: 'Error message — triggers error styling and takes over from helperText.',
        },
        {
          name: 'variant',
          type: 'TextareaVariant',
          defaultValue: "'default'",
          description:
            "'default' is a bordered surface, 'filled' is a soft bg-muted surface with no visible border until focus, 'frame' is a gradient-rimmed border with a brand-tinted focus glow.",
        },
        {
          name: 'resize',
          type: "'none' | 'vertical' | 'both'",
          defaultValue: "'vertical'",
          description: 'Controls the native resize handle — none, vertical only, or both axes.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables the textarea.',
        },
        {
          name: 'isReadOnly',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Makes the textarea read-only.',
        },
        {
          name: 'isRequired',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Marks the field as required.',
        },
        {
          name: 'size',
          type: 'TextareaSize',
          defaultValue: "'md'",
          description: 'Min-height and padding preset — sm, md, or lg.',
        },
        {
          name: 'rows',
          type: 'number',
          defaultValue: '4',
          description: 'Native rows attribute for initial height.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root wrapper.',
        },
      ],
    },
  ],
  features: [
    'Three variants — default (bordered, accent border + soft glow on focus), filled (bg-muted fill, no border until focus), and frame (gradient-rimmed border pairing with Input/Button variant="frame").',
    'Three size presets (sm/md/lg) driving min-height, padding, and text size together.',
    'Native resize control (none/vertical/both) mapped to Tailwind resize utilities.',
    'errorText fully overrides the container styling with a destructive border + glow, independent of variant, and stays visible regardless of focus.',
    'label + helperText/errorText wiring with aria-describedby and aria-invalid; error text is announced via role="alert".',
    'forwardRef exposes the underlying <textarea> DOM node; all transitions are gated off under prefers-reduced-motion.',
  ],
  aria: [
    {
      attribute: 'htmlFor / id',
      element: '<label> + <textarea>',
      purpose: 'Associates the visible label with the textarea for screen readers and click-to-focus.',
    },
    {
      attribute: 'aria-invalid',
      element: '<textarea>',
      purpose: 'Set when errorText is present so assistive tech announces the invalid state.',
    },
    {
      attribute: 'aria-describedby',
      element: '<textarea>',
      purpose: 'Points to the helper or error text rendered below the field.',
    },
    {
      attribute: 'role="alert"',
      element: 'error <p>',
      purpose: 'Announces the error message when it appears.',
    },
  ],
  a11yNotes: [
    'Keyboard users tab to the field and type normally; disabled fields are skipped in the tab order.',
    'Focus is indicated by the container’s accent border and soft glow (same pattern as Input), not by the native outline alone.',
    'All motion (border/shadow transitions) respects prefers-reduced-motion via motion-reduce:transition-none.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/textarea/textarea.tsx',
    'packages/ui/src/components/foundation/textarea/index.ts',
  ],
};
