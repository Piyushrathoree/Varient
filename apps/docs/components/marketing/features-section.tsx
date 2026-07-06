import { Layers3, Paintbrush, Sparkles, Copy } from 'lucide-react';
import { cn } from '@varient/ui';
import { SectionHeader } from '@/components/marketing/section-header';
import Divider from '@/components/marketing/divider';

const features = [
  {
    title: 'Animated by default',
    description:
      'Every animated component is powered by Motion, with prefers-reduced-motion fallbacks built in — not bolted on afterward.',
    icon: Sparkles,
  },
  {
    title: 'Copy-paste, you own it',
    description:
      'No npm install per component. Copy the source into your project — modify it, delete it, or diverge from it whenever you want.',
    icon: Copy,
  },
  {
    title: 'Web and native',
    description:
      'One component API across platforms — the same Button, Badge, or Switch renders on the web today, React Native next.',
    icon: Layers3,
  },
  {
    title: 'Tailwind CSS v4',
    description:
      'Semantic tokens instead of hex codes, full dark mode support, and utility classes you can restyle without a fight.',
    icon: Paintbrush,
  },
];

/**
 * Ported from SmoothUI's `components/landing/features.tsx` — same
 * `SectionHeader` + 4-card grid structure and card classes; content is
 * Varient's.
 */
export function Features() {
  return (
    <section className="relative bg-background px-8 py-24 transition">
      <Divider />
      <SectionHeader
        description="Built for developers who want animation without the bloat — copy-paste components for web and native, no lock-in."
        eyebrow="Why Varient"
        title={
          <>
            Why Choose <span className="text-brand">Varient</span>?
          </>
        }
      />
      <div className="mt-16 grid w-full gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            className={cn(
              'group relative inset-ring-2 inset-ring-background flex flex-col rounded-2xl bg-linear-to-b bg-transparent from-65% from-primary/30 to-transparent p-6 backdrop-blur-lg transition-all hover:from-primary',
              'border shadow-blue-800/10 shadow-sm hover:shadow-none',
            )}
            key={feature.title}
          >
            <div className="inset-ring inset-ring-background mb-4 flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-brand bg-primary p-2">
              <feature.icon className="text-brand transition" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground text-xl transition">{feature.title}</h3>
            <p className="text-primary-foreground transition">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
