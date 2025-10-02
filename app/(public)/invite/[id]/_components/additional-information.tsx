"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Camera,
  Gift,
  Heart,
  Music,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { staffRoles } from "@/config/constants";
import type { Invite, UserRole } from "@/lib/generated/prisma/client";
import MarkInvite from "./mark-invite";

type AdditionalInformationProps = { invite: Invite; userRole?: UserRole };

const AdditionalInformation = ({
  invite,
  userRole,
}: AdditionalInformationProps) => {
  const hasMarkRole = !!userRole && staffRoles.includes(userRole);

  return (
    <Card
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-card)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
      }}
    >
      <CardHeader>
        <CardTitle
          className="text-xl flex items-center gap-3"
          style={{ color: "var(--color-foreground)" }}
        >
          <Users
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          Important Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Info Items */}
        <div className="grid grid-cols-1 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, var(--color-muted) 0%, var(--color-secondary) 100%)",
            }}
          >
            <Users
              className="h-4 w-4"
              style={{ color: "var(--color-accent)" }}
            />
            <div>
              <span
                className="font-medium"
                style={{ color: "var(--color-foreground)" }}
              >
                Dress Code:
              </span>
              <span
                style={{ color: "var(--color-muted-foreground)" }}
                className="ml-2"
              >
                Cocktail attire
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-muted) 100%)",
            }}
          >
            <Calendar
              className="h-4 w-4"
              style={{ color: "var(--color-accent)" }}
            />
            <div>
              <span
                className="font-medium"
                style={{ color: "var(--color-foreground)" }}
              >
                RSVP:
              </span>
              <span
                style={{ color: "var(--color-muted-foreground)" }}
                className="ml-2"
              >
                Please confirm by May 1st, 2024
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, var(--color-muted) 0%, var(--color-secondary) 100%)",
            }}
          >
            <Phone
              className="h-4 w-4"
              style={{ color: "var(--color-primary)" }}
            />
            <div>
              <span
                className="font-medium"
                style={{ color: "var(--color-foreground)" }}
              >
                Contact:
              </span>
              <span
                style={{ color: "var(--color-muted-foreground)" }}
                className="ml-2"
              >
                For questions, call (555) 123-4567
              </span>
            </div>
          </motion.div>
        </div>

        {/* Special Features */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="pt-4"
          style={{ borderTop: `1px solid var(--color-border)` }}
        >
          <h4
            className="font-medium mb-3 flex items-center gap-2"
            style={{ color: "var(--color-foreground)" }}
          >
            <Sparkles
              className="h-4 w-4"
              style={{ color: "var(--color-primary)" }}
            />
            What to Expect
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              <Music
                className="h-4 w-4"
                style={{ color: "var(--color-accent)" }}
              />
              Live Music
            </div>
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              <Camera
                className="h-4 w-4"
                style={{ color: "var(--color-accent)" }}
              />
              Photo Booth
            </div>
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              <Gift
                className="h-4 w-4"
                style={{ color: "var(--color-primary)" }}
              />
              Gift Table
            </div>
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              <Heart
                className="h-4 w-4"
                style={{ color: "var(--color-primary)" }}
              />
              Dancing
            </div>
          </div>
        </motion.div>

        {/* Invite Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="pt-4 space-y-4"
          style={{ borderTop: `1px solid var(--color-border)` }}
        >
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              style={{
                color:
                  invite.type === "SINGLE_USE"
                    ? "var(--color-accent)"
                    : "var(--color-primary)",
                borderColor:
                  invite.type === "SINGLE_USE"
                    ? "var(--color-accent)"
                    : "var(--color-primary)",
                backgroundColor: "var(--color-background)",
              }}
            >
              {invite.type === "SINGLE_USE"
                ? "Single Use Invitation"
                : "Unlimited Access"}
            </Badge>
          </div>

          {invite.type === "SINGLE_USE" &&
            invite.redeemedCount > 0 &&
            hasMarkRole && <MarkInvite inviteId={invite.id} />}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInformation;
