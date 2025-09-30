"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Invite } from "@/lib/generated/prisma/client";
import { CreateInviteDialog } from "./create-invite-dialog";
import { QRCodeDialog } from "./qr-code-dialog";
import { InvitesDataTable } from "./invites-data-table";
import StatsCard from "./stats-card";

interface StaffDashboardProps {
  initialInvites: Invite[];
}

export function StaffDashboard({
  initialInvites: invites,
}: StaffDashboardProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);

  const handleInviteCreated = () => {
    setCreateDialogOpen(false);
  };

  const handleGenerateQR = (invite: Invite) => {
    setSelectedInvite(invite);
    setQrDialogOpen(true);
  };

  const totalInvites = invites.length;
  const usedInvites = invites.filter(
    (invite) => invite.redeemedCount < 1
  ).length;
  const singleUseInvites = invites.filter(
    (invite) => invite.type === "SINGLE_USE"
  ).length;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header with Logout */}
      <div className="flex justify-between items-start">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif text-foreground">
            Wedding Invitation Manager
          </h1>
          <p className="text-muted-foreground text-lg">
            Create and manage QR code invitations for your special day
          </p>
        </div>
        <UserButton />
      </div>

      {/* Stats Cards */}
      <StatsCard
        singleUseInvites={singleUseInvites}
        totalInvites={totalInvites}
        usedInvites={usedInvites}
      />

      {/* Actions */}
      <div className="flex justify-center">
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create New Invite
        </Button>
      </div>

      {/* Invites List */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">
            Recent Invites
          </CardTitle>
          <CardDescription>
            Manage your wedding invitations and generate QR codes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invites.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No invites created yet. Create your first invite to get started.
            </div>
          ) : (
            <InvitesDataTable data={invites} onGenerateQR={handleGenerateQR} />
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateInviteDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onInviteCreated={handleInviteCreated}
      />

      <QRCodeDialog
        open={qrDialogOpen}
        onOpenChange={setQrDialogOpen}
        invite={selectedInvite}
      />
    </div>
  );
}
