'use client';

import { type ReactNode } from 'react';
import { AuthPage, type AuthPageFormData } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-border bg-card">
      {children}
      <span className="px-4 pb-4 text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function AuthPageDemo() {
  const handleSubmit = async (_data: AuthPageFormData) => {
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 600);
    });
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <DemoCard label="Login">
            <div className="w-full overflow-hidden rounded-t-xl border-b border-border">
              <AuthPage
                className="min-h-[36rem]"
                onSubmit={handleSubmit}
                variant="login"
              />
            </div>
          </DemoCard>
          <DemoCard label="Signup">
            <div className="w-full overflow-hidden rounded-t-xl border-b border-border">
              <AuthPage
                className="min-h-[36rem]"
                onSubmit={handleSubmit}
                variant="signup"
              />
            </div>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function AuthPagePreviewCompact() {
  return (
    <div className="w-full max-w-xs [&_form>*:nth-child(4)]:hidden [&_form>*:nth-last-child(-n+2)]:hidden">
      <AuthPage
        className="min-h-0 [&>div:first-child]:px-0 [&>div:first-child]:py-0 [&_.mb-8]:mb-4 [&_form]:gap-3 [&_h1]:text-lg [&_p]:text-xs"
        description="Access your workspace."
        headline="Sign in"
        variant="login"
      />
    </div>
  );
}
