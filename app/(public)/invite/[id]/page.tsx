import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import type { SearchParams } from "nuqs/server";

import { staffRoles } from "@/config/constants";
import { FloatingDecorations } from "./_components/floating-decorations";
import { InviteDisplay } from "./_components/invite-display";
import { PhoneVerificationForm } from "./_components/phone-verification-form";
import { WeddingDetails } from "./_components/wedding-details";
import { searchParamsCache } from "./searchparams";
import { getInvite } from "./services";

interface InvitePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}

export default async function InvitePage({
  params,
  searchParams,
}: InvitePageProps) {
  const [{ id: inviteId }, { phoneNumber }, { sessionClaims }] =
    await Promise.all([params, searchParamsCache.parse(searchParams), auth()]);

  const invite = await getInvite(inviteId);
  const userRole = sessionClaims?.role;

  if (!invite) {
    notFound();
  }

  // type is UNLIMITED = verified
  // type is single use = is there phone number in search params and it hasnt been used yet (verified)
  // show mark as used if logged in user is staff

  const isStaff = !!userRole && staffRoles.includes(userRole);
  const isVerified =
    invite.type === "UNLIMITED" ||
    (!!phoneNumber && phoneNumber === invite.phoneHash) ||
    isStaff;
  const showVerificationForm =
    invite.type === "SINGLE_USE" && !isStaff && !isVerified;

  const isAlreadyUsed =
    invite.type === "SINGLE_USE" && invite.redeemedCount < 1 && !isVerified;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, var(--color-background) 0%, var(--color-muted) 50%, var(--color-secondary) 100%)",
      }}
    >
      <FloatingDecorations />

      <div className="container mx-auto p-6 max-w-md space-y-8 relative z-10">
        <InviteDisplay isAlreadyUsed={isAlreadyUsed} />

        {showVerificationForm && !isAlreadyUsed && (
          <PhoneVerificationForm
            inviteId={invite.id}
            guestName={invite.guestName}
          />
        )}

        {isVerified && <WeddingDetails invite={invite} userRole={userRole} />}
      </div>
    </div>
  );
}
