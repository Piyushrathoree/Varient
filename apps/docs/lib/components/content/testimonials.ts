import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Testimonials } from '@/components/sections/testimonials';

export function LandingPage() {
  return (
    <Testimonials
      eyebrow="Testimonials"
      title="Teams ship faster with Varient"
      description="Real feedback from builders who copied components into production."
      testimonials={[
        {
          quote: 'We shipped our landing page in a day instead of a week.',
          name: 'Maya Chen',
          role: 'Product lead, Northline',
        },
      ]}
    />
  );
}`,
  props: [
    {
      rows: [
        {
          name: 'eyebrow',
          type: 'string',
          defaultValue: "'Testimonials'",
          description: 'Small brand-colored label above the section title.',
        },
        {
          name: 'title',
          type: 'string',
          defaultValue: "'Teams ship faster with Varient'",
          description: 'Section headline.',
        },
        {
          name: 'description',
          type: 'string',
          description: 'One-line supporting copy below the title.',
        },
        {
          name: 'testimonials',
          type: 'Testimonial[]',
          defaultValue: 'defaultTestimonials',
          description: 'Quote cards — each needs quote and name; role and avatarSrc are optional.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root section.',
        },
      ],
    },
    {
      title: 'Testimonial',
      rows: [
        { name: 'quote', type: 'string', description: 'Customer quote body copy.' },
        { name: 'name', type: 'string', description: 'Person name shown in the card footer.' },
        { name: 'role', type: 'string', description: 'Optional role or company line below the name.' },
        {
          name: 'avatarSrc',
          type: 'string',
          description: 'Optional image URL for the footer avatar. When omitted, the avatar shows initials derived from name.',
        },
      ],
    },
  ],
  features: [
    'Masonry-style column layout (columns-1/2/3 by breakpoint) so cards of varying quote length pack tightly without gaps.',
    'Quotes are clamped to 4 lines with a soft mask-image fade at the clamp edge, signaling truncation instead of an abrupt cutoff.',
    'Avatars default to initials fallbacks (no external image dependency) unless an explicit avatarSrc is provided.',
    'Header and each card scroll-reveal once via whileInView with a per-card stagger delay, sharing the shared EASE_OUT easing curve.',
    'Reduced-motion users get all content immediately with no initial/whileInView transforms applied.',
  ],
  a11yNotes: [
    'Root is a semantic <section> with aria-labelledby pointing at the heading id.',
    'Each testimonial renders inside a <blockquote> with a <footer> for attribution, keeping quote and author machine-readable.',
    'Scroll-reveal animations are skipped entirely under prefers-reduced-motion — content appears immediately without stagger or fade.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/testimonials/testimonials.tsx',
    'packages/ui/src/components/sections/testimonials/index.ts',
  ],
};
