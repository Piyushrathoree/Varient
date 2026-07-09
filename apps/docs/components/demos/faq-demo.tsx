'use client';

import { Faq, type FaqItem } from '@varient/ui';

const compactItems: FaqItem[] = [
  {
    question: 'Is it free?',
    answer: 'Yes — MIT licensed and free for any project.',
  },
  {
    question: 'Can I customize it?',
    answer: 'The source lives in your project, so you can edit anything.',
  },
];

export function FaqDemo() {
  return (
    <div className="w-full bg-background">
      <Faq />
    </div>
  );
}

export function FaqPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <Faq
        className="px-4 py-6 md:py-6"
        defaultOpenIndex={0}
        description="Two quick answers."
        eyebrow="FAQ"
        items={compactItems}
        title="Common questions"
      />
    </div>
  );
}
