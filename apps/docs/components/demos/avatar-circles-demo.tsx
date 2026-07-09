'use client';

import { type ReactNode } from 'react';
import { AvatarCircles } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const TEAM_AVATARS = [
  { alt: 'Alex Chen', fallback: 'AC' },
  { alt: 'Jordan Lee', fallback: 'JL' },
  { alt: 'Sam Rivera', fallback: 'SR' },
  { alt: 'Taylor Kim', fallback: 'TK' },
  { alt: 'Morgan Patel', fallback: 'MP' },
  { alt: 'Casey Wu', fallback: 'CW' },
  { alt: 'Riley Fox', fallback: 'RF' },
] as const;

export function AvatarCirclesDemo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <AvatarCircles avatars={[...TEAM_AVATARS]} maxVisible={5} />
        <div className="flex flex-col gap-1">
          <h2 className="font-title text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Loved by teams
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Overlapping avatars with staggered pop-in and a +N overflow chip.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DemoCard label="Small">
            <AvatarCircles
              avatars={TEAM_AVATARS.slice(0, 4)}
              size="sm"
            />
          </DemoCard>
          <DemoCard label="Medium">
            <AvatarCircles
              avatars={TEAM_AVATARS.slice(0, 4)}
              size="md"
            />
          </DemoCard>
          <DemoCard label="Large">
            <AvatarCircles
              avatars={TEAM_AVATARS.slice(0, 4)}
              size="lg"
            />
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function AvatarCirclesPreviewCompact() {
  return (
    <AvatarCircles
      avatars={[
        { alt: 'Alex Chen', fallback: 'AC' },
        { alt: 'Jordan Lee', fallback: 'JL' },
        { alt: 'Sam Rivera', fallback: 'SR' },
        { alt: 'Taylor Kim', fallback: 'TK' },
        { alt: 'Morgan Patel', fallback: 'MP' },
        { alt: 'Casey Wu', fallback: 'CW' },
      ]}
      maxVisible={4}
      size="sm"
    />
  );
}
