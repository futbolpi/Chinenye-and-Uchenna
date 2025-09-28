"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";

import { getUserRole } from "@/lib/utils";
import prisma from "@/lib/prisma";

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
      create: { id: user.id, role },
      update: {},
      where: { id: user.id },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
