'use client';

import { useState, type ReactNode } from 'react';
import { AnnouncementBanner } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-xl border border-border bg-card">
      {children}
      <span className="px-4 pb-4 text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function AnnouncementBannerDemo() {
  const [isDismissed, setIsDismissed] = useState(false);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DemoCard label="Neutral">
            <AnnouncementBanner
              link={{ label: 'Read the changelog', href: '#changelog' }}
              message="Varient v1.2 is live — 12 new animated components and refreshed tokens."
              variant="neutral"
            />
          </DemoCard>
          <DemoCard label="Brand accent">
            <AnnouncementBanner
              link={{ label: 'Start building', href: '#components' }}
              message="Ship landing pages faster with copy-paste sections."
              variant="brand"
            />
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Controlled dismiss</p>
        <DemoCard label="isDismissed / onDismiss">
          <div className="flex w-full flex-col gap-3 p-4">
            <AnnouncementBanner
              isDismissed={isDismissed}
              link={{ label: 'View release notes', href: '#release' }}
              message="Maintenance window scheduled for Saturday 02:00 UTC."
              onDismiss={() => setIsDismissed(true)}
              variant="neutral"
            />
            {isDismissed && (
              <button
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                onClick={() => setIsDismissed(false)}
                type="button"
              >
                Reset banner
              </button>
            )}
          </div>
        </DemoCard>
      </div>
    </div>
  );
}

export function AnnouncementBannerPreviewCompact() {
  return (
    <div className="w-full max-w-md">
      <AnnouncementBanner
        link={{ label: 'Learn more', href: '#docs' }}
        message="New docs for animated components are available."
        variant="brand"
      />
    </div>
  );
}
