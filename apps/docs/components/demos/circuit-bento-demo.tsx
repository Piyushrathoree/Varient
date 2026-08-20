'use client';

import { CircuitBento, type CircuitBentoItem } from '@varient/ui';

const items: CircuitBentoItem[] = [
  {
    title: 'React',
    description:
      'The library for web and native user interfaces. Built on the latest React features, including Server Components and Actions.',
    href: 'https://react.dev',
  },
  {
    title: 'Motion',
    description:
      'An animation library for React, written for production UIs — springs, layout, and reduced-motion fallbacks included.',
    href: 'https://motion.dev',
  },
  {
    title: 'Tailwind CSS',
    description:
      'A utility-first styling platform for the next generation of fast UI work, from tokens through to production CSS.',
    href: 'https://tailwindcss.com',
  },
];

export function CircuitBentoDemo() {
  return (
    <div className="w-full bg-background">
      <CircuitBento items={items} />
    </div>
  );
}

export function CircuitBentoPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <CircuitBento
        isCompact
        className="px-4 py-6 md:py-6"
        title={
          <>
            Built on <span className="text-brand">production-grade</span> tooling
          </>
        }
        items={[
          {
            title: 'React',
            description: 'Server Components and a single component model.',
            href: 'https://react.dev',
          },
          {
            title: 'Motion',
            description: 'Springs, layout, and reduced-motion fallbacks.',
            href: 'https://motion.dev',
          },
          {
            title: 'Tailwind',
            description: 'Utility-first CSS mapped onto design tokens.',
            href: 'https://tailwindcss.com',
          },
        ]}
      />
    </div>
  );
}
