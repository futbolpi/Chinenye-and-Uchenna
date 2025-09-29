"use client";

import { useState, useEffect } from "react";
import { Download, Copy, Check, QrCode } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Invite } from "@/lib/generated/prisma/client";
// import QrCodeDetails from "./qr-code-details";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invite: Invite | null;
}

export function QRCodeDialog({
  open,
  onOpenChange,
  invite,
}: QRCodeDialogProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open && invite) {
      generateQRCode();
    }
  }, [open, invite]);

  const generateQRCode = async () => {
    if (!invite) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/qr-code/${invite.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setQrCodeUrl(url);
      }
    } catch (error) {
      console.error("Failed to generate QR code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl || !invite) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `wedding-invite-${invite.guestName
      .replace(/\s+/g, "-")
      .toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = async () => {
    if (!invite) return;

    const inviteUrl = `${window.location.origin}/invite/${invite.id}`;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  if (!invite) return null;

  const inviteUrl = `${window.location.origin}/invite/${invite.id}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-foreground flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            QR Code for {invite.guestName}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Download or share this QR code for your wedding invitation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invite Details */}
          {/* <QrCodeDetails invite={invite} /> */}

          {/* QR Code Display */}
          <div className="flex justify-center">
            <Card className="border-border/50 bg-card/50 p-6">
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="w-64 h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="text-center space-y-2">
                      <QrCode className="h-8 w-8 text-muted-foreground mx-auto animate-pulse" />
                      <p className="text-sm text-muted-foreground">
                        Generating QR Code...
                      </p>
                    </div>
                  </div>
                ) : qrCodeUrl ? (
                  <img
                    src={qrCodeUrl || "/placeholder.svg"}
                    alt={`QR Code for ${invite.guestName}`}
                    className="w-64 h-64 rounded-lg"
                  />
                ) : (
                  <div className="w-64 h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Failed to generate QR code
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Invite URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Invitation Link
            </label>
            <div className="flex gap-2">
              <div className="flex-1 p-2 bg-muted/20 rounded-md border border-border/50">
                <p className="text-sm text-muted-foreground font-mono break-all">
                  {inviteUrl}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="border-border/50 bg-transparent"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border/50"
            >
              Close
            </Button>
            <Button
              onClick={handleDownload}
              disabled={!qrCodeUrl}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
