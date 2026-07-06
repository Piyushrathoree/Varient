'use client';

import { Check, Sparkles } from 'lucide-react';
import { Badge } from '@varient/ui';

export function BadgeDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">With icon</p>
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="primary">
            <Sparkles className="size-3" strokeWidth={1.75} />
            New
          </Badge>
          <Badge variant="success">
            <Check className="size-3" strokeWidth={1.75} />
            Verified
          </Badge>
        </div>
      </div>
    </div>
  );
}

export function BadgePreviewCompact() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="primary">New</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  );
}
