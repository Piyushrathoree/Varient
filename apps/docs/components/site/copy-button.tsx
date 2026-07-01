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
        'inline-flex items-center justify-center rounded-lg border border-border bg-bg-subtle p-1.5 text-text-tertiary transition-all duration-150',
        'hover:border-border-strong hover:text-text-primary',
        copied && 'border-success/50 text-success',
        className,
      )}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </button>
  );
}
