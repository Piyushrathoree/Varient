import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useState } from 'react';
import { PromptInput } from '@varient/ui'

export function Example() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PromptInput
      value={value}
      onValueChange={setValue}
      onSubmit={(text) => {
        setIsLoading(true);
        // send \`text\`, then setIsLoading(false) and setValue('') when done
      }}
      isLoading={isLoading}
      onStop={() => setIsLoading(false)}
      placeholder="Message..."
    />
  );
}`,
  props: [
    {
      title: 'PromptInput',
      rows: [
        {
          name: 'value',
          type: 'string',
          description: 'Controlled text value. Pair with onValueChange.',
        },
        {
          name: 'defaultValue',
          type: 'string',
          defaultValue: "''",
          description: 'Initial text value for uncontrolled usage.',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Called whenever the text changes (both controlled and uncontrolled usage).',
        },
        {
          name: 'onSubmit',
          type: '(value: string) => void',
          description:
            'Called with the trimmed value on Enter (no Shift) or a submit-button click. Required.',
        },
        {
          name: 'isLoading',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Busy state — swaps the submit button to a spinner, or a stop button when onStop is set.',
        },
        {
          name: 'onStop',
          type: '() => void',
          description:
            'When set, the submit button becomes a clickable stop glyph while isLoading. Omit to show a plain busy spinner instead.',
        },
        {
          name: 'placeholder',
          type: 'string',
          defaultValue: "'Message...'",
          description: 'Placeholder text inside the textarea.',
        },
        {
          name: 'maxRows',
          type: 'number',
          defaultValue: '6',
          description: 'Textarea grows until this many lines, then scrolls.',
        },
        {
          name: 'leftSlot',
          type: 'ReactNode',
          description: 'Content anchored to the bottom-left of the chassis, e.g. an attach button or file chips.',
        },
        {
          name: 'rightSlot',
          type: 'ReactNode',
          description: 'Content anchored to the bottom-right of the chassis, before the submit button, e.g. a model chip.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables the textarea and the submit button.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root chassis.',
        },
      ],
    },
  ],
  features: [
    'Auto-growing textarea — measures scrollHeight on every change, animates the height difference with a reduced-motion-gated spring, and clamps to maxRows (default 6) before scrolling internally.',
    'Submit button morphs idle (arrow) → spinner (loading) → stop glyph (loading + onStop) via AnimatePresence popLayout, mirroring ButtonCopy\'s three-state morph craft.',
    'Controlled (value/onValueChange) or uncontrolled (defaultValue) — uncontrolled usage clears itself after a successful submit; controlled usage leaves clearing to the caller.',
    'Enter submits the trimmed value; Shift+Enter inserts a newline. Submit is disabled when the trimmed value is empty, isDisabled is set, or a plain busy spinner (no onStop) is showing.',
    'leftSlot / rightSlot render arbitrary content anchored to the chassis footer — attach buttons, file chips, a model picker chip — without the component being opinionated about their contents.',
    'Chassis focus treatment matches Input\'s default variant exactly (accent border + soft color-mix glow on focus-within), so it reads as one family with the rest of the form components.',
  ],
  keyboard: [
    { keys: 'Enter', description: 'Submits the trimmed value (no-op when empty).' },
    { keys: 'Shift + Enter', description: 'Inserts a newline instead of submitting.' },
    { keys: 'Tab', description: 'Moves focus to/from the textarea and slot/submit controls in DOM order.' },
  ],
  aria: [
    {
      attribute: 'aria-label',
      element: '<textarea>',
      purpose: 'Falls back to "Prompt" when no aria-label or aria-labelledby is supplied.',
    },
    {
      attribute: 'aria-busy',
      element: '<textarea> and submit <button>',
      purpose: 'Set on both while isLoading is true.',
    },
    {
      attribute: 'aria-label',
      element: 'submit <button>',
      purpose: 'Updates per state — "Send message", "Generating response", or "Stop generating".',
    },
  ],
  a11yNotes: [
    'The textarea is a real, native <textarea> — full keyboard and IME support, works with browser spellcheck/autofill.',
    'Focus is indicated on the chassis itself (accent border + soft glow, same as Input) rather than the textarea alone, so the whole control reads as one focused unit.',
    'All height-grow and submit-button-morph animations respect prefers-reduced-motion, dropping to an instant transition.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/prompt-input/prompt-input.tsx',
    'packages/ui/src/components/foundation/prompt-input/index.ts',
  ],
};
