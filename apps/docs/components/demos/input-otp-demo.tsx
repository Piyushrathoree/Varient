'use client';

import { useState, type ReactNode } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function SixDigitOTP({
  value,
  onChange,
  isDisabled = false,
  isInvalid = false,
}: {
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
}) {
  return (
    <InputOTP
      length={6}
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

export function InputOTPDemo() {
  const [code, setCode] = useState('');
  const [errorCode, setErrorCode] = useState('123');

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCard label="Default (6 digits)">
          <SixDigitOTP value={code} onChange={setCode} />
        </DemoCard>

        <DemoCard label="Disabled">
          <SixDigitOTP value="482910" onChange={() => undefined} isDisabled />
        </DemoCard>

        <DemoCard label="Invalid">
          <div className="flex flex-col items-center gap-2">
            <SixDigitOTP value={errorCode} onChange={setErrorCode} isInvalid />
            <p className="text-xs text-destructive">Code expired — request a new one.</p>
          </div>
        </DemoCard>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DemoCard label="4-digit PIN">
          <InputOTP length={4} value={code.slice(0, 4)} onChange={setCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </DemoCard>

        <DemoCard label="With completion callback">
          <InputOTP
            length={4}
            onComplete={(value) => console.log('Verified:', value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </DemoCard>
      </div>
    </div>
  );
}

export function InputOTPPreviewCompact() {
  const [value, setValue] = useState('');

  return (
    <InputOTP length={4} value={value} onChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}
