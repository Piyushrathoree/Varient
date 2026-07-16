'use client';

import { useState, type ReactNode } from 'react';
import { TextScramble } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const BINARY_CHARACTER_SET = '01';

function ReplayOnHoverCard() {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <DemoCard label="Replay on hover">
      <button
        type="button"
        onMouseEnter={() => setReplayKey((key) => key + 1)}
        className="cursor-pointer rounded-lg font-mono text-lg font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <TextScramble
          key={replayKey}
          text="hover to replay"
          isTriggeredOnView={false}
        />
      </button>
    </DemoCard>
  );
}

export function TextScrambleDemo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <TextScramble
          as="h2"
          text="Decrypt the message"
          className="font-mono text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        />
        <p className="max-w-sm text-sm text-muted-foreground">
          Characters shuffle through a charset, resolving left to right into the real text.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variations</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoCard label="Default">
            <TextScramble
              as="span"
              text="Varient UI"
              className="font-mono text-xl font-semibold text-foreground"
            />
          </DemoCard>
          <DemoCard label="Slow cinematic">
            <TextScramble
              as="span"
              text="Initializing session"
              duration={2.2}
              speed={0.06}
              className="font-mono text-xl font-semibold text-brand"
            />
          </DemoCard>
          <DemoCard label="Binary charset">
            <TextScramble
              as="span"
              text="01000110 01001111"
              characterSet={BINARY_CHARACTER_SET}
              className="font-mono text-xl font-semibold text-foreground"
            />
          </DemoCard>
          <ReplayOnHoverCard />
        </div>
      </div>
    </div>
  );
}

export function TextScramblePreviewCompact() {
  return (
    <TextScramble
      as="span"
      text="Varient UI"
      duration={1.1}
      className="font-mono text-2xl font-semibold text-foreground"
    />
  );
}
