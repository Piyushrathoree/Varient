'use client';

import { useState } from 'react';
import { ArrowRight, Send, Sparkles } from 'lucide-react';
import { Button } from '@varient/ui';

export function ButtonDemo() {
  const [isLoading, setIsLoading] = useState(false);

  function handleLoadingDemo() {
    setIsLoading(true);
    window.setTimeout(() => setIsLoading(false), 1500);
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            rightIcon={<ArrowRight className="size-4" strokeWidth={1.75} />}
          >
            Primary
          </Button>
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Signature</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="sweep" leftIcon={<Send className="size-4" strokeWidth={1.75} />}>
            Sweep
          </Button>
          <Button variant="frame" rightIcon={<ArrowRight className="size-4" strokeWidth={1.75} />}>
            Frame
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra large</Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">States</p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            isLoading={isLoading}
            onClick={handleLoadingDemo}
            leftIcon={<Sparkles className="size-4" strokeWidth={1.75} />}
          >
            Click to load
          </Button>
          <Button variant="outline" isDisabled>
            Disabled
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ButtonPreviewCompact() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="primary" size="sm">
        Primary
      </Button>
      <Button variant="outline" size="sm">
        Outline
      </Button>
      <Button variant="ghost" size="sm">
        Ghost
      </Button>
    </div>
  );
}
