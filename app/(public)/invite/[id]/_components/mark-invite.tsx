"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { markInviteAsUsed } from "@/actions/invites/mark-invite";
import { Button } from "@/components/ui/button";

type MarkInviteProps = { inviteId: string };

const MarkInvite = ({ inviteId }: MarkInviteProps) => {
  const [markUsedPending, startMarkUsedTransition] = useTransition();

  const handleMarkAsUsed = () => {
    startMarkUsedTransition(async () => {
      const result = await markInviteAsUsed({ inviteId });

      if (result.success) {
        toast.success("Thank you for confirming your attendance!");
      } else {
        toast.error(result.error || "Failed to confirm attendance");
      }
    });
  };

  return (
    <div className="space-y-2">
      <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
        This invitation can only be used once. Click below to confirm guest
        attendance.
      </p>
      <Button
        onClick={handleMarkAsUsed}
        disabled={markUsedPending}
        variant="outline"
        size="sm"
        className="w-full bg-transparent"
        style={{
          borderColor: "var(--color-primary)",
          color: "var(--color-primary)",
          backgroundColor: "transparent",
        }}
      >
        {markUsedPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Confirming...
          </>
        ) : (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            Confirm Attendance
          </>
        )}
      </Button>
    </div>
  );
};

export default MarkInvite;
