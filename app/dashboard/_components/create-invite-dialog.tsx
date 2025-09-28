"use client";

import type React from "react";
import { Users, Phone } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Invite } from "@/lib/generated/prisma/client";

interface CreateInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInviteCreated: (invite: Invite) => void;
}

export function CreateInviteDialog({
  open,
  onOpenChange,
  onInviteCreated,
}: CreateInviteDialogProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"UNLIMITED" | "SINGLE_USE">("UNLIMITED");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          type,
          phoneNumber: type === "SINGLE_USE" ? phoneNumber : undefined,
        }),
      });

      if (response.ok) {
        const newInvite = await response.json();
        onInviteCreated(newInvite);
        setName("");
        setType("UNLIMITED");
        setPhoneNumber("");
      } else {
        console.error("Failed to create invite");
      }
    } catch (error) {
      console.error("Error creating invite:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              Guest Name or Group
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Smith Family, John & Jane Doe"
              required
              className="border-border/50 focus:border-primary"
            />
          </div>

          {/* Invite Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Invitation Type
            </Label>
            <RadioGroup
              value={type}
              onValueChange={(value) =>
                setType(value as "UNLIMITED" | "SINGLE_USE")
              }
            >
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="UNLIMITED" id="unlimited" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <Label
                          htmlFor="unlimited"
                          className="font-medium text-foreground cursor-pointer"
                        >
                          Unlimited Access
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        No phone verification required. Can be used multiple
                        times.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="SINGLE_USE" id="single-use" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-accent" />
                        <Label
                          htmlFor="single-use"
                          className="font-medium text-foreground cursor-pointer"
                        >
                          Single Use with Verification
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Requires phone verification. Can only be used once.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>

          {/* Phone Number Input (conditional) */}
          {type === "SINGLE_USE" && (
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-foreground"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
                className="border-border/50 focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">
                This phone number will be required for verification
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? "Creating..." : "Create Invitation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
