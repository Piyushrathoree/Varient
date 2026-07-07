'use client';

import { AlertTriangle, Check, Sparkles } from 'lucide-react';
import { Badge } from '@varient/ui';

export function BadgeDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge appearance="soft">Default</Badge>
            <Badge appearance="soft" variant="primary">
              Primary
            </Badge>
            <Badge appearance="soft" variant="secondary">
              Secondary
            </Badge>
            <Badge appearance="soft" variant="success">
              Success
            </Badge>
            <Badge appearance="soft" variant="warning">
              Warning
            </Badge>
            <Badge appearance="soft" variant="danger">
              Danger
            </Badge>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Soft — tinted wash (default)
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge appearance="solid">Default</Badge>
            <Badge appearance="solid" variant="primary">
              Primary
            </Badge>
            <Badge appearance="solid" variant="secondary">
              Secondary
            </Badge>
            <Badge appearance="solid" variant="success">
              Success
            </Badge>
            <Badge appearance="solid" variant="warning">
              Warning
            </Badge>
            <Badge appearance="solid" variant="danger">
              Danger
            </Badge>
          </div>
          <span className="text-xs font-medium text-muted-foreground">Solid — filled</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* variant="outline" alone is the pre-existing shortcut — it still
                resolves to this same appearance with no color of its own. */}
            <Badge variant="outline">Outline</Badge>
            <Badge appearance="outline" variant="primary">
              Primary
            </Badge>
            <Badge appearance="outline" variant="secondary">
              Secondary
            </Badge>
            <Badge appearance="outline" variant="success">
              Success
            </Badge>
            <Badge appearance="outline" variant="warning">
              Warning
            </Badge>
            <Badge appearance="outline" variant="danger">
              Danger
            </Badge>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Outline — hairline border
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge appearance="dot">Idle</Badge>
            <Badge appearance="dot" variant="primary">
              Building
            </Badge>
            <Badge appearance="dot" variant="secondary">
              Queued
            </Badge>
            <Badge appearance="dot" variant="success">
              Online
            </Badge>
            <Badge appearance="dot" variant="warning">
              Degraded
            </Badge>
            <Badge appearance="dot" variant="danger">
              Failed
            </Badge>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Dot — leading status marker
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-end justify-center gap-2.5">
            <Badge size="sm" variant="primary">
              Small
            </Badge>
            <Badge size="md" variant="primary">
              Medium
            </Badge>
            <Badge size="lg" variant="primary">
              Large
            </Badge>
          </div>
          <span className="text-xs font-medium text-muted-foreground">Sizes</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="primary" icon={<Sparkles className="size-3" strokeWidth={1.75} />}>
              New
            </Badge>
            <Badge
              appearance="solid"
              variant="success"
              icon={<Check className="size-3" strokeWidth={1.75} />}
            >
              Verified
            </Badge>
            <Badge
              appearance="dot"
              variant="danger"
              icon={<AlertTriangle className="size-3" strokeWidth={1.75} />}
            >
              Attention
            </Badge>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            With icon (composes with any appearance)
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 sm:col-span-2">
          <div className="flex flex-col items-center gap-2.5">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge shape="pill" variant="primary">
                Pill
              </Badge>
              <Badge shape="pill" variant="success">
                Pill
              </Badge>
              <Badge shape="pill" appearance="outline" variant="danger">
                Pill
              </Badge>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge shape="square" variant="primary">
                Square
              </Badge>
              <Badge shape="square" variant="success">
                Square
              </Badge>
              <Badge shape="square" appearance="outline" variant="danger">
                Square
              </Badge>
            </div>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Squared vs pill
          </span>
        </div>
      </div>
    </div>
  );
}

export function BadgePreviewCompact() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="primary">New</Badge>
      <Badge appearance="dot" variant="success">
        Online
      </Badge>
      <Badge appearance="solid" variant="danger">
        3
      </Badge>
    </div>
  );
}
