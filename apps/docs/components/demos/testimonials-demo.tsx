'use client';

import { Testimonials, type Testimonial } from '@varient/ui';

const compactTestimonials: Testimonial[] = [
  {
    quote: 'We shipped our landing page in a day instead of a week.',
    name: 'Maya Chen',
    role: 'Product lead',
    avatarSrc: 'https://i.pravatar.cc/150?img=1',
  },
  {
    quote: 'Copy-paste DX is real — I own the source and ship fixes same day.',
    name: 'James Okonkwo',
    role: 'Frontend engineer',
    avatarSrc: 'https://i.pravatar.cc/150?img=3',
  },
];

export function TestimonialsDemo() {
  return (
    <div className="w-full bg-background">
      <Testimonials />
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
