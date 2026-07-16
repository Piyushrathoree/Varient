'use client';

import { IntegrationGrid } from '@varient/ui';

export function IntegrationGridDemo() {
  return (
    <div className="w-full bg-background">
      <IntegrationGrid
        description="Plug into your stack in minutes — no custom glue code required."
        eyebrow="Integrations"
        integrations={[
          {
            name: 'GitHub',
            description: 'Sync issues and pull requests both ways',
            href: 'https://github.com',
          },
          {
            name: 'Slack',
            description: 'Post deploy and alert updates to channels',
            href: 'https://slack.com',
          },
          {
            name: 'Figma',
            description: 'Import frames and design tokens on save',
            href: 'https://figma.com',
          },
          {
            name: 'Notion',
            description: 'Embed docs, wikis, and changelogs',
            href: 'https://notion.so',
          },
          {
            name: 'Linear',
            description: 'Track issues and roadmaps in one place',
            badge: 'New',
            href: 'https://linear.app',
          },
          {
            name: 'Stripe',
            description: 'Accept payments right in your app',
            href: 'https://stripe.com',
          },
          {
            name: 'Vercel',
            description: 'Ship a deploy preview on every push',
            href: 'https://vercel.com',
          },
          {
            name: 'Sentry',
            description: 'Catch and triage errors before users do',
            badge: 'Beta',
            href: 'https://sentry.io',
          },
        ]}
        title="Connect the tools you already use"
      />
    </div>
  );
}

export function IntegrationGridPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <IntegrationGrid
        className="px-4 py-6 md:py-6"
        description="Four popular connections."
        eyebrow="Integrations"
        integrations={[
          { name: 'GitHub', description: 'Sync issues and PRs', href: 'https://github.com' },
          { name: 'Slack', description: 'Post to channels', href: 'https://slack.com' },
          { name: 'Linear', description: 'Track roadmaps', badge: 'New', href: 'https://linear.app' },
          { name: 'Stripe', description: 'Accept payments', href: 'https://stripe.com' },
        ]}
        title="Connect your stack"
      />
    </div>
  );
}
