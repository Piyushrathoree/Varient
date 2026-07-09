'use client';

import { NotFoundPage } from '@varient/ui';

export function NotFoundPageDemo() {
  return (
    <div className="w-full bg-background">
      <NotFoundPage />
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
