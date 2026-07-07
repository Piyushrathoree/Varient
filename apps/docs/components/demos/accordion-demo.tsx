'use client';

import { Accordion, type AccordionVariant } from '@varient/ui';

const faqs = [
  {
    value: 'what-is-varient',
    question: 'What is Varient?',
    answer:
      'A copy-paste component library — animated, accessible, and built on Radix primitives with motion/react. Grab the source for a component and it lives in your project, not behind a package boundary.',
  },
  {
    value: 'installation',
    question: 'Do I need to install a package?',
    answer:
      'No. Each component page shows the exact files to copy and the handful of dependencies it relies on — nothing more ships with your bundle than what you actually use.',
  },
  {
    value: 'react-native',
    question: 'Does it work with React Native?',
    answer:
      'Yes — most components ship a native variant alongside the web one, sharing the same design tokens through a NativeWind bridge, so styling stays consistent across both.',
  },
  {
    value: 'accessibility',
    question: 'Is it accessible out of the box?',
    answer:
      'Every interactive component is built on Radix primitives — correct ARIA roles, full keyboard navigation, and focus management come standard, with motion gated behind prefers-reduced-motion.',
  },
];

const variants: { variant: AccordionVariant; label: string }[] = [
  { variant: 'default', label: 'Default' },
  { variant: 'separated', label: 'Separated' },
  { variant: 'ghost', label: 'Ghost' },
];

export function AccordionDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {variants.map(({ variant, label }) => (
        <div
          key={variant}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6"
        >
          <Accordion variant={variant} defaultValue="what-is-varient" className="w-full">
            {faqs.map((faq) => (
              <Accordion.Item key={faq.value} value={faq.value}>
                <Accordion.Trigger>{faq.question}</Accordion.Trigger>
                <Accordion.Content>{faq.answer}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function AccordionPreviewCompact() {
  return (
    <Accordion defaultValue="item-1" className="w-full max-w-[260px]">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Is it free?</Accordion.Trigger>
        <Accordion.Content>Yes, MIT licensed and free for any project.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Can I customize it?</Accordion.Trigger>
        <Accordion.Content>The source lives in your project — edit anything.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
