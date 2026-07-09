'use client';

import { type ReactNode } from 'react';
import { Terminal, TerminalLine } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function TerminalDemo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-title text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Terminal window mockup
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Composable lines type and appear in sequence — commands, output, and status glyphs.
        </p>
      </div>

      <Terminal title="~/varient" className="mx-auto w-full max-w-lg">
        <TerminalLine variant="command" delay={0}>
          bun add @varient/ui
        </TerminalLine>
        <TerminalLine variant="output" delay={1.8}>
          installed 3 packages in 412ms
        </TerminalLine>
        <TerminalLine variant="command" delay={2.6}>
          bun run dev
        </TerminalLine>
        <TerminalLine variant="success" delay={4.2}>
          Ready on http://localhost:3000
        </TerminalLine>
      </Terminal>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Error state</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DemoCard label="Build failure">
            <Terminal title="ci" className="w-full max-w-sm">
              <TerminalLine variant="command" delay={0}>
                bun run build
              </TerminalLine>
              <TerminalLine variant="error" delay={1.4}>
                Type error in components/hero.tsx
              </TerminalLine>
            </Terminal>
          </DemoCard>
          <DemoCard label="Deploy success">
            <Terminal title="deploy" className="w-full max-w-sm">
              <TerminalLine variant="command" delay={0}>
                vercel deploy --prod
              </TerminalLine>
              <TerminalLine variant="success" delay={1.6}>
                Production deployment complete
              </TerminalLine>
            </Terminal>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function TerminalPreviewCompact() {
  return (
    <Terminal title="~" className="w-full max-w-xs">
      <TerminalLine variant="command" delay={0}>
        npm install
      </TerminalLine>
      <TerminalLine variant="success" delay={1.2}>
        Done
      </TerminalLine>
    </Terminal>
  );
}
