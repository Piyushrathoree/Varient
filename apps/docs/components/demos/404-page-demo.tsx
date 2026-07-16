'use client';

import { NotFoundPage } from '@varient/ui';

export function NotFoundPageDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card">
        <NotFoundPage
          code="404"
          title="This deploy doesn't exist"
          description="It may have been rolled back or the preview URL expired. Check the project dashboard for the current deployment."
          homeHref="/dashboard"
          homeLabel="Go to dashboard"
          secondaryAction={{ label: 'View deployments', href: '/deployments' }}
          popularLinks={[
            { label: 'Docs', href: '/docs' },
            { label: 'Status', href: '/status' },
            { label: 'Support', href: '/support' },
          ]}
        />
      </div>

      <div className="rounded-xl border border-border bg-card">
        <NotFoundPage
          code="Oops"
          title="We lost that page"
          description="The link you followed might be broken, or the page may have been removed entirely."
          homeHref="/"
          homeLabel="Take me home"
          popularLinks={[
            { label: 'Blog', href: '/blog' },
            { label: 'Pricing', href: '/pricing' },
          ]}
        />
      </div>
    </div>
  );
}

export function NotFoundPagePreviewCompact() {
  return (
    <div className="w-full bg-background">
      <NotFoundPage
        className="min-h-0 px-4 py-6 md:min-h-0 md:py-6"
        description="This preview link may have moved."
        homeHref="/"
        homeLabel="Back to docs"
        title="Page not found"
      />
    </div>
  );
}
