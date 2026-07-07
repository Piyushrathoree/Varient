'use client';

import { CheckCircle, X } from 'lucide-react';
import { ToastProvider, useToast, Button } from '@varient/ui';

function ToastButtons() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: 'Update available',
            description: 'A new version is ready to install.',
          })
        }
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success('Changes saved', { description: 'Your profile has been updated.' })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error('Something went wrong', { description: 'Could not reach the server.' })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning('Storage almost full', { description: '90% of your quota is used.' })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: 'Message archived',
            description: 'You can undo this within a few seconds.',
            action: {
              label: 'Undo',
              onClick: () => toast.success('Message restored'),
            },
          })
        }
      >
        With action
      </Button>
    </div>
  );
}

export function ToastDemo() {
  return (
    <ToastProvider>
      <ToastButtons />
    </ToastProvider>
  );
}

// Static visual only — no ToastProvider/portal — so it lays out inline
// inside the gallery's card frame instead of escaping to document.body.
export function ToastPreviewCompact() {
  return (
    <div className="flex w-full max-w-[356px] items-start gap-3 rounded-xl border border-border bg-popover p-4 shadow-xl">
      <CheckCircle className="mt-0.5 size-5 shrink-0 text-emerald-500" strokeWidth={2} />
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-medium text-popover-foreground">Changes saved</p>
        <p className="text-sm text-muted-foreground">Your profile has been updated.</p>
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        className="shrink-0 rounded-md p-1 text-muted-foreground"
      >
        <X className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
}
