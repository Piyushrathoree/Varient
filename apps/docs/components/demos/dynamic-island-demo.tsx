'use client';

import { useState, type ReactNode } from 'react';
import { DynamicIsland } from '@varient/ui';
import { Music2, Pause, Phone, PhoneOff, Play, Timer } from 'lucide-react';

// ── Tiny preset view builders (demo-only — the component only knows about
// `Record<string, ReactNode>`, it has no opinion on timer/music/call content). ──

function TimerView() {
  return (
    <div className="flex items-center gap-2 px-1">
      <Timer className="size-4 text-brand" aria-hidden />
      <span className="font-mono text-sm font-semibold tabular-nums text-foreground">12:45</span>
    </div>
  );
}

function MusicView() {
  const [isPlaying, setIsPlaying] = useState(true);
  return (
    <div className="flex items-center gap-3 px-1">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/20">
        <Music2 className="size-3.5 text-brand" aria-hidden />
      </span>
      <div className="flex flex-col leading-none">
        <span className="text-xs font-semibold text-foreground">Night Drive</span>
        <span className="text-[10px] text-foreground/50">Lo-fi Collective</span>
      </div>
      <button
        type="button"
        onClick={() => setIsPlaying((playing) => !playing)}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        className="ml-1 flex size-6 shrink-0 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {isPlaying ? <Pause className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}
      </button>
    </div>
  );
}

function CallView() {
  return (
    <div className="flex items-center gap-3 px-1">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success/20">
        <Phone className="size-3.5 text-success" aria-hidden />
      </span>
      <span className="text-xs font-semibold text-foreground">Alex Rivera</span>
      <button
        type="button"
        aria-label="Decline call"
        className="ml-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-destructive text-white transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <PhoneOff className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}

function IdleView() {
  return (
    <div className="flex items-center gap-2 px-1">
      <span className="size-1.5 rounded-full bg-success" aria-hidden />
      <span className="text-xs font-medium text-foreground/70">Idle</span>
    </div>
  );
}

const SWITCHER_VIEWS: Record<string, ReactNode> = {
  idle: <IdleView />,
  timer: <TimerView />,
  music: <MusicView />,
  call: <CallView />,
};

const SWITCHER_STATES: { key: string; label: string }[] = [
  { key: 'idle', label: 'Idle' },
  { key: 'timer', label: 'Timer' },
  { key: 'music', label: 'Music' },
  { key: 'call', label: 'Call' },
];

function StateSwitcherCard() {
  const [state, setState] = useState('idle');

  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-3">
      <DynamicIsland state={state} views={SWITCHER_VIEWS} />

      <div
        role="group"
        aria-label="Dynamic Island state"
        className="inline-flex items-center gap-1 rounded-full border border-border bg-background p-1"
      >
        {SWITCHER_STATES.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setState(item.key)}
            aria-pressed={state === item.key}
            className={
              'rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
              (state === item.key
                ? 'bg-brand text-white'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground')
            }
          >
            {item.label}
          </button>
        ))}
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        Interactive state switcher — one island, four views
      </span>
    </div>
  );
}

function CompactCard() {
  const views: Record<string, ReactNode> = { compact: <TimerView /> };
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      <DynamicIsland state="compact" views={views} />
      <span className="text-xs font-medium text-muted-foreground">Compact</span>
    </div>
  );
}

function ExpandedCard() {
  const views: Record<string, ReactNode> = { expanded: <MusicView /> };
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      <DynamicIsland state="expanded" views={views} />
      <span className="text-xs font-medium text-muted-foreground">Expanded</span>
    </div>
  );
}

function CallCard() {
  const views: Record<string, ReactNode> = { call: <CallView /> };
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      <DynamicIsland state="call" views={views} />
      <span className="text-xs font-medium text-muted-foreground">Call — expanded, wider</span>
    </div>
  );
}

export function DynamicIslandDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StateSwitcherCard />
      <CompactCard />
      <ExpandedCard />
      <CallCard />
    </div>
  );
}

export function DynamicIslandPreviewCompact() {
  const views: Record<string, ReactNode> = { music: <MusicView /> };
  return (
    <div className="flex w-full items-center justify-center p-6">
      <DynamicIsland state="music" views={views} />
    </div>
  );
}
