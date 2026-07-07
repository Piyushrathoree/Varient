'use client';

import { useState, type ReactNode } from 'react';
import { Mail, Search, User } from 'lucide-react';
import { Input, type InputVariant } from '@varient/ui';

const VARIANTS: { variant: InputVariant; label: string }[] = [
  { variant: 'default', label: 'Default' },
  { variant: 'filled', label: 'Filled' },
  { variant: 'frame', label: 'Frame' },
];

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function InputDemo() {
  const [email, setEmail] = useState('');

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VARIANTS.map(({ variant, label }) => (
            <DemoCard key={variant} label={label}>
              <Input
                variant={variant}
                placeholder="you@example.com"
                leftAddon={<Mail className="size-4" strokeWidth={1.75} />}
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
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              helperText="We'll never share your email."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
              className="w-full"
            />
          </DemoCard>

          <DemoCard label="Error">
            <Input
              label="Username"
              placeholder="johndoe"
              errorText="Username is already taken."
              defaultValue="johndoe"
              className="w-full"
            />
          </DemoCard>

          <DemoCard label="Disabled">
            <Input
              label="Disabled"
              placeholder="Not editable"
              isDisabled
              defaultValue="Disabled value"
              className="w-full"
            />
          </DemoCard>

          <DemoCard label="Left icon addon">
            <Input
              placeholder="Search components..."
              leftAddon={<Search className="size-4" strokeWidth={1.75} />}
              className="w-full"
            />
          </DemoCard>

          <DemoCard label="Left + right addon">
            <Input
              placeholder="username"
              leftAddon={<User className="size-4" strokeWidth={1.75} />}
              rightAddon={<span className="pr-0.5 text-xs">@site.com</span>}
              className="w-full"
            />
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DemoCard label="Small">
            <Input size="sm" placeholder="Small" className="w-full" />
          </DemoCard>
          <DemoCard label="Medium">
            <Input size="md" placeholder="Medium" className="w-full" />
          </DemoCard>
          <DemoCard label="Large">
            <Input size="lg" placeholder="Large" className="w-full" />
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function InputPreviewCompact() {
  return (
    <div className="w-full max-w-xs">
      <Input
        placeholder="Enter your email"
        leftAddon={<Mail className="size-4" strokeWidth={1.75} />}
        size="sm"
      />
    </div>
  );
}
