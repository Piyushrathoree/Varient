'use client';

import type { ReactNode } from 'react';
import { Avatar, AvatarGroup, type AvatarSize, type AvatarStatus } from '@varient/ui';

const PLACEHOLDER_IMAGE = 'https://i.pravatar.cc/150?img=1';

const SIZES: { size: AvatarSize; label: string }[] = [
  { size: 'sm', label: 'Small' },
  { size: 'md', label: 'Medium' },
  { size: 'lg', label: 'Large' },
  { size: 'xl', label: 'Extra large' },
];

const STATUSES: { status: AvatarStatus; label: string }[] = [
  { status: 'online', label: 'Online' },
  { status: 'offline', label: 'Offline' },
  { status: 'away', label: 'Away' },
  { status: 'busy', label: 'Busy' },
];

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function AvatarDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SIZES.map(({ size, label }) => (
            <DemoCard key={size} label={label}>
              <Avatar
                size={size}
                src={PLACEHOLDER_IMAGE}
                alt="Alex Morgan"
                fallback="Alex Morgan"
                status="online"
              />
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Content</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoCard label="Image">
            <Avatar
              size="lg"
              src={PLACEHOLDER_IMAGE}
              alt="Alex Morgan"
              fallback="Alex Morgan"
            />
          </DemoCard>
          <DemoCard label="Initials fallback">
            <Avatar size="lg" fallback="Alex Morgan" />
          </DemoCard>
          <DemoCard label="Broken image fallback">
            <Avatar size="lg" src="https://example.invalid/avatar.png" fallback="Alex Morgan" />
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Status</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATUSES.map(({ status, label }) => (
            <DemoCard key={status} label={label}>
              <Avatar
                size="lg"
                src={`https://i.pravatar.cc/150?img=${status === 'online' ? 2 : status === 'offline' ? 3 : status === 'away' ? 4 : 5}`}
                alt="Team member"
                fallback="Team Member"
                status={status}
              />
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Avatar group</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoCard label="Overlapping stack">
            <AvatarGroup max={4} size="md">
              <Avatar src="https://i.pravatar.cc/150?img=11" alt="Member 1" fallback="Member 1" />
              <Avatar src="https://i.pravatar.cc/150?img=12" alt="Member 2" fallback="Member 2" />
              <Avatar src="https://i.pravatar.cc/150?img=13" alt="Member 3" fallback="Member 3" />
              <Avatar src="https://i.pravatar.cc/150?img=14" alt="Member 4" fallback="Member 4" />
              <Avatar src="https://i.pravatar.cc/150?img=15" alt="Member 5" fallback="Member 5" />
              <Avatar src="https://i.pravatar.cc/150?img=16" alt="Member 6" fallback="Member 6" />
            </AvatarGroup>
          </DemoCard>
          <DemoCard label="Compound API">
            <Avatar size="lg" status="online">
              <Avatar.Image src={PLACEHOLDER_IMAGE} alt="Alex Morgan" />
              <Avatar.Fallback>Alex Morgan</Avatar.Fallback>
            </Avatar>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function AvatarPreviewCompact() {
  return (
    <div className="flex items-center justify-center">
      <Avatar
        size="lg"
        src={PLACEHOLDER_IMAGE}
        alt="Alex Morgan"
        fallback="Alex Morgan"
        status="online"
      />
    </div>
  );
}
