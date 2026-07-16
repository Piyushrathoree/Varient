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

const pricingItems: FaqItem[] = [
  {
    question: 'Can I switch plans later?',
    answer: 'Yes — upgrade or downgrade any time from billing settings; changes prorate automatically.',
  },
  {
    question: 'Do you offer a student discount?',
    answer: 'Yes, 50% off any paid plan with a verified .edu email — apply it at checkout.',
  },
  {
    question: 'What happens if I cancel?',
    answer: 'You keep access until the end of the billing period, then the workspace reverts to the free tier.',
  },
];

const supportItems: FaqItem[] = [
  {
    question: 'What are your support hours?',
    answer: 'Live chat runs Monday–Friday, 9am–6pm ET. Email support is monitored around the clock.',
  },
  {
    question: 'Do you have an SLA for enterprise plans?',
    answer: 'Enterprise plans include a 99.9% uptime SLA and a dedicated Slack channel with your team.',
  },
  {
    question: 'Where can I report a bug?',
    answer: 'File it in the community GitHub repo — most reports get triaged within one business day.',
  },
];

export function FaqDemo() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h3 className="px-1 text-xs font-medium text-muted-foreground">Single-open (default)</h3>
        <div className="w-full rounded-xl border border-border bg-card">
          <Faq
            eyebrow="Pricing"
            title="Billing questions"
            description="Everything you need to know before you upgrade."
            items={pricingItems}
            defaultOpenIndex={0}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="px-1 text-xs font-medium text-muted-foreground">allowMultiple — several panels open at once</h3>
        <div className="w-full rounded-xl border border-border bg-card">
          <Faq
            eyebrow="Support"
            title="Support & reliability"
            description="Response times, SLAs, and where to file issues."
            items={supportItems}
            allowMultiple
            defaultOpenIndex={0}
          />
        </div>
      </div>
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
