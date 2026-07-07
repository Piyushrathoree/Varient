'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button, Dialog, Input } from '@varient/ui';

export function DialogDemo() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Edit profile</p>
        <Dialog isOpen={isEditOpen} onOpenChange={setIsEditOpen}>
          <Dialog.Trigger asChild>
            <Button variant="outline" leftIcon={<Pencil className="size-4" strokeWidth={1.75} />}>
              Edit profile
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit profile</Dialog.Title>
              <Dialog.Description>
                Make changes to your profile here. Click save when you&apos;re done.
              </Dialog.Description>
            </Dialog.Header>

            <div className="flex flex-col gap-4">
              <Input label="Name" defaultValue="Ava Whitfield" />
              <Input label="Handle" defaultValue="ava" leftAddon="@" />
            </div>

            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Button variant="primary" onClick={() => setIsEditOpen(false)}>
                Save changes
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Destructive confirm</p>
        <Dialog isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <Dialog.Trigger asChild>
            <Button
              variant="destructive"
              leftIcon={<Trash2 className="size-4" strokeWidth={1.75} />}
            >
              Delete account
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete account</Dialog.Title>
              <Dialog.Description>
                This permanently deletes your account and all associated data. This action
                cannot be undone.
              </Dialog.Description>
            </Dialog.Header>

            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Button variant="destructive" onClick={() => setIsDeleteOpen(false)}>
                Delete account
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </div>
    </div>
  );
}

export function DialogPreviewCompact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open dialog
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>Make changes to your profile here.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </Dialog.Close>
          <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
            Save
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
