"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { adminOrCouple } from "@/config/constants";
import prisma from "@/lib/prisma";
import {
  type CreateInviteSchema,
  createInviteSchema,
} from "@/lib/validations/invites";
import type { ActionResult } from "@/types";

export async function createInvite(rawData: CreateInviteSchema): Promise<
  ActionResult<{
    message: string;
  }>
> {
  try {
    const { sessionClaims } = await auth();

    if (!sessionClaims?.role || !adminOrCouple.includes(sessionClaims?.role)) {
      return { success: false, error: "Unauthorized" };
    }

    const validatedData = createInviteSchema.parse(rawData);
    const { guestName, type, phoneHash } = validatedData;

    // return error if type is single and no phone hash
    if (type === "SINGLE_USE" && !phoneHash) {
      return {
        success: false,
        error: "Single use invite requires phone number",
      };
    }

    // create the invite
    await prisma.invite.create({
      data: {
        guestName,
        type,
        phoneHash,
        redeemedCount: type === "SINGLE_USE" ? 1 : undefined,
      },
    });

    revalidatePath("/dashboard", "layout");

    return {
      success: true,
      data: { message: "Invite created successfully" },
    };
  } catch (error) {
    console.error("Error creating invite:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Invalid input",
      };
    }
    return { success: false, error: "Failed to create invite" };
  }
}
