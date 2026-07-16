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
          <DemoCard label="Sales — company + subject">
            <div className="w-full">
              <ContactForm
                className="px-0"
                description="Tell us about your team and what you're building."
                showCompanyField
                showSubjectField
                submitLabel="Talk to sales"
                successTitle="We're on it"
                successMessage="A member of our sales team will reach out within one business day."
                title="Contact sales"
              />
            </div>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-6 sm:px-8">
        <p className="text-sm font-medium text-muted-foreground">Custom fields</p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DemoCard label="Escape hatch — extra field via children">
            <div className="w-full">
              <ContactForm
                className="px-0"
                description="Include your budget so we can route you to the right team."
                submitLabel="Request a quote"
                successTitle="Request received"
                successMessage="We'll follow up with a tailored quote shortly."
                title="Request a quote"
              >
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium text-foreground">Budget range</span>
                  <select className="h-10 rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option>Under $10k</option>
                    <option>$10k – $50k</option>
                    <option>$50k+</option>
                  </select>
                </label>
              </ContactForm>
            </div>
          </DemoCard>
          <DemoCard label="Custom success copy, no branding defaults">
            <div className="w-full">
              <ContactForm
                className="px-0"
                description="Bug reports, feature requests, anything."
                submitLabel="Send feedback"
                successTitle="Got it, thank you"
                successMessage="Our product team reads every message — expect a follow-up if we need more detail."
                title="Share feedback"
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
