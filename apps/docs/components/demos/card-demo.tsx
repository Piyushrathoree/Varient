'use client';

import { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Badge, Button, Card, cn } from '@varient/ui';

export function CardDemo() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="grid w-full gap-5 sm:grid-cols-2">
        <Card isHoverable>
          <Card.Header>
            <div className="flex items-center justify-between gap-2">
              <Card.Title>Pro plan</Card.Title>
              <Badge variant="primary">
                <Sparkles className="size-3" strokeWidth={1.75} />
                Popular
              </Badge>
            </div>
            <Card.Description>
              Everything in Free, plus the full animated layer and priority support.
            </Card.Description>
          </Card.Header>
          <Card.Footer>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="size-4" strokeWidth={1.75} />}
            >
              Upgrade
            </Button>
            <Button variant="ghost" size="sm">
              Compare
            </Button>
          </Card.Footer>
        </Card>

        {/* Keyboard-activatable — Enter/Space or click toggles selection. */}
        <Card
          variant="outline"
          isClickable
          onClick={() => setIsSelected((prev) => !prev)}
          className={cn(isSelected && 'border-brand/60 ring-2 ring-brand/15')}
        >
          <Card.Header>
            <div className="flex items-center justify-between gap-2">
              <Card.Title>Selectable</Card.Title>
              {isSelected && <Check className="size-4 text-brand" strokeWidth={1.75} />}
            </div>
            <Card.Description>
              Tab to focus, press Enter or Space, or click — the whole surface is the target.
            </Card.Description>
          </Card.Header>
        </Card>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Ghost</p>
        <Card variant="ghost">
          <Card.Body>
            <p className="text-sm leading-relaxed text-muted-foreground">
              No border, no fill — for content that should sit flush with the page.
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export function CardPreviewCompact() {
  return (
    <Card className="w-full max-w-[220px]" isHoverable>
      <Card.Header>
        <Card.Title>Card</Card.Title>
        <Card.Description>Grouped content and actions.</Card.Description>
      </Card.Header>
    </Card>
  );
}
