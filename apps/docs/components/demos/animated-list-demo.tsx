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
    <div className="flex w-full flex-col items-center gap-4 py-6">
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
