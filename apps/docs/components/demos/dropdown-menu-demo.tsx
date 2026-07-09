'use client';

import { CreditCard, Keyboard, LogOut, Settings, User } from 'lucide-react';
import { Button, DropdownMenu } from '@varient/ui';

export function DropdownMenuDemo() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline">Account</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>My account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <DropdownMenu.Item icon={<User className="size-4" strokeWidth={1.75} />}>
                Profile
                <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
              <DropdownMenu.Item icon={<CreditCard className="size-4" strokeWidth={1.75} />}>
                Billing
                <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
              <DropdownMenu.Item icon={<Settings className="size-4" strokeWidth={1.75} />}>
                Settings
                <DropdownMenu.Shortcut>⌘,</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
              <DropdownMenu.Item icon={<Keyboard className="size-4" strokeWidth={1.75} />}>
                Keyboard shortcuts
                <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              variant="destructive"
              icon={<LogOut className="size-4" strokeWidth={1.75} />}
            >
              Log out
              <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
        <span className="text-xs font-medium text-muted-foreground">Account menu</span>
      </div>
    </div>
  );
}

export function DropdownMenuPreviewCompact() {
  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" size="sm">
            Open menu
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item icon={<User className="size-4" strokeWidth={1.75} />}>
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item icon={<Settings className="size-4" strokeWidth={1.75} />}>
            Settings
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item variant="destructive" icon={<LogOut className="size-4" strokeWidth={1.75} />}>
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}
