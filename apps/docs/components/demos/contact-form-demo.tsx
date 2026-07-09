'use client';

import { type ReactNode } from 'react';
import { ContactForm } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function ContactFormDemo() {
  return (
    <div className="flex w-full flex-col gap-8 bg-background">
      <div className="flex flex-col gap-3 px-6 sm:px-8">
        <p className="text-sm font-medium text-muted-foreground">Layouts</p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DemoCard label="Default">
            <div className="w-full">
              <ContactForm
                className="px-0"
                description="We typically reply within two business days."
                title="Get in touch"
              />
            </div>
          </DemoCard>
          <DemoCard label="With company field">
            <div className="w-full">
              <ContactForm
                className="px-0"
                description="Tell us about your team and what you're building."
                showCompanyField
                title="Contact sales"
              />
            </div>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function ContactFormPreviewCompact() {
  return (
    <div className="w-full bg-background px-4">
      <ContactForm
        className="px-0"
        description="Questions, feedback, or partnership ideas."
        title="Get in touch"
      />
    </div>
  );
}
