"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Invite } from "@/lib/generated/prisma/client";
import InviteUpdateForm from "./invite-update-form";

interface UpdateInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInviteUpdated: () => void;
  defaultValues: Invite;
}

export function UpdateInviteDialog({
  open,
  onOpenChange,
  onInviteUpdated,
  defaultValues,
}: UpdateInviteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-foreground">
            Update Invitation for {defaultValues.guestName}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update the invitation for guest or group in your wedding invitation
            list
          </DialogDescription>
        </DialogHeader>

        <InviteUpdateForm
          postAction={onInviteUpdated}
          defaultValues={{
            ...defaultValues,
            phoneHash: defaultValues.phoneHash ?? undefined,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
