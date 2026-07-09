'use client';

import { type ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { BrowserFrame } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function SamplePageContent() {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
      <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
        <Sparkles className="size-5 text-foreground" strokeWidth={1.5} />
      </div>
      <p className="font-title text-sm font-semibold tracking-tight text-foreground">
        Your component here
      </p>
      <p className="text-xs text-muted-foreground">
        Drop screenshots or live previews inside the frame.
      </p>
    </div>
  );
}

export function BrowserFrameDemo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-title text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Browser window mockup
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Rounded chrome with URL bar and a composable content slot — ideal for showcasing UI.
        </p>
      </div>

      <BrowserFrame url="https://varient.dev/docs" className="mx-auto w-full max-w-lg">
        <SamplePageContent />
      </BrowserFrame>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Chrome variants</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DemoCard label="Light chrome">
            <BrowserFrame
              url="app.example.com/dashboard"
              isAnimated={false}
              className="w-full max-w-sm"
            >
              <SamplePageContent />
            </BrowserFrame>
          </DemoCard>
          <DemoCard label="Dark chrome">
            <BrowserFrame
              url="app.example.com/settings"
              isDark
              isAnimated={false}
              className="w-full max-w-sm"
            >
              <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
                <p className="font-title text-sm font-semibold text-smooth-100">
                  Dark mode preview
                </p>
                <p className="text-xs text-smooth-400">Toggle with `isDark`.</p>
              </div>
            </BrowserFrame>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function BrowserFramePreviewCompact() {
  return (
    <BrowserFrame
      url="varient.dev"
      isAnimated={false}
      className="w-full max-w-[220px]"
    >
      <div className="flex items-center justify-center px-4 py-6">
        <span className="text-xs font-medium text-muted-foreground">Preview slot</span>
      </div>
    </BrowserFrame>
  );
}
