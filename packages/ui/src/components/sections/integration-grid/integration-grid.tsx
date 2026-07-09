'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Badge } from '../../foundation/badge';
import { Card } from '../../foundation/card';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';

export interface Integration {
  name: string;
  description?: string;
  icon?: ReactNode;
  href?: string;
  badge?: string;
}

export interface IntegrationGridProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  integrations?: Integration[];
}

function IconGithub({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function IconSlack({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
      <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5S22 7.67 22 8.5 21.33 10 20.5 10z" />
      <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
      <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
      <path d="M14 9.5V8c0-.83.67-1.5 1.5-1.5H20c.83 0 1.5.67 1.5 1.5S20.83 10 20 10h-4.5c-.83 0-1.5-.67-1.5-1.5z" />
      <path d="M10 14.5v1.5c0 .83-.67 1.5-1.5 1.5H4c-.83 0-1.5-.67-1.5-1.5S3.17 14 4 14h4.5c.83 0 1.5.67 1.5 1.5z" />
    </svg>
  );
}

function IconFigma({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  );
}

function IconNotion({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M4.5 4.5h15v15h-15z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

function IconLinear({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M4 20 20 4" />
      <path d="M9 20h11v-11" />
    </svg>
  );
}

function IconStripe({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M4 10h16v8H4z" />
      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
    </svg>
  );
}

function IconVercel({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2 22 20H2L12 2z" />
    </svg>
  );
}

function IconSentry({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M12 3 3 21h18L12 3z" />
      <path d="M12 16v-5" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  );
}

const DEFAULT_ICONS = [
  IconGithub,
  IconSlack,
  IconFigma,
  IconNotion,
  IconLinear,
  IconStripe,
  IconVercel,
  IconSentry,
] as const;

export const defaultIntegrations: Integration[] = [
  {
    name: 'GitHub',
    description: 'Sync issues and pull requests',
    href: 'https://github.com',
  },
  {
    name: 'Slack',
    description: 'Post updates to your channels',
    href: 'https://slack.com',
  },
  {
    name: 'Figma',
    description: 'Import frames and design tokens',
    href: 'https://figma.com',
  },
  {
    name: 'Notion',
    description: 'Embed docs and wikis',
    href: 'https://notion.so',
  },
  {
    name: 'Linear',
    description: 'Track issues and roadmaps',
    badge: 'New',
    href: 'https://linear.app',
  },
  {
    name: 'Stripe',
    description: 'Accept payments in your app',
    href: 'https://stripe.com',
  },
  {
    name: 'Vercel',
    description: 'Deploy previews on every push',
    href: 'https://vercel.com',
  },
  {
    name: 'Sentry',
    description: 'Catch errors before users do',
    badge: 'Beta',
    href: 'https://sentry.io',
  },
];

function IntegrationIcon({ integration, index }: { integration: Integration; index: number }) {
  const Icon = DEFAULT_ICONS[index % DEFAULT_ICONS.length];

  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand"
      aria-hidden
    >
      {integration.icon ?? <Icon className="size-5" />}
    </div>
  );
}

function IntegrationTile({
  integration,
  index,
  shouldReduceMotion,
}: {
  integration: Integration;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: EASE_OUT, delay: index * 0.05 },
        viewport: { once: true, amount: 0.2 } as const,
      };

  const tile = (
    <Card
      isHoverable
      className="h-full gap-3 p-4 transition-shadow duration-300 ease-out hover:shadow-md motion-reduce:transition-none sm:p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <IntegrationIcon index={index} integration={integration} />
        {integration.badge && (
          <Badge
            size="sm"
            variant={integration.badge.toLowerCase() === 'beta' ? 'warning' : 'primary'}
          >
            {integration.badge}
          </Badge>
        )}
      </div>
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-semibold text-foreground">{integration.name}</p>
        {integration.description && (
          <p className="line-clamp-1 text-xs text-muted-foreground">{integration.description}</p>
        )}
      </div>
    </Card>
  );

  if (integration.href) {
    return (
      <motion.a
        href={integration.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${integration.name}${integration.description ? ` — ${integration.description}` : ''}`}
        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        {...motionProps}
      >
        {tile}
      </motion.a>
    );
  }

  return (
    <motion.article className="h-full" {...motionProps}>
      {tile}
    </motion.article>
  );
}

export const IntegrationGrid = forwardRef<HTMLElement, IntegrationGridProps>(
  (
    {
      className,
      eyebrow = 'Integrations',
      title = 'Connect the tools you already use',
      description = 'Plug into your stack in minutes — no custom glue code required.',
      integrations = defaultIntegrations,
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
        aria-labelledby="integration-grid-heading"
        className={cn('w-full px-6 py-16 md:px-8 md:py-24', className)}
        {...props}
      >
        <div className="mx-auto max-w-6xl">
          <motion.header className="max-w-2xl" {...headerMotion}>
            {eyebrow && (
              <p className="text-sm font-medium text-brand">{eyebrow}</p>
            )}
            <h2
              id="integration-grid-heading"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-3 text-sm text-muted-foreground md:text-base">{description}</p>
            )}
          </motion.header>

          <div className="mt-10 grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-4">
            {integrations.map((integration, index) => (
              <IntegrationTile
                key={`${integration.name}-${index}`}
                index={index}
                integration={integration}
                shouldReduceMotion={!!shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </section>
    );
  },
);

IntegrationGrid.displayName = 'IntegrationGrid';
