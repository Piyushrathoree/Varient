'use client';

import type { ComponentProps } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import Script from 'next/script';
import { cn } from '@varient/ui';
import Divider from '@/components/marketing/divider';

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question: 'Is Varient really free?',
    answer:
      'Yes. Apache 2.0 licensed, no paid tier, no account required. Browse the docs, copy what you need, ship it.',
  },
  {
    question: 'Do I need to install a package?',
    answer:
      "No per-component npm install. Each component page gives you the exact source to paste into your project — it becomes your code, not a dependency you have to wait on for updates.",
  },
  {
    question: 'Which frameworks does this work with?',
    answer:
      'Built for React and Next.js on the web today, with the same component API landing on React Native next — one design, two renderers, so you write a component once.',
  },
  {
    question: 'Does Varient support dark mode?',
    answer:
      'Yes — every component reads semantic color tokens and repaints automatically when the .dark class is applied to the root. No per-component dark: overrides to maintain.',
  },
  {
    question: 'Can I use only some components?',
    answer:
      "Yes — there's no all-or-nothing install. Foundation, Animated, and Sections are independent; take a single Button or an entire pricing section.",
  },
  {
    question: 'Is accessibility actually handled, or an afterthought?',
    answer:
      'Foundation components are Radix-based (keyboard nav, focus management, ARIA baked in). Every Animated component checks prefers-reduced-motion and falls back to a static state — this is enforced, not optional.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

/**
 * Small local Accordion primitive on `@radix-ui/react-accordion` — ported
 * verbatim from SmoothUI's `packages/shadcn-ui/components/ui/accordion.tsx`
 * (single-open collapsible, `data-state` driven chevron rotation). Kept
 * local to this file rather than added to `@varient/ui` since the shipped
 * `Accordion` foundation component doesn't exist yet.
 */
function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        'peer rounded-xl border-none px-6 py-1 last:border-b-0 data-[state=open]:border-none data-[state=open]:bg-card data-[state=open]:shadow-sm data-[state=open]:ring-1 data-[state=open]:ring-foreground/5',
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-none border-b border-border py-4 text-left font-medium text-base outline-none transition-none hover:no-underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:border-transparent [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm motion-reduce:animate-none data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pb-4 pt-0 pr-10 text-primary-foreground', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

/**
 * Ported from SmoothUI's `components/landing/faqs.tsx` — same schema.org
 * JSON-LD script, heading, and single-open Accordion list; content is
 * Varient's (the "four themes" question is replaced — the identity engine
 * this repo used to have is gone, Varient is light/dark only).
 */
export function FaqSection() {
  return (
    <section className="relative w-full bg-background px-8 py-24">
      <Script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Schema.org JSON-LD structured data requires innerHTML
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        id="faq-schema"
        strategy="beforeInteractive"
        type="application/ld+json"
      />
      <Divider />
      <h2 className="text-balance text-center font-display font-semibold text-3xl text-foreground transition">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto mt-16 max-w-3xl space-y-4">
        <AccordionPrimitive.Root className="-space-y-1" collapsible data-orientation="vertical" type="single">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}
