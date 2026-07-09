'use client';

import { forwardRef, useMemo, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Accordion } from '../../foundation/accordion';
import { cn } from '../../../lib/utils';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps extends HTMLAttributes<HTMLElement> {
  /** Small label above the title. */
  eyebrow?: string;
  /** Section headline. */
  title?: string;
  /** One-line supporting copy under the title. */
  description?: string;
  /** Question and answer pairs rendered in the accordion. */
  items?: FaqItem[];
  /** Zero-based index of the item open on first render. @default 0 */
  defaultOpenIndex?: number;
}

const DEFAULT_ITEMS: FaqItem[] = [
  {
    question: 'Is Varient really free?',
    answer:
      'Yes. MIT licensed, no paid tier, no account required. Browse the docs, copy what you need, and ship it.',
  },
  {
    question: 'Do I need to install a package?',
    answer:
      'No per-component npm install. Each component page gives you the exact source to paste into your project — it becomes your code, not a dependency you wait on for updates.',
  },
  {
    question: 'Which frameworks does this work with?',
    answer:
      'Built for React and Next.js on the web today, with the same component API landing on React Native next — one design, two renderers.',
  },
  {
    question: 'Does Varient support dark mode?',
    answer:
      'Yes — every component reads semantic color tokens and repaints automatically when the .dark class is applied to the root. No per-component dark overrides to maintain.',
  },
  {
    question: 'Can I use only some components?',
    answer:
      "Yes — there's no all-or-nothing install. Foundation, Animated, and Sections are independent; take a single Button or an entire pricing section.",
  },
  {
    question: 'Is accessibility actually handled, or an afterthought?',
    answer:
      'Foundation components are Radix-based — keyboard nav, focus management, and ARIA are built in. Every animated component checks prefers-reduced-motion and falls back to a static state.',
  },
];

export const Faq = forwardRef<HTMLElement, FaqProps>(
  (
    {
      className,
      eyebrow = 'FAQ',
      title = 'Frequently asked questions',
      description = 'Quick answers about copying components, theming, and what ships in the library.',
      items = DEFAULT_ITEMS,
      defaultOpenIndex = 0,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

    const defaultValue = useMemo(() => {
      if (items.length === 0) return undefined;
      const clampedIndex = Math.min(Math.max(defaultOpenIndex, 0), items.length - 1);
      return `faq-${clampedIndex}`;
    }, [defaultOpenIndex, items.length]);

    const transition = (delay: number) =>
      shouldReduceMotion ? { duration: 0 } : { type: 'spring' as const, duration: 0.3, bounce: 0.1, delay };

    const fadeUp = (delay: number) => ({
      initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, transform: 'translateY(10px)' },
      whileInView: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0px)' },
      transition: transition(delay),
      viewport: { once: true, amount: 0.5 } as const,
    });

    return (
      <section
        ref={ref}
        aria-labelledby="faq-section-title"
        className={cn('w-full bg-background px-6 py-16 md:px-8 md:py-24', className)}
        {...props}
      >
        <div className="mx-auto max-w-3xl">
          <div className="max-w-2xl">
            {eyebrow && (
              <motion.p className="mb-2 text-sm font-medium text-brand" {...fadeUp(0)}>
                {eyebrow}
              </motion.p>
            )}
            <motion.h2
              id="faq-section-title"
              className="text-balance font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              {...fadeUp(0.05)}
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                className="mt-4 text-balance text-sm text-muted-foreground md:text-base"
                {...fadeUp(0.1)}
              >
                {description}
              </motion.p>
            )}
          </div>

          <motion.div className="mt-8 md:mt-10" {...fadeUp(0.15)}>
            <Accordion variant="separated" defaultValue={defaultValue} className="w-full">
              {items.map((item, index) => (
                <Accordion.Item key={item.question} value={`faq-${index}`}>
                  <Accordion.Trigger>{item.question}</Accordion.Trigger>
                  <Accordion.Content>{item.answer}</Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    );
  },
);

Faq.displayName = 'Faq';
