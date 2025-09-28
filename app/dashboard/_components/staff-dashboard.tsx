"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  QrCode,
  Users,
  Calendar,
  CheckCircle,
  LogOut,
} from "lucide-react";
import { Invite } from "@/lib/generated/prisma/client";
import { CreateInviteDialog } from "./create-invite-dialog";
import { QRCodeDialog } from "./qr-code-dialog";

interface StaffDashboardProps {
  initialInvites: Invite[];
}

export function StaffDashboard({ initialInvites }: StaffDashboardProps) {
  const [invites, setInvites] = useState<Invite[]>(initialInvites);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    router.push("/login");
  };

  const handleInviteCreated = (newInvite: Invite) => {
    setInvites((prev) => [newInvite, ...prev]);
    setCreateDialogOpen(false);
  };

  const handleGenerateQR = (invite: Invite) => {
    setSelectedInvite(invite);
    setQrDialogOpen(true);
  };

  const handleMarkAsUsed = async (inviteId: string) => {
    try {
      const response = await fetch("/api/invites/mark-used", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteId }),
      });

      if (response.ok) {
        const updatedInvite = await response.json();
        setInvites((prev) =>
          prev.map((invite) =>
            invite.id === inviteId ? updatedInvite : invite
          )
        );
      }
    } catch (error) {
      console.error("Failed to mark invite as used:", error);
    }
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
        <Button
          variant="outline"
          onClick={handleLogout}
          className="border-border/50 text-muted-foreground hover:text-foreground bg-transparent"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Invites
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {totalInvites}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Used Invites
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {usedInvites}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Single Use
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {singleUseInvites}
            </div>
          </CardContent>
        </Card>
      </div>

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
          <div className="space-y-4">
            {invites.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No invites created yet. Create your first invite to get started.
              </div>
            ) : (
              invites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-card/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-foreground">
                        {invite.guestName}
                      </h3>
                      <Badge
                        variant={
                          invite.type === "UNLIMITED" ? "secondary" : "default"
                        }
                        className={
                          invite.type === "UNLIMITED"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-primary text-primary-foreground"
                        }
                      >
                        {invite.type === "UNLIMITED"
                          ? "Unlimited"
                          : "Single Use"}
                      </Badge>
                      {invite.redeemedCount < 1 && (
                        <Badge
                          variant="outline"
                          className="text-accent border-accent"
                        >
                          Used
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Created {new Date(invite.createdAt).toLocaleDateString()}
                      {invite.phoneHash && (
                        <span className="ml-2">• {invite.phoneHash}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGenerateQR(invite)}
                      className="border-primary/20 text-primary hover:bg-primary/10"
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      QR Code
                    </Button>

                    {invite.type === "SINGLE_USE" &&
                      invite.redeemedCount > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsUsed(invite.id)}
                          className="border-accent/20 text-accent hover:bg-accent/10"
                        >
                          Mark Used
                        </Button>
                      )}
                  </div>
                </div>
              ))
            )}
          </div>
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
