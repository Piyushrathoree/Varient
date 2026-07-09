'use client';

import type { ComponentProps } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import Script from 'next/script';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@varient/ui';
import Divider from '@/components/marketing/divider';
import { SectionHeader } from '@/components/marketing/section-header';

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
      'Built for React and Next.js on the web today, with the same component API landing on React Native next — one design, two renderers.',
  },
  {
    question: 'Does Varient support dark mode?',
    answer:
      'Yes — every component reads semantic color tokens and repaints automatically when the .dark class is applied to the root.',
  },
  {
    question: 'Can I use only some components?',
    answer:
      "Yes — there's no all-or-nothing install. Foundation, Animated, and Sections are independent; take a single Button or an entire pricing section.",
  },
  {
    question: 'Is accessibility actually handled, or an afterthought?',
    answer:
      'Foundation components are Radix-based. Every Animated component checks prefers-reduced-motion and falls back to a static state — enforced, not optional.',
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

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        'rounded-xl border border-border bg-card/30 px-5 transition-colors data-[state=open]:border-foreground/12 data-[state=open]:bg-card',
        className,
      )}
      data-slot="accordion-item"
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
        className={cn(
          'flex flex-1 cursor-pointer items-start justify-between gap-4 py-4 text-left font-medium text-base text-foreground outline-none transition-colors',
          'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200"
        />
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
      className="overflow-hidden text-sm motion-reduce:animate-none data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      data-slot="accordion-content"
      {...props}
    >
      <div className={cn('pb-4 pr-8 text-muted-foreground leading-relaxed', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export function FaqSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-background px-6 py-24 md:px-8 md:py-32">
      <Script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Schema.org JSON-LD structured data requires innerHTML
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        id="faq-schema"
        strategy="beforeInteractive"
        type="application/ld+json"
      />
      <Divider />
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          description="Everything you need to know before you copy your first component."
          eyebrow="FAQ"
          title="Common questions"
        />
        <motion.div
          className="mt-12 space-y-2"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        >
          <AccordionPrimitive.Root collapsible data-orientation="vertical" type="single">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} className="mb-2" value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </AccordionPrimitive.Root>
        </motion.div>
      </div>
    </section>
  );
}
