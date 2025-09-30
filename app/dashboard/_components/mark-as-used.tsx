"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { markInviteAsUsed } from "@/actions/mark-invite";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const MarkAsUsed = ({ inviteId }: { inviteId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleMarkAsUsed = async () => {
    startTransition(async () => {
      try {
        const response = await markInviteAsUsed({ inviteId });

        if (response.success) {
          toast.success(
            response?.data?.message || "Invite marked as used successfully"
          );
        } else {
          toast.error(response.error || "Failed to mark invite as used");
        }
      } catch (error) {
        toast.error("Failed to mark invite as used:");
        console.error("Failed to mark invite as used:", error);
      }
    });
  };
  return (
    <DropdownMenuItem
      onClick={() => handleMarkAsUsed()}
      className="flex items-center gap-2"
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <CheckCircle className="h-4 w-4" />
      )}
      {isPending ? "Marking..." : "Mark as Used"}
    </DropdownMenuItem>
  );
};

export default MarkAsUsed;
