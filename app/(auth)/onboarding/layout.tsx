import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { UserRole } from "@/lib/generated/prisma/enums";

const adminOrCouple: UserRole[] = ["ADMIN", "COUPLE"];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = await auth();

  if (!!sessionClaims?.metadata.role) {
    if (adminOrCouple.includes(sessionClaims.metadata.role)) {
      redirect("/dashboard");
    }
    redirect("/");
  }

  return <>{children}</>;
}
