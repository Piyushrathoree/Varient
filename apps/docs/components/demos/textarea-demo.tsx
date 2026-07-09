'use client';

import { useState, type ReactNode } from 'react';
import { Textarea, type TextareaResize, type TextareaVariant } from '@varient/ui';

const VARIANTS: { variant: TextareaVariant; label: string }[] = [
  { variant: 'default', label: 'Default' },
  { variant: 'filled', label: 'Filled' },
];

const RESIZE_OPTIONS: { resize: TextareaResize; label: string }[] = [
  { resize: 'none', label: 'None' },
  { resize: 'vertical', label: 'Vertical' },
  { resize: 'both', label: 'Both' },
];

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function TextareaDemo() {
  const [bio, setBio] = useState('');

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VARIANTS.map(({ variant, label }) => (
            <DemoCard key={variant} label={label}>
              <Textarea
                variant={variant}
                placeholder="Write something..."
                className="w-full"
              />
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">States</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoCard label="With label + helper">
            <Textarea
              label="Bio"
              placeholder="Tell us about yourself"
              helperText="Keep it under 280 characters."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              isRequired
              className="w-full"
            />
          </DemoCard>

          <DemoCard label="Error">
            <Textarea
              label="Description"
              placeholder="Describe your project"
              errorText="Description must be at least 20 characters."
              defaultValue="Too short"
              className="w-full"
            />
          </DemoCard>

          <DemoCard label="Disabled">
            <Textarea
              label="Notes"
              placeholder="Not editable"
              isDisabled
              defaultValue="This field is disabled."
              className="w-full"
            />
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Resize</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESIZE_OPTIONS.map(({ resize, label }) => (
            <DemoCard key={resize} label={label}>
              <Textarea
                resize={resize}
                placeholder="Drag the corner to resize"
                defaultValue="Multiline content that can grow with the handle."
                className="w-full"
              />
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DemoCard label="Small">
            <Textarea size="sm" placeholder="Small textarea" className="w-full" />
          </DemoCard>
          <DemoCard label="Medium">
            <Textarea size="md" placeholder="Medium textarea" className="w-full" />
          </DemoCard>
          <DemoCard label="Large">
            <Textarea size="lg" placeholder="Large textarea" className="w-full" />
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function TextareaPreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-[220px]">
        <Textarea
          placeholder="Write a message..."
          size="sm"
          rows={3}
          resize="none"
        />
      </div>
    </div>
  );
}
