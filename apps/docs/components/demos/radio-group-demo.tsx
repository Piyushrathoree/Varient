'use client';

import { useState } from 'react';
import { RadioGroup } from '@varient/ui';

interface Plan {
  value: string;
  name: string;
  price: string;
  description: string;
}

const PLANS: Plan[] = [
  { value: 'free', name: 'Free', price: '$0', description: 'Core components, community support.' },
  {
    value: 'pro',
    name: 'Pro',
    price: '$19/mo',
    description: 'Full animated layer, priority support.',
  },
  {
    value: 'team',
    name: 'Team',
    price: '$49/mo',
    description: 'Everything in Pro, plus seat management.',
  },
];

// Disabled rows still need a stable onChange reference — the group is still
// fully controlled when disabled even though onChange can never fire.
function noop() {}

export function RadioGroupDemo() {
  const [plan, setPlan] = useState('pro');
  const [size, setSize] = useState('md');
  const [fruit, setFruit] = useState('apple');

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Card variant — plan picker</p>
        <div className="rounded-xl border border-border bg-card p-6">
          <RadioGroup value={plan} onChange={setPlan}>
            {PLANS.map((item) => (
              <RadioGroup.Item
                key={item.value}
                variant="card"
                value={item.value}
                label={item.name}
                description={`${item.price} — ${item.description}`}
              />
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-6">
          <RadioGroup value={size} onChange={setSize}>
            <RadioGroup.Item value="sm" label="Small" />
            <RadioGroup.Item value="md" label="Medium" />
            <RadioGroup.Item value="lg" label="Large" />
          </RadioGroup>
          <span className="text-xs font-medium text-muted-foreground">Vertical (default)</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-6">
          <RadioGroup value={fruit} onChange={setFruit} orientation="horizontal">
            <RadioGroup.Item value="apple" label="Apple" />
            <RadioGroup.Item value="pear" label="Pear" />
          </RadioGroup>
          <span className="text-xs font-medium text-muted-foreground">Horizontal</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-6">
          <RadioGroup value="a" onChange={noop} isDisabled>
            <RadioGroup.Item value="a" label="Option A" />
            <RadioGroup.Item value="b" label="Option B" />
          </RadioGroup>
          <span className="text-xs font-medium text-muted-foreground">Disabled</span>
        </div>
      </div>
    </div>
  );
}

export function RadioGroupPreviewCompact() {
  const [value, setValue] = useState('pro');
  return (
    <RadioGroup value={value} onChange={setValue} orientation="horizontal">
      <RadioGroup.Item value="free" label="Free" />
      <RadioGroup.Item value="pro" label="Pro" />
    </RadioGroup>
  );
}
