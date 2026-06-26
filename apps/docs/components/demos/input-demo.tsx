'use client';

import { useState } from 'react';
import { Mail, Search } from 'lucide-react';
import { Input } from '@varient/ui';

export function InputDemo() {
  const [email, setEmail] = useState('');

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        helperText="We'll never share your email."
        leftAddon={<Mail className="size-4" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isRequired
      />

      <Input
        label="Search"
        placeholder="Search components..."
        leftAddon={<Search className="size-4" />}
        size="sm"
      />

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
  );
}

export function InputPreviewCompact() {
  return (
    <div className="w-full max-w-xs">
      <Input
        placeholder="Enter your email"
        leftAddon={<Mail className="size-4" />}
        size="sm"
      />
    </div>
  );
}
