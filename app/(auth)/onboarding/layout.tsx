import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { adminOrCouple } from "@/config/constants";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = await auth();

  if (!!sessionClaims?.role) {
    if (adminOrCouple.includes(sessionClaims.role)) {
      redirect("/dashboard");
    }
    redirect("/");
  }

  return <>{children}</>;
}
