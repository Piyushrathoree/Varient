'use client';

import { useState } from 'react';
import { LogOut, Trash2 } from 'lucide-react';
import { AlertDialog, Button } from '@varient/ui';

export function AlertDialogDemo() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <AlertDialog isOpen={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
          <AlertDialog.Trigger asChild>
            <Button
              variant="outline"
              leftIcon={<LogOut className="size-4" strokeWidth={1.75} />}
            >
              Sign out
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Sign out?</AlertDialog.Title>
            <AlertDialog.Description>
              You will need to sign in again to access your account.
            </AlertDialog.Description>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
              <AlertDialog.Action onClick={() => setIsLogoutOpen(false)}>
                Sign out
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog>
        <span className="text-xs font-medium text-muted-foreground">Default confirm</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <AlertDialog isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialog.Trigger asChild>
            <Button
              variant="destructive"
              leftIcon={<Trash2 className="size-4" strokeWidth={1.75} />}
            >
              Delete project
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Delete project?</AlertDialog.Title>
            <AlertDialog.Description>
              This permanently deletes the project and all associated data. This action
              cannot be undone.
            </AlertDialog.Description>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
              <AlertDialog.Action
                variant="destructive"
                onClick={() => setIsDeleteOpen(false)}
              >
                Delete project
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog>
        <span className="text-xs font-medium text-muted-foreground">Destructive action</span>
      </div>
    </div>
  );
}

export function AlertDialogPreviewCompact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Confirm
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Are you sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone.
        </AlertDialog.Description>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => setIsOpen(false)}>Continue</AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog>
    </div>
  );
}
