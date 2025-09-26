"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";

import { getUserRole } from "@/lib/utils";

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
    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
