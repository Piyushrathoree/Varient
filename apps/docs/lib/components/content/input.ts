import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Input } from '@varient/ui'

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email."
  isRequired
/>`,
  props: [
    {
      title: 'Input',
      rows: [
        { name: 'label', type: 'string', description: 'Label text rendered above the input.' },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text inside the input.',
        },
        {
          name: 'helperText',
          type: 'string',
          description: 'Helper text shown below the input.',
        },
        {
          name: 'errorText',
          type: 'string',
          description:
            'Error message — triggers error styling and takes over from helperText.',
        },
        {
          name: 'variant',
          type: 'InputVariant',
          defaultValue: "'default'",
          description:
            "'default' is a bordered surface, 'filled' is a soft bg-muted surface with no visible border until focus, 'frame' pairs with Button variant=\"frame\" — a gradient-rimmed input that glows on focus.",
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables the input.',
        },
        {
          name: 'isReadOnly',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Makes the input read-only.',
        },
        {
          name: 'isRequired',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Marks the field as required.',
        },
        {
          name: 'leftAddon',
          type: 'ReactNode',
          description: 'Icon or content inside the left edge.',
        },
        {
          name: 'rightAddon',
          type: 'ReactNode',
          description: 'Icon or content inside the right edge.',
        },
        {
          name: 'size',
          type: 'InputSize',
          defaultValue: "'md'",
          description: 'Height and padding preset — sm, md, or lg.',
        },
        {
          name: 'type',
          type: 'string',
          defaultValue: "'text'",
          description: 'Native input type attribute.',
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
    'Three variants: default (bordered), filled (soft bg-muted, border appears on focus), frame (gradient-rimmed border pairing with Button variant="frame").',
    'One clear focus signal per variant — border shifts to the accent color backed by a soft low-opacity glow, never a hard double ring.',
    'Error state overrides variant styling entirely with a destructive border + matching glow, always visible (not just on focus), and an associated role="alert" message.',
    'Optional leftAddon / rightAddon slots for icons or affix content, sized to match the input size preset.',
    'Label, helper text, and error text are wired to the input via useId-generated aria-describedby and htmlFor for accessible association.',
    'Three size presets (sm, md, lg) controlling height, padding, and text size.',
  ],
  aria: [
    {
      attribute: 'aria-invalid',
      element: 'input',
      purpose: 'Set to true when errorText is present, signaling the invalid state to assistive tech.',
    },
    {
      attribute: 'aria-describedby',
      element: 'input',
      purpose: 'References the error message id and/or helper text id so screen readers announce them.',
    },
    {
      attribute: 'role="alert"',
      element: 'error message <p>',
      purpose: 'Announces the error text assertively when it appears.',
    },
    {
      attribute: 'htmlFor / id',
      element: 'label + input',
      purpose: 'Associates the visible label with the input for click-to-focus and screen reader naming.',
    },
  ],
  a11yNotes: [
    'Error text takes over from helperText both visually and in aria-describedby — only one is ever announced at a time.',
    'Disabled state uses the native disabled attribute plus reduced opacity, so it is excluded from the tab order automatically.',
    'The required asterisk is aria-hidden; isRequired sets the native required attribute, which is the accessible signal.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/input/input.tsx',
    'packages/ui/src/components/foundation/input/index.ts',
  ],
};
