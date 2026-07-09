'use client';

import { type ReactNode } from 'react';
import { TypewriterText } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const ROLE_PHRASES = [
  'designers',
  'developers',
  'teams',
  'everyone',
] as const;

export function TypewriterTextDemo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-title text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Built for{' '}
          <TypewriterText
            text={[...ROLE_PHRASES]}
            className="text-brand"
          />
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Characters type on one at a time with a blinking cursor.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variations</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Single phrase">
            <span className="font-title text-xl font-semibold text-foreground">
              <TypewriterText text="Copy, paste, ship." typeSpeed={45} />
            </span>
          </DemoCard>
          <DemoCard label="Fast typing">
            <span className="font-title text-xl font-semibold text-foreground">
              Ship{' '}
              <TypewriterText
                text={['fast', 'smooth', 'accessible']}
                typeSpeed={30}
                deleteSpeed={20}
                pauseDuration={900}
              />
            </span>
          </DemoCard>
          <DemoCard label="No cursor">
            <span className="font-title text-xl font-semibold text-foreground">
              <TypewriterText
                text="Minimal typewriter."
                showCursor={false}
              />
            </span>
          </DemoCard>
          <DemoCard label="Play once">
            <span className="font-title text-xl font-semibold text-foreground">
              Hello,{' '}
              <TypewriterText
                text={['world', 'Varient']}
                isLooping={false}
                pauseDuration={1200}
              />
            </span>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function TypewriterTextPreviewCompact() {
  return (
    <span className="font-title text-lg font-semibold text-foreground">
      Built for{' '}
      <TypewriterText
        text={['designers', 'developers']}
        typeSpeed={50}
        pauseDuration={1400}
      />
    </span>
  );
}
