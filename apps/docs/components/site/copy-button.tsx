'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@varient/ui';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-border bg-background p-1.5 text-muted-foreground transition-all duration-150',
        'hover:bg-muted hover:text-foreground',
        copied && 'border-emerald-500/50 text-emerald-500',
        className,
      )}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      <span aria-live="polite" className="sr-only">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}
