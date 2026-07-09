'use client';

import { type ReactNode } from 'react';
import { NewsletterSignup } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function NewsletterSignupDemo() {
  return (
    <div className="flex w-full flex-col gap-8 bg-background">
      <div className="flex flex-col gap-3 px-6 sm:px-8">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DemoCard label="Inline">
            <div className="w-full">
              <NewsletterSignup
                className="px-0"
                variant="inline"
                description="Get product updates and release notes — no spam."
                title="Stay in the loop"
              />
            </div>
          </DemoCard>
          <DemoCard label="Card">
            <div className="w-full">
              <NewsletterSignup
                className="px-0"
                variant="card"
                description="Join thousands of builders shipping with Varient."
                title="Stay in the loop"
              />
            </div>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function NewsletterSignupPreviewCompact() {
  return (
    <div className="w-full bg-background px-4">
      <NewsletterSignup
        className="px-0"
        description="Monthly updates only."
        title="Stay in the loop"
        variant="inline"
      />
    </div>
  );
}
