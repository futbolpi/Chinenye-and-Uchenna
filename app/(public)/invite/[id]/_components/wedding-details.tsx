"use client";

import { motion } from "framer-motion";

import type { Invite } from "@/lib/generated/prisma/client";
import type { UserRole } from "@/lib/generated/prisma/enums";
import AdditionalInformation from "./additional-information";
import WeddingInformation from "./wedding-information";
import WelcomeCard from "./welcome-card";

interface WeddingDetailsProps {
  invite: Invite;
  userRole?: UserRole;
}

export function WeddingDetails({ invite, userRole }: WeddingDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Welcome Card */}
      <WelcomeCard guestName={invite.guestName} />

      {/* Wedding Information */}
      <WeddingInformation />

      {/* Additional Information */}
      <AdditionalInformation invite={invite} userRole={userRole} />
    </motion.div>
  );
}
