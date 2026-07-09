'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';
import { Card } from '../../foundation/card';

export interface BentoFeatureItem {
  title: string;
  description: string;
  visual?: ReactNode;
  className?: string;
}

export interface BentoFeaturesProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  items?: BentoFeatureItem[];
}

function GradientVisual({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'h-full min-h-24 w-full rounded-lg border border-border bg-muted/50',
        className,
      )}
    />
  );
}

function DiagramVisual() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 80"
      fill="none"
      className="h-full min-h-24 w-full text-brand"
    >
      <rect x="8" y="8" width="40" height="28" rx="4" className="fill-muted stroke-border" strokeWidth="1.5" />
      <rect x="56" y="8" width="56" height="28" rx="4" className="fill-muted/60 stroke-border" strokeWidth="1.5" />
      <rect x="8" y="44" width="104" height="28" rx="4" className="fill-muted stroke-border" strokeWidth="1.5" />
      <circle cx="28" cy="22" r="4" className="fill-brand" />
      <path d="M68 22h32M68 30h20" className="stroke-muted-foreground/50" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 58h72M24 66h48" className="stroke-muted-foreground/50" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StatVisual() {
  return (
    <div aria-hidden className="flex h-full min-h-24 flex-col items-center justify-center gap-1">
      <span className="font-display text-3xl font-semibold tracking-tight text-foreground">
        99.9<span className="text-brand">%</span>
      </span>
      <span className="text-xs text-muted-foreground">Uptime SLA</span>
    </div>
  );
}

function LayersVisual() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 80"
      fill="none"
      className="h-full min-h-24 w-full text-brand"
    >
      <path d="M60 12 20 32l40 20 40-20-40-20z" className="fill-muted stroke-border" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m20 48 40 20 40-20" className="stroke-border" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m20 40 40 20 40-20" className="stroke-foreground/30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MotionVisual() {
  return (
    <div aria-hidden className="relative h-full min-h-24 w-full overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-muted/40" />
      <div className="absolute top-1/2 left-4 size-3 -translate-y-1/2 rounded-full bg-brand" />
      <div className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/60" />
      <div className="absolute top-1/2 right-4 size-3 -translate-y-1/2 rounded-full bg-brand/30" />
    </div>
  );
}

const defaultVisuals = [GradientVisual, DiagramVisual, StatVisual, LayersVisual, MotionVisual];

export const defaultBentoItems: BentoFeatureItem[] = [
  {
    title: 'Token-driven theming',
    description: 'One CSS file restyles every component for light and dark mode.',
    className: 'md:col-span-2',
  },
  {
    title: 'Copy-paste DX',
    description: 'Copy the source, own the code, ship without version lock-in.',
    className: 'md:row-span-2',
  },
  {
    title: 'Motion built in',
    description: 'Springs and scroll reveals with reduced-motion fallbacks.',
    className: 'md:col-span-2',
  },
  {
    title: 'Three composable layers',
    description: 'Foundation, animated, and section blocks that compose cleanly.',
  },
  {
    title: 'Production ready',
    description: 'Radix primitives, strict TypeScript, and accessible defaults.',
    className: 'md:col-span-2',
  },
];

function BentoCard({
  item,
  index,
  shouldReduceMotion,
}: {
  item: BentoFeatureItem;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const DefaultVisual = defaultVisuals[index % defaultVisuals.length];
  const visual = item.visual ?? <DefaultVisual />;

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: EASE_OUT, delay: index * 0.06 },
        viewport: { once: true, amount: 0.2 } as const,
      };

  return (
    <motion.div className={cn(item.className)} {...motionProps}>
      <Card isHoverable className="h-full">
        <Card.Body className="flex h-full flex-col gap-4">
          <div className="flex-1">{visual}</div>
          <div>
            <h3 className="line-clamp-1 text-base font-semibold text-foreground">{item.title}</h3>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export const BentoFeatures = forwardRef<HTMLElement, BentoFeaturesProps>(
  (
    {
      className,
      eyebrow = 'Features',
      title = (
        <>
          Built for teams who{' '}
          <span className="text-brand">ship fast</span>
        </>
      ),
      description = 'An asymmetric bento grid that highlights what makes your product different.',
      items = defaultBentoItems,
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
        aria-labelledby="bento-features-heading"
        {...props}
      >
        <motion.header className="max-w-2xl" {...headerMotion}>
          {eyebrow && (
            <p className="text-sm font-medium text-brand">{eyebrow}</p>
          )}
          <h2
            id="bento-features-heading"
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm text-muted-foreground md:text-base">{description}</p>
          )}
        </motion.header>

        <div className="mt-10 grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <BentoCard
              key={`${item.title}-${index}`}
              item={item}
              index={index}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          ))}
        </div>
      </section>
    );
  },
);

BentoFeatures.displayName = 'BentoFeatures';
