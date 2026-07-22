'use client';

import { type ComponentProps, useState } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@varient/ui';
import Divider from '@/components/marketing/divider';
import { SectionHeader } from '@/components/marketing/section-header';
import { docsRoute, gitConfig } from '@/lib/shared';

const ISSUES_URL = `https://github.com/${gitConfig.user}/${gitConfig.repo}/issues`;

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
      className={cn('border-border border-b', className)}
      data-slot="accordion-item"
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  isOpen,
  shouldReduceMotion,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger> & {
  isOpen: boolean;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex flex-1 cursor-pointer items-center justify-between gap-4 py-5 text-left font-medium font-title text-base text-foreground outline-none transition-colors',
          'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className={cn(
            'flex size-6 shrink-0 items-center justify-center text-muted-foreground transition-colors group-hover:text-brand',
            isOpen && 'text-brand',
          )}
          transition={
            shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }
          }
        >
          <Plus aria-hidden className="size-4" />
        </motion.span>
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
      <div className={cn('max-w-[60ch] pb-6 text-[14.5px] text-smooth-900 leading-relaxed', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export function FaqSection() {
  const shouldReduceMotion = useReducedMotion();
  const [openValue, setOpenValue] = useState('');

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
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="self-start lg:sticky lg:top-24">
          <SectionHeader
            align="left"
            description="Everything you need to know before you copy your first component."
            eyebrow="// answers"
            title="Answers, upfront."
          />
          <div className="mt-8 flex flex-col items-start gap-3">
            <Link
              className="group inline-flex items-center gap-1.5 text-foreground text-sm transition-colors duration-200 hover:text-brand"
              href={docsRoute}
            >
              <span>Read the docs</span>
              <ArrowRight
                aria-hidden
                className="size-3.5 shrink-0 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              className="group inline-flex items-center gap-1.5 text-foreground text-sm transition-colors duration-200 hover:text-brand"
              href={ISSUES_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Open an issue</span>
              <ArrowUpRight
                aria-hidden
                className="size-3.5 shrink-0 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        >
          <AccordionPrimitive.Root
            collapsible
            data-orientation="vertical"
            onValueChange={setOpenValue}
            type="single"
            value={openValue}
          >
            {faqs.map((faq, index) => {
              const value = `item-${index}`;
              return (
                <AccordionItem key={faq.question} value={value}>
                  <AccordionTrigger
                    isOpen={openValue === value}
                    shouldReduceMotion={shouldReduceMotion}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              );
            })}
          </AccordionPrimitive.Root>
        </motion.div>
      </div>
    </section>
  );
}
