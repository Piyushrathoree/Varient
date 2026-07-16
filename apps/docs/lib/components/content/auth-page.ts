import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { AuthPage, type AuthPageFormData } from '@/components/sections/auth-page';

export function LoginPage() {
  const handleSubmit = async (data: AuthPageFormData) => {
    if (data.variant === 'login') {
      // Sign in with data.email, data.password, data.rememberMe
    }
  };

  return (
    <AuthPage
      headline="Welcome back"
      description="Sign in to your account to continue."
      variant="login"
      onSubmit={handleSubmit}
      onSocialAuth={(provider) => console.log(provider)}
    />
  );
}`,
  props: [
    {
      title: 'AuthPage',
      rows: [
        { name: 'variant', type: "'login' | 'signup'", defaultValue: "'login'", description: 'Form mode — controls visible fields and submit payload shape.' },
        { name: 'headline', type: 'ReactNode', description: 'Primary heading above the form. Defaults per variant.' },
        { name: 'description', type: 'ReactNode', description: 'Supporting copy below the headline.' },
        { name: 'onSubmit', type: '(data: AuthPageFormData) => void | Promise<void>', description: 'Called with validated form data. Payload is a discriminated union on `variant`.' },
        { name: 'onSocialAuth', type: "(provider: 'github' | 'google' | string) => void", description: 'Optional callback when a social auth button is clicked. Receives the built-in id or a custom `socialProviders` id.' },
        { name: 'socialProviders', type: '{ id: string; label: string; icon: ReactNode }[]', description: 'Extra social providers rendered after the built-in GitHub/Google buttons — bring your own icon.' },
        { name: 'forgotPasswordHref', type: 'string', defaultValue: "'#forgot-password'", description: 'Href for the forgot-password link (login only).' },
        { name: 'forgotPasswordLabel', type: 'string', defaultValue: "'Forgot password?'", description: 'Label for the forgot-password link.' },
        { name: 'aside', type: 'ReactNode', description: 'Right panel content on large screens. Defaults to a dot-grid testimonial quote. When provided, the aside is no longer `aria-hidden`.' },
        { name: 'submitLabel', type: 'ReactNode', description: 'Submit button label. Defaults to "Sign in" / "Create account" per variant.' },
        { name: 'loadingLabel', type: 'ReactNode', description: 'Submit button label shown while the async `onSubmit` is pending.' },
        { name: 'successLabel', type: 'ReactNode', description: "Submit button label shown briefly (~1.6s) after `onSubmit` resolves successfully." },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section wrapper.' },
      ],
    },
    {
      title: 'AuthPageFormData',
      rows: [
        { name: 'variant', type: "'login' | 'signup'", description: 'Always present.' },
        { name: 'email', type: 'string', description: 'Always present.' },
        { name: 'password', type: 'string', description: 'Always present — minimum 8 characters.' },
        { name: 'rememberMe', type: 'boolean', description: 'Login only.' },
        { name: 'name', type: 'string', description: 'Signup only.' },
        { name: 'agreedToTerms', type: 'boolean', description: 'Signup only.' },
      ],
    },
  ],
  features: [
    'Split layout: form panel plus an aside that hides below `lg`.',
    'Built-in login/signup validation (email format, 8-char minimum password, required name/terms) with per-field error text.',
    'GitHub and Google social buttons out of the box, extendable with any number of custom providers via `socialProviders` (bring your own icon).',
    'Submit button label swaps for `loadingLabel` while pending and `successLabel` briefly after `onSubmit` resolves.',
    'Panel entrance animation gated behind `prefers-reduced-motion`; renders instantly with no motion when reduced.',
    'The default aside (dot-grid testimonial) is `aria-hidden`; a custom `aside` you pass in is never hidden from assistive tech.',
  ],
  keyboard: [
    { keys: 'Tab / Shift + Tab', description: 'Moves focus through fields, links, checkboxes, and buttons.' },
    { keys: 'Space', description: 'Toggles the focused checkbox.' },
    { keys: 'Enter', description: 'Submits the form from the primary button.' },
  ],
  aria: [
    { attribute: 'aria-labelledby', element: 'section', purpose: 'Associates the section with the visible h1 headline.' },
    { attribute: 'aria-hidden (conditional)', element: 'aside', purpose: 'Set only when rendering the default decorative testimonial panel; omitted when a custom `aside` is supplied.' },
    { attribute: 'role="alert"', element: 'terms checkbox error text', purpose: 'Announces the signup terms-agreement validation error.' },
  ],
  a11yNotes: [
    'Every field uses Foundation `Input`/`Checkbox` label association, so errors and labels are programmatically tied to their control.',
    'The aside is only marked `aria-hidden` when it holds the default decorative testimonial — content you pass via `aside` stays in the accessibility tree.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/auth-page/auth-page.tsx',
    'packages/ui/src/components/sections/auth-page/index.ts',
  ],
};
