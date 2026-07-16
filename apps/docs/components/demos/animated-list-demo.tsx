'use client';

import { AnimatedList, AnimatedListItem } from '@varient/ui';
import { Bell, CheckCircle2, MessageSquare, Zap } from 'lucide-react';

const NOTIFICATIONS = [
  {
    icon: Bell,
    title: 'New deployment',
    body: 'Preview ready on staging — review before merge.',
  },
  {
    icon: MessageSquare,
    title: 'Comment on PR #42',
    body: 'Alex left feedback on the motion tokens.',
  },
  {
    icon: CheckCircle2,
    title: 'Checks passed',
    body: 'Typecheck and lint green on main.',
  },
  {
    icon: Zap,
    title: 'Usage spike',
    body: 'Docs traffic up 24% after the launch post.',
  },
] as const;

export function AnimatedListDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-8 py-6">
      <div className="flex w-full flex-col items-center gap-4">
        <p className="max-w-md text-center text-sm font-medium text-muted-foreground">
          Notification cards cycle in at the top on a spring — older entries fade as
          the stack grows. Pass `isPaused` to freeze the loop.
        </p>

        <AnimatedList interval={2800} className="w-full max-w-md">
          {NOTIFICATIONS.map((notification) => {
            const Icon = notification.icon;
            return (
              <AnimatedListItem key={notification.title} className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold text-foreground">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.body}</p>
                </div>
              </AnimatedListItem>
            );
          })}
        </AnimatedList>
      </div>

      <div className="flex w-full max-w-3xl flex-col gap-4">
        <h3 className="text-sm font-medium text-foreground">Comparing maxVisible &amp; isPaused</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-start gap-3 rounded-xl border border-border bg-card p-4">
            <ComparisonList maxVisible={2} />
            <span className="text-xs font-medium text-muted-foreground">maxVisible=2</span>
          </div>
          <div className="flex flex-col items-center justify-start gap-3 rounded-xl border border-border bg-card p-4">
            <ComparisonList maxVisible={4} />
            <span className="text-xs font-medium text-muted-foreground">maxVisible=4</span>
          </div>
          <div className="flex flex-col items-center justify-start gap-3 rounded-xl border border-border bg-card p-4">
            <ComparisonList maxVisible={4} isPaused />
            <span className="text-xs font-medium text-muted-foreground">isPaused=true</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const COMPARISON_ITEMS = [
  { icon: Bell, title: 'New deployment', body: 'Preview ready on staging.' },
  { icon: MessageSquare, title: 'Comment on PR #42', body: 'Alex left feedback.' },
  { icon: CheckCircle2, title: 'Checks passed', body: 'Typecheck and lint green.' },
  { icon: Zap, title: 'Usage spike', body: 'Docs traffic up 24%.' },
] as const;

function ComparisonList({
  maxVisible,
  isPaused,
}: {
  maxVisible?: number;
  isPaused?: boolean;
}) {
  return (
    <AnimatedList interval={2200} maxVisible={maxVisible} isPaused={isPaused} className="w-full">
      {COMPARISON_ITEMS.map((notification) => {
        const Icon = notification.icon;
        return (
          <AnimatedListItem key={notification.title} className="flex items-start gap-2.5 p-3">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Icon className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <p className="text-xs font-semibold text-foreground">{notification.title}</p>
              <p className="truncate text-xs text-muted-foreground">{notification.body}</p>
            </div>
          </AnimatedListItem>
        );
      })}
    </AnimatedList>
  );
}

export function AnimatedListPreviewCompact() {
  return (
    <AnimatedList interval={3200} className="w-full max-w-xs scale-95">
      <AnimatedListItem className="flex items-center gap-2 p-3">
        <Zap className="size-4 shrink-0 text-foreground" strokeWidth={1.5} aria-hidden="true" />
        <span className="truncate text-sm text-foreground">Live activity feed</span>
      </AnimatedListItem>
      <AnimatedListItem className="flex items-center gap-2 p-3">
        <Bell className="size-4 shrink-0 text-brand" strokeWidth={1.5} aria-hidden="true" />
        <span className="truncate text-sm text-foreground">New alert queued</span>
      </AnimatedListItem>
    </AnimatedList>
  );
}
