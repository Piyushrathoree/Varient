'use client';

import { useState } from 'react';
import { Mail, Search } from 'lucide-react';
import { Input } from '@varient/ui';

export function InputDemo() {
  const [email, setEmail] = useState('');

  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-5">
        <p className="text-sm font-medium text-muted-foreground">Basic</p>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          helperText="We'll never share your email."
          leftAddon={<Mail className="size-4" strokeWidth={1.75} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isRequired
        />
        <Input
          label="Search"
          placeholder="Search components..."
          leftAddon={<Search className="size-4" strokeWidth={1.75} />}
          size="sm"
        />
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-sm font-medium text-muted-foreground">Frame variant</p>
        <Input
          label="Email (frame)"
          type="email"
          placeholder="you@example.com"
          helperText="Gradient-frame variant — focus to see the glow."
          leftAddon={<Mail className="size-4" strokeWidth={1.75} />}
          variant="frame"
        />
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-sm font-medium text-muted-foreground">States</p>
        <Input
          label="Username"
          placeholder="johndoe"
          errorText="Username is already taken."
          defaultValue="johndoe"
        />
        <Input
          label="Disabled"
          placeholder="Not editable"
          isDisabled
          defaultValue="Disabled value"
        />
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
