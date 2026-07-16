'use client';

import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';

export interface FeatureItem {
  /** Custom icon node — defaults to a built-in inline SVG when omitted. */
  icon?: ReactNode;
  title: string;
  description: string;
}

export interface FeaturesProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  features?: FeatureItem[];
  /**
   * `'grid'` renders the default responsive card grid; `'split'` renders
   * alternating icon/text rows (image-free split layout) so this component
   * reads differently from `BentoFeatures`.
   */
  layout?: 'grid' | 'split';
}

function IconSparkle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3l1.2 4.2L17 8.5l-3.8 1.3L12 14l-1.2-4.2L7 8.5l3.8-1.3L12 3z" />
      <path d="M5 16l.6 2.1L7.7 19l-2.1.7L5 22l-.6-2.3L2.3 19l2.1-.7L5 16z" />
      <path d="M19 14l.6 2.1 2.1.7-2.1.7L19 20l-.6-2.5-2.1-.7 2.1-.7L19 14z" />
    </svg>
  );
}

function IconCopy({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconLayers({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}

function IconPalette({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2a10 10 0 1 0 10 10c0-2.5-2-4-4-4h-1.5a1.5 1.5 0 0 1-1.4-2 2.5 2.5 0 0 0-2.4-3.2A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconBolt({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

const defaultFeatureIcons = [IconSparkle, IconCopy, IconLayers, IconPalette, IconShield, IconBolt];

export const defaultFeatures: FeatureItem[] = [
  {
    title: 'Animated by default',
    description:
      'Every animated component uses motion/react with prefers-reduced-motion fallbacks built in from the start.',
  },
  {
    title: 'Copy-paste, you own it',
    description:
      'No per-component npm installs. Copy the source into your project and change it whenever you need to.',
  },
  {
    title: 'Three composable layers',
    description:
      'Foundation utilities, animated flourishes, and full-page sections that compose from the layers below.',
  },
  {
    title: 'Token-driven styling',
    description:
      'Semantic design tokens for light and dark mode — restyle the whole system from one CSS file.',
  },
  {
    title: 'Accessible primitives',
    description:
      'Radix-powered controls handle keyboard navigation, focus management, and ARIA roles out of the box.',
  },
  {
    title: 'Ship faster',
    description:
      'Drop in polished sections and components so your team spends time on product logic, not UI scaffolding.',
  },
];

function FeatureCard({
  feature,
  index,
  shouldReduceMotion,
}: {
  feature: FeatureItem;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const DefaultIcon = defaultFeatureIcons[index % defaultFeatureIcons.length];
  const icon = feature.icon ?? <DefaultIcon className="size-4 text-brand" />;

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: EASE_OUT, delay: index * 0.06 },
        viewport: { once: true, amount: 0.2 } as const,
      };

  return (
    <motion.article
      className="flex h-full flex-col rounded-xl border border-border bg-card p-6"
      {...motionProps}
    >
      <div
        aria-hidden
        className="mb-4 flex size-9 items-center justify-center rounded-lg bg-brand/10"
      >
        {icon}
      </div>
      <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {feature.description}
      </p>
    </motion.article>
  );
}

function FeatureRow({
  feature,
  index,
  shouldReduceMotion,
}: {
  feature: FeatureItem;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const DefaultIcon = defaultFeatureIcons[index % defaultFeatureIcons.length];
  const icon = feature.icon ?? <DefaultIcon className="size-5 text-brand" />;
  const reversed = index % 2 === 1;

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: reversed ? 16 : -16 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.35, ease: EASE_OUT, delay: index * 0.05 },
        viewport: { once: true, amount: 0.3 } as const,
      };

  return (
    <motion.article
      className={cn(
        'flex flex-col items-start gap-6 border-b border-border py-8 last:border-b-0 sm:flex-row sm:items-center',
        reversed && 'sm:flex-row-reverse',
      )}
      {...motionProps}
    >
      <div
        aria-hidden
        className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-brand/10"
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}

export const Features = forwardRef<HTMLElement, FeaturesProps>(
  (
    {
      className,
      eyebrow = 'Why Varient',
      title = (
        <>
          Everything you need to{' '}
          <span className="text-brand">ship polished UI</span>
        </>
      ),
      description = 'Foundation components, animated flourishes, and ready-made sections — copy the code and make it yours.',
      features = defaultFeatures,
      layout = 'grid',
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const headingId = useId();

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
        aria-labelledby={headingId}
        {...props}
      >
        <motion.header className="max-w-2xl" {...headerMotion}>
          {eyebrow && (
            <p className="text-sm font-medium text-brand">{eyebrow}</p>
          )}
          <h2
            id={headingId}
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm text-muted-foreground md:text-base">{description}</p>
          )}
        </motion.header>

        {layout === 'split' ? (
          <div className="mt-10 flex flex-col">
            {features.map((feature, index) => (
              <FeatureRow
                key={`${feature.title}-${index}`}
                feature={feature}
                index={index}
                shouldReduceMotion={!!shouldReduceMotion}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid auto-rows-fr grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={`${feature.title}-${index}`}
                feature={feature}
                index={index}
                shouldReduceMotion={!!shouldReduceMotion}
              />
            ))}
          </div>
        )}
      </section>
    );
  },
);

Features.displayName = 'Features';
