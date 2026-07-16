import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { NotFoundPage } from '@/components/sections/not-found-page';

export function NotFound() {
  return (
    <NotFoundPage
      code="404"
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      homeHref="/"
      homeLabel="Back to home"
      secondaryAction={{ label: 'Browse components', href: '/docs' }}
      popularLinks={[
        { label: 'Docs', href: '/docs' },
        { label: 'Status', href: '/status' },
        { label: 'Support', href: '/support' },
      ]}
    />
  );
}`,
  props: [
    {
      title: 'NotFoundPage',
      rows: [
        {
          name: 'code',
          type: 'string',
          defaultValue: "'404'",
          description: 'Large display code above the title. Fully numeric codes get a brand-accented last digit; non-numeric codes (e.g. "Oops") render as a single block instead of arbitrarily recoloring the last character.',
        },
        {
          name: 'title',
          type: 'string',
          defaultValue: "'Page not found'",
          description: 'Primary heading below the code.',
        },
        {
          name: 'description',
          type: 'string',
          defaultValue: "'The page you're looking for doesn't exist or has been moved.'",
          description: 'Supporting copy under the title.',
        },
        {
          name: 'homeHref',
          type: 'string',
          defaultValue: "'/'",
          description: 'Destination for the primary CTA link.',
        },
        {
          name: 'homeLabel',
          type: 'string',
          defaultValue: "'Back to home'",
          description: 'Label for the primary CTA button.',
        },
        {
          name: 'secondaryAction',
          type: '{ label: string; href: string }',
          description: 'Optional ghost button rendered beside the primary CTA.',
        },
        {
          name: 'popularLinks',
          type: '{ label: string; href: string }[]',
          description: 'Optional second self-serve path — a short labeled row of links rendered below the actions, e.g. for docs, status, or support pages.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root section.',
        },
      ],
    },
  ],
  features: [
    'Large status-code numeral with a quiet, static DotPattern behind it — the section had zero visual identity before.',
    'Numeric codes get a brand-accented last digit; non-numeric codes (e.g. "Oops", "N/A") render as a single block instead of forcing a coloring assumption onto arbitrary text.',
    'Primary CTA plus an optional secondary ghost action, both real anchor elements via Button asChild.',
    'Optional popularLinks list gives a second self-serve recovery path beyond the single home CTA.',
    'Single fade-and-rise entrance on the content column, gated behind prefers-reduced-motion.',
  ],
  keyboard: [
    { keys: 'Tab / Shift + Tab', description: 'Moves focus between the primary, secondary, and popular-link actions.' },
    { keys: 'Enter', description: 'Activates the focused link.' },
  ],
  aria: [
    { attribute: 'aria-labelledby="not-found-title"', element: '<section> root', purpose: 'Associates the section with its <h1> title for assistive tech.' },
    { attribute: 'aria-hidden="true"', element: 'DotPattern background', purpose: 'Excludes the decorative dot texture behind the code from the accessibility tree.' },
    { attribute: 'aria-label="Popular links"', element: '<nav> around popularLinks', purpose: 'Names the optional recovery-links landmark when popularLinks is provided.' },
  ],
  a11yNotes: [
    'The status code is visible text, not an image — screen readers announce it before the title.',
    'Focus rings on primary/secondary actions follow the shared Button focus-visible styles; popularLinks use a matching focus-visible ring.',
    'The DotPattern background is static by default (no perpetual loop), so there is nothing to pause offscreen; it is purely decorative and pointer-events-none.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/not-found-page/not-found-page.tsx',
    'packages/ui/src/components/sections/not-found-page/index.ts',
  ],
};
