import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@varient/ui';

export function Example() {
  const [code, setCode] = useState('');

  return (
    <InputOTP length={6} value={code} onChange={setCode}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}`,
  props: [
    {
      title: 'InputOTP',
      rows: [
        { name: 'length', type: 'number', description: 'Total number of OTP slots.' },
        { name: 'value', type: 'string', description: 'Controlled OTP value.' },
        {
          name: 'onChange',
          type: '(value: string) => void',
          description: 'Called on every character change.',
        },
        {
          name: 'onComplete',
          type: '(value: string) => void',
          description: 'Fired once all slots are filled.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables input and dims the container.',
        },
        {
          name: 'isInvalid',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Applies destructive border styling to slots.',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          defaultValue: "'md'",
          description:
            'Slot box + text size for every InputOTPSlot inside this root (sm: size-8, md: size-10, lg: size-12).',
        },
      ],
    },
    {
      title: 'InputOTPSlot',
      rows: [
        {
          name: 'index',
          type: 'number',
          description: 'Zero-based slot index — must match a position within length.',
        },
      ],
    },
    {
      title: 'InputOTPGroup',
      rows: [
        {
          name: '...props',
          type: 'HTMLAttributes<"div">',
          description: 'Groups adjacent slots — use between separators for visual chunking.',
        },
      ],
    },
    {
      title: 'InputOTPSeparator',
      rows: [
        {
          name: '...props',
          type: 'HTMLAttributes<"div">',
          description: 'Visual divider between slot groups; renders a dot by default.',
        },
      ],
    },
    {
      title: 'InputOTPLabel',
      rows: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'Label text rendered above/near the OTP group.',
        },
      ],
    },
  ],
  features: [
    'Single hidden input drives all visible slots — full mobile OTP autofill and iOS/Android paste support.',
    'Three sizes (sm/md/lg) via Record size maps, applied to slot box, text, and fake caret height.',
    'Active slot gets a brand-tinted focus ring; isInvalid sets aria-invalid and a destructive border on every slot.',
    'InputOTPGroup + InputOTPSeparator compose slots into visually chunked groups (e.g. 3-3 for a 6-digit code).',
    'Reduced-motion users get a static caret via motion-reduce:animate-none.',
  ],
  keyboard: [
    { keys: 'Digits/characters', description: 'Typed directly into the underlying hidden input, advancing the active slot.' },
    { keys: 'Backspace', description: 'Deletes the current character and moves focus back a slot.' },
    { keys: 'Arrow Left / Right', description: 'Moves the active slot without deleting input.' },
    { keys: 'Cmd/Ctrl+V', description: 'Pastes a full code, distributing characters across slots.' },
  ],
  aria: [
    {
      attribute: 'autocomplete="one-time-code"',
      element: 'hidden <input>',
      purpose: 'Enables SMS/keychain OTP autofill on iOS and Android.',
    },
    {
      attribute: 'aria-invalid',
      element: 'InputOTPSlot',
      purpose: 'Set when isInvalid is true, signalling the error state to assistive tech.',
    },
    {
      attribute: 'role="separator" aria-hidden',
      element: 'InputOTPSeparator',
      purpose: 'Marks the divider as purely decorative and excludes it from the accessibility tree.',
    },
  ],
  a11yNotes: [
    'Built on the `input-otp` library — a single hidden input drives all slots for screen readers and mobile OTP autofill.',
    'Active slot shows a brand focus ring; invalid state sets aria-invalid on slots.',
    'Caret blink uses motion-reduce:animate-none for reduced-motion users.',
  ],
  dependencies: ['input-otp'],
  sourceFiles: [
    'packages/ui/src/components/foundation/input-otp/input-otp.tsx',
    'packages/ui/src/components/foundation/input-otp/index.ts',
  ],
};
