'use client';

import { IntegrationGrid } from '@varient/ui';

export function IntegrationGridDemo() {
  return (
    <div className="w-full bg-background">
      <IntegrationGrid />
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
