'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { Paperclip, X } from 'lucide-react';
import { PromptInput, KbdGroup } from '@varient/ui';

function DemoCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-stretch justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-center text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function ModelChip() {
  return (
    <span className="inline-flex h-7 shrink-0 items-center gap-1 rounded-full bg-muted px-2.5 text-xs font-medium text-muted-foreground">
      GPT-5
    </span>
  );
}

function AttachmentChip({ name, onRemove }: { name: string; onRemove: () => void }) {
  return (
    <span className="inline-flex h-7 shrink-0 max-w-[9rem] items-center gap-1 rounded-full bg-muted pl-2 pr-1 text-xs font-medium text-foreground">
      <span className="truncate">{name}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${name}`}
        className="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
      >
        <X className="size-3" aria-hidden />
      </button>
    </span>
  );
}

function DefaultExample() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState<string[]>([]);

  return (
    <div className="flex w-full flex-col gap-2">
      <PromptInput
        value={value}
        onValueChange={setValue}
        onSubmit={(text) => {
          setSubmitted((prev) => [...prev, text]);
          setValue('');
        }}
        placeholder="Message..."
        aria-label="Message"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <span className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <KbdGroup keys={['Enter']} size="sm" /> to send
          <KbdGroup keys={['Shift', 'Enter']} size="sm" /> for a new line
        </span>
        {submitted.length > 0 && (
          <span className="text-xs text-muted-foreground">{submitted.length} sent</span>
        )}
      </div>
    </div>
  );
}

function SlotsExample() {
  const [value, setValue] = useState('');
  const [attachments, setAttachments] = useState(['brief.pdf', 'logo.png']);
  const idRef = useRef(0);

  return (
    <PromptInput
      value={value}
      onValueChange={setValue}
      onSubmit={() => setValue('')}
      placeholder="Ask about the attached files..."
      aria-label="Message with attachments"
      leftSlot={
        <>
          <button
            type="button"
            aria-label="Attach file"
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={() =>
              setAttachments((prev) => [...prev, `file-${(idRef.current += 1)}.txt`])
            }
          >
            <Paperclip className="size-4" aria-hidden />
          </button>
          {attachments.map((name) => (
            <AttachmentChip
              key={name}
              name={name}
              onRemove={() =>
                setAttachments((prev) => prev.filter((attachment) => attachment !== name))
              }
            />
          ))}
        </>
      }
      rightSlot={<ModelChip />}
    />
  );
}

function LoadingExample() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <PromptInput
      value=""
      onValueChange={() => {}}
      onSubmit={() => {}}
      isLoading={isLoading}
      onStop={() => setIsLoading(false)}
      placeholder="Generating a response..."
      aria-label="Message (generating)"
    />
  );
}

export function PromptInputDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Default</p>
        <div className="grid grid-cols-1 gap-4">
          <DemoCard label="Controlled value, Enter to submit">
            <DefaultExample />
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Slots &amp; states</p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DemoCard label="Attachment chips + model chip">
            <SlotsExample />
          </DemoCard>

          <DemoCard label="Loading, with stop button">
            <LoadingExample />
          </DemoCard>

          <DemoCard label="Disabled">
            <PromptInput
              defaultValue=""
              onSubmit={() => {}}
              isDisabled
              placeholder="Sign in to send a message"
              aria-label="Message (disabled)"
            />
          </DemoCard>

          <DemoCard label="Pre-filled, ready to submit">
            <PromptInput
              defaultValue="Summarize the attached quarterly report in three bullet points."
              onSubmit={() => {}}
              placeholder="Message..."
              aria-label="Message"
            />
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function PromptInputPreviewCompact() {
  const [value, setValue] = useState('');
  const submit = useCallback(() => setValue(''), []);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-[280px]">
        <PromptInput
          value={value}
          onValueChange={setValue}
          onSubmit={submit}
          placeholder="Ask anything..."
          aria-label="Message"
          rightSlot={<ModelChip />}
        />
      </div>
    </div>
  );
}
