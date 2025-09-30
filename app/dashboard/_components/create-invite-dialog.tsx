"use client";

import type React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InviteForm from "./invite-form";

interface CreateInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInviteCreated: () => void;
}

export function CreateInviteDialog({
  open,
  onOpenChange,
  onInviteCreated,
}: CreateInviteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-foreground">
            Create New Invitation
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new guest or group to your wedding invitation list
          </DialogDescription>
        </DialogHeader>

        <InviteForm postAction={onInviteCreated} />
      </DialogContent>
    </Dialog>
  );
}
