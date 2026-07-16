'use client';

import { useState } from 'react';
import { CreditCard, Keyboard, LogOut, Settings, User } from 'lucide-react';
import { Button, DropdownMenu } from '@varient/ui';

export function DropdownMenuDemo() {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showUrls, setShowUrls] = useState(false);
  const [fontSize, setFontSize] = useState('medium');

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline" size="sm" className="size-9 p-0" aria-label="View settings">
              <Settings className="size-4" strokeWidth={1.75} />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>View</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.CheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
              Show bookmarks bar
              <DropdownMenu.Shortcut>⌘⇧B</DropdownMenu.Shortcut>
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem checked={showUrls} onCheckedChange={setShowUrls}>
              Show full URLs
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.Separator />
            <DropdownMenu.Label>Font size</DropdownMenu.Label>
            <DropdownMenu.RadioGroup value={fontSize} onValueChange={setFontSize}>
              <DropdownMenu.RadioItem value="small">Small</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="medium">Medium</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="large">Large</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu>
        <span className="text-xs font-medium text-muted-foreground">Settings menu</span>
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
