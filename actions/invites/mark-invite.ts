"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { staffRoles } from "@/config/constants";
import prisma from "@/lib/prisma";
import {
  type MarkInviteUsedSchema,
  markInviteUsedSchema,
} from "@/lib/validations/invites";
import type { ActionResult } from "@/types";

export async function markInviteAsUsed(rawData: MarkInviteUsedSchema): Promise<
  ActionResult<{
    message: string;
  }>
> {
  try {
    const { sessionClaims } = await auth();

    if (!sessionClaims?.role || !staffRoles.includes(sessionClaims?.role)) {
      return { success: false, error: "Unauthorized" };
    }

    const validatedData = markInviteUsedSchema.parse(rawData);
    const { inviteId } = validatedData;

    // Get the invite
    const invite = await prisma.invite.findUnique({
      where: { id: inviteId },
    });

    if (!invite) {
      return { success: false, error: "Invite not found" };
    }

    // Only single-use invites can be marked as used
    if (invite.type !== "SINGLE_USE") {
      return {
        success: false,
        error: "Only single-use invites can be marked as used",
      };
    }

    if (invite.redeemedCount < 1) {
      return { success: false, error: "Invite is already marked as used" };
    }

    // Update invite status
    await prisma.invite.update({
      where: { id: inviteId },
      data: {
        redeemedCount: { decrement: 1 },
      },
    });

    revalidatePath("/dashboard", "layout");

    return {
      success: true,
      data: { message: "Invite marked as used successfully" },
    };
  } catch (error) {
    console.error("Error marking invite as used:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Invalid input",
      };
    }
    return { success: false, error: "Failed to mark invite as used" };
  }
}
