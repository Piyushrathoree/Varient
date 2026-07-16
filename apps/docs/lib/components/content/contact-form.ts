import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { ContactForm, type ContactFormData } from '@/components/sections/contact-form';

export function ContactPage() {
  const handleSubmit = async (data: ContactFormData) => {
    // Your API call here
    console.log(data);
  };

  return (
    <ContactForm
      title="Contact sales"
      description="Tell us about your team and what you're building."
      showCompanyField
      showSubjectField
      submitLabel="Talk to sales"
      successTitle="We're on it"
      successMessage="A member of our sales team will reach out within one business day."
      onSubmit={handleSubmit}
    />
  );
}`,
  props: [
    {
      title: 'ContactForm',
      rows: [
        { name: 'title', type: 'string', description: 'Centered headline above the form.' },
        { name: 'description', type: 'string', description: 'Supporting copy below the title.' },
        {
          name: 'onSubmit',
          type: '(data: ContactFormData) => void | Promise<void>',
          description:
            'Called with validated form data on submit. If omitted, a ~800ms simulated delay runs before success.',
        },
        {
          name: 'showCompanyField',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Renders an optional company input between the name/email row and the message field.',
        },
        {
          name: 'showSubjectField',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Renders an optional subject input between the company field and the message field.',
        },
        {
          name: 'submitLabel',
          type: 'string',
          defaultValue: "'Send message'",
          description: 'Label rendered on the submit button.',
        },
        {
          name: 'successTitle',
          type: 'string',
          description: 'Optional heading shown above the success message once the form has been submitted.',
        },
        {
          name: 'successMessage',
          type: 'string',
          defaultValue: "\"Thanks — we'll get back to you within two business days.\"",
          description: 'Body copy shown in the success panel once the form has been submitted.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description:
            'Extra form fields rendered after the privacy checkbox and before the submit button — an escape hatch for fields the component does not model natively (file upload, phone number, etc). Not included in ContactFormData.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root section wrapper.',
        },
      ],
    },
  ],
  features: [
    'Client-side validation for name, email, and message (10-char minimum) plus a required privacy checkbox, with per-field errorText and a shared aria-live status region.',
    'Optional company and subject inputs toggled independently via showCompanyField and showSubjectField — both trimmed and only included in ContactFormData when filled.',
    'Configurable submitLabel, successTitle, and successMessage let the same component serve sales, support, and feedback use cases without forking.',
    'children escape hatch renders extra custom fields after the privacy checkbox and before the submit button for needs the component does not model natively.',
    'Animated swap between the form and a centered success panel via AnimatePresence, with a simulated 800ms submit delay when no onSubmit is provided.',
    'Reduced-motion aware: panel and success transitions drop to instant opacity swaps under prefers-reduced-motion.',
  ],
  keyboard: [
    { keys: 'Tab / Shift+Tab', description: 'Moves focus through fields, checkbox, and submit button.' },
    { keys: 'Space', description: 'Toggles the privacy checkbox when focused.' },
    { keys: 'Enter', description: 'Submits the form when focus is on the submit button.' },
  ],
  aria: [
    { attribute: 'aria-labelledby', element: 'section (root)', purpose: 'Associates the section with its heading.' },
    { attribute: 'aria-live="polite" aria-atomic="true"', element: 'status wrapper div', purpose: 'Announces loading and success state changes.' },
    { attribute: 'role="status"', element: 'success panel', purpose: 'Marks the success confirmation as a live status message.' },
    { attribute: 'role="alert"', element: 'field error paragraphs', purpose: 'Announces validation errors immediately.' },
  ],
  a11yNotes: [
    'Every text field uses the Foundation label association (htmlFor / id).',
    'The privacy checkbox error renders as a separate role="alert" message below the control.',
    'All transitions are gated behind prefers-reduced-motion.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/contact-form/contact-form.tsx',
    'packages/ui/src/components/sections/contact-form/index.ts',
  ],
};
