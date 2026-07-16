'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Card } from '../../foundation/card';
import { Avatar } from '../../foundation/avatar';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  avatarSrc?: string;
}

export interface TestimonialsProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
}

function QuoteGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.45l.966 1.8c-3.125 1.748-4.717 4.618-4.717 7.137 0 1.28.375 2.345 1.125 3.195zm9.75 0c-1.03-1.094-1.583-2.321-1.583-4.31 0-3.5 2.457-6.637 6.03-8.45l.966 1.8c-3.125 1.748-4.717 4.618-4.717 7.137 0 1.28.375 2.345 1.125 3.195z" />
    </svg>
  );
}

export const defaultTestimonials: Testimonial[] = [
  {
    quote:
      'We replaced three internal UI kits with Varient sections. Our landing page shipped in a day instead of a week.',
    name: 'Maya Chen',
    role: 'Product lead, Northline',
  },
  {
    quote:
      'Copy-paste DX is real — I own the Button and Card source, so design tweaks never wait on a package release.',
    name: 'James Okonkwo',
    role: 'Frontend engineer, Stackform',
  },
  {
    quote:
      'Reduced-motion fallbacks are baked in. Our accessibility review passed without a single animation caveat.',
    name: 'Elena Vasquez',
    role: 'Design systems, Meridian',
  },
  {
    quote:
      'The token system means dark mode just works. We changed one CSS file and every section repainted correctly.',
    name: 'Tom Bradley',
    role: 'CTO, Relay Labs',
  },
  {
    quote:
      'Foundation plus animated layers compose cleanly. We built a pricing page from sections without rewriting primitives.',
    name: 'Priya Nair',
    role: 'Founder, Craftboard',
  },
  {
    quote:
      'Radix-backed controls saved us from reinventing focus traps and keyboard nav on every dialog and menu.',
    name: 'Marcus Webb',
    role: 'Staff engineer, Openframe',
  },
];

function TestimonialCard({
  testimonial,
  index,
  shouldReduceMotion,
}: {
  testimonial: Testimonial;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: {
          duration: 0.3,
          ease: EASE_OUT,
          delay: index * 0.06,
        },
        viewport: { once: true, amount: 0.15 } as const,
      };

  return (
    <motion.div className="mb-4 break-inside-avoid" {...motionProps}>
      <Card className="p-6">
        <QuoteGlyph className="size-5 text-muted-foreground/30" />
        <div
          className="relative mt-3"
          style={{
            maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
          }}
        >
          <blockquote className="line-clamp-4 text-sm leading-relaxed text-foreground">
            {testimonial.quote}
          </blockquote>
        </div>
        <footer className="mt-4 flex items-center gap-3">
          <Avatar
            size="md"
            src={testimonial.avatarSrc}
            alt={testimonial.name}
            fallback={testimonial.name}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{testimonial.name}</p>
            {testimonial.role && (
              <p className="truncate text-xs text-muted-foreground">{testimonial.role}</p>
            )}
          </div>
        </footer>
      </Card>
    </motion.div>
  );
}

export const Testimonials = forwardRef<HTMLElement, TestimonialsProps>(
  (
    {
      className,
      eyebrow = 'Testimonials',
      title = 'Teams ship faster with Varient',
      description = 'Real feedback from builders who copied components into production and kept moving.',
      testimonials = defaultTestimonials,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

    const headerMotion = shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.3, ease: EASE_OUT },
          viewport: { once: true, amount: 0.4 } as const,
        };

    return (
      <section
        ref={ref}
        className={cn('w-full px-6 py-16 md:px-8 md:py-24', className)}
        aria-labelledby="testimonials-heading"
        {...props}
      >
        <motion.header className="max-w-2xl" {...headerMotion}>
          {eyebrow && (
            <p className="text-sm font-medium text-brand">{eyebrow}</p>
          )}
          <h2
            id="testimonials-heading"
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm text-muted-foreground md:text-base">{description}</p>
          )}
        </motion.header>

        <div className="mt-10 columns-1 gap-4 md:columns-2 lg:columns-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
              index={index}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          ))}
        </div>
      </section>
    );
  },
);

Testimonials.displayName = 'Testimonials';
