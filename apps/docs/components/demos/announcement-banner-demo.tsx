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

function SparkleIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 16 16">
      <path d="M8 1.5 9.4 5.6 13.5 7 9.4 8.4 8 12.5 6.6 8.4 2.5 7 6.6 5.6 8 1.5Z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 16 16">
      <path d="M8 5.5v3.25M8 11.25h.007" />
      <path d="M6.86 2.32 1.4 11.7c-.46.8.11 1.8 1.03 1.8h11.14c.92 0 1.5-1 1.03-1.8L9.14 2.32a1.19 1.19 0 0 0-2.06 0Z" />
    </svg>
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
        <p className="text-sm font-medium text-muted-foreground">Leading icon</p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DemoCard label="icon (brand)">
            <AnnouncementBanner
              icon={<SparkleIcon />}
              link={{ label: 'See what changed', href: '#whats-new' }}
              message="New: animated sections layer just shipped."
              variant="brand"
            />
          </DemoCard>
          <DemoCard label="icon (neutral)">
            <AnnouncementBanner
              dismissLabel="Close maintenance notice"
              icon={<AlertIcon />}
              message="Degraded performance on the API — investigating."
              variant="neutral"
            />
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Controlled dismiss</p>
        <DemoCard label="isDismissed / onDismiss / dismissLabel">
          <div className="flex w-full flex-col gap-3 p-4">
            <AnnouncementBanner
              dismissLabel="Dismiss maintenance notice"
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
        icon={<SparkleIcon />}
        link={{ label: 'Learn more', href: '#docs' }}
        message="New docs for animated components are available."
        variant="brand"
      />
    </div>
  );
}
