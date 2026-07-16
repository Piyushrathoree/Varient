'use client';

import { type ReactNode } from 'react';
import { KeyRound } from 'lucide-react';
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

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">
          Content API — custom copy, SSO slot &amp; loading/success labels
        </p>
        <div className="grid grid-cols-1">
          <DemoCard label="Custom headline, generic SSO provider, and submit-state labels">
            <div className="w-full overflow-hidden rounded-t-xl border-b border-border">
              <AuthPage
                className="min-h-[36rem]"
                description="Sign in with your work email or single sign-on."
                forgotPasswordLabel="Trouble signing in?"
                headline="Welcome to Northline"
                loadingLabel="Verifying…"
                onSocialAuth={(provider) => console.log('social auth:', provider)}
                onSubmit={handleSubmit}
                socialProviders={[
                  {
                    id: 'sso',
                    label: 'SSO',
                    icon: <KeyRound className="size-4" />,
                  },
                ]}
                successLabel="You're in!"
                variant="login"
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
    <div className="h-40 w-full overflow-hidden bg-background">
      <div className="origin-top-left scale-[0.42] [width:238%]">
        <AuthPage
          className="min-h-0"
          description="Access your workspace."
          headline="Sign in"
          variant="login"
        />
      </div>
    </div>
  );
}
