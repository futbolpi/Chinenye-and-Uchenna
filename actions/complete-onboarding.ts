"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";

import { getUserRole } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const completeOnboarding = async () => {
  const user = await currentUser();

  if (!user?.primaryEmailAddress) {
    return { error: "No Primary email address" };
  }

  const role = getUserRole(user.primaryEmailAddress.emailAddress);

  const client = await clerkClient();

  try {
    const res = await client.users.updateUser(user.id, {
      publicMetadata: {
        onboardingComplete: true,
        role,
      },
    });

    await prisma.user.upsert({
      create: {
        id: user.id,
        role,
        name: user.fullName || user.firstName || "Unknown",
      },
      update: { role, name: user.fullName || user.firstName || "Unknown" },
      where: { id: user.id },
    });

    revalidatePath("/(auth)/onboarding");

    return {
      message: role === "GUEST" ? "/" : "/dashboard",
    };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
