import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Invite } from "@/lib/generated/prisma/client";

type QrCodeDetailsProps = { invite: Invite };

const QrCodeDetails = ({ invite }: QrCodeDetailsProps) => {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Guest Name
            </span>
            <span className="text-sm text-muted-foreground">
              {invite.guestName}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Type</span>
            <Badge
              variant={invite.type === "UNLIMITED" ? "secondary" : "default"}
              className={
                invite.type === "UNLIMITED"
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary text-primary-foreground"
              }
            >
              {invite.type === "UNLIMITED" ? "Unlimited" : "Single Use"}
            </Badge>
          </div>
          {invite.phoneHash && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Phone</span>
              <span className="text-sm text-muted-foreground">
                {invite.phoneHash}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Status</span>
            <Badge
              variant={invite.redeemedCount < 1 ? "outline" : "secondary"}
              className={
                invite.redeemedCount < 1 ? "text-accent border-accent" : ""
              }
            >
              {invite.redeemedCount < 1 ? "Used" : "Active"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QrCodeDetails;
