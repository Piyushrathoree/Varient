'use client';

import { Testimonials, type Testimonial } from '@varient/ui';

const launchTestimonials: Testimonial[] = [
  {
    quote:
      'We replaced three internal UI kits with Varient sections. Our landing page shipped in a day instead of a week — and it still holds up under real traffic.',
    name: 'Maya Chen',
    role: 'Product lead, Northline',
  },
  {
    quote: 'Copy-paste DX is real — I own the Button and Card source, so design tweaks never wait on a package release.',
    name: 'James Okonkwo',
    role: 'Frontend engineer, Stackform',
  },
  {
    quote: 'Reduced-motion fallbacks are baked in. Our accessibility review passed without a single animation caveat.',
    name: 'Elena Vasquez',
    role: 'Design systems, Meridian',
  },
];

const compactTestimonials: Testimonial[] = [
  {
    quote: 'We shipped our landing page in a day instead of a week.',
    name: 'Maya Chen',
    role: 'Product lead',
  },
  {
    quote: 'Copy-paste DX is real — I own the source and ship fixes same day.',
    name: 'James Okonkwo',
    role: 'Frontend engineer',
  },
];

export function TestimonialsDemo() {
  return (
    <div className="w-full bg-background">
      <Testimonials
        eyebrow="Customer stories"
        title="Builders trust Varient in production"
        description="A sample of feedback from teams who copied sections straight into their launch."
        testimonials={launchTestimonials}
      />
    </div>
  );
}

export function TestimonialsPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <Testimonials
        className="px-4 py-6 md:py-6"
        description="What builders say about copy-paste components."
        eyebrow="Testimonials"
        testimonials={compactTestimonials}
        title="Teams ship faster"
      />
    </div>
  );
}
