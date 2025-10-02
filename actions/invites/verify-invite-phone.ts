"use server";

import { headers } from "next/headers";
import { z } from "zod";

import type { Invite } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import {
  type PhoneVerificationSchema,
  phoneVerificationSchema,
} from "@/lib/validations/invites";
import type { ActionResult } from "@/types";

export async function verifyInvitePhone(
  rawData: PhoneVerificationSchema,
): Promise<ActionResult<{ invite: Invite; message: string }>> {
  try {
    const validatedData = phoneVerificationSchema.parse(rawData);
    const { inviteId, phoneNumber } = validatedData;

    // Get request metadata
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";
    const phoneSnippet = phoneNumber.slice(-4);

    // Get the invite
    const invite = await prisma.invite.findUnique({
      where: { id: inviteId },
    });

    if (!invite) {
      await prisma.scanLog.create({
        data: {
          inviteId,
          success: false,
          ip,
          userAgent,
          phoneEnteredSnippet: phoneSnippet,
        },
      });
      return { success: false, error: "Invite not found" };
    }

    // Check if invite is still valid
    if (invite.type === "SINGLE_USE" && invite.redeemedCount === 0) {
      await prisma.scanLog.create({
        data: {
          inviteId,
          success: false,
          ip,
          userAgent,
          phoneEnteredSnippet: phoneSnippet,
        },
      });
      return { success: false, error: "This invitation has already been used" };
    }

    // For unlimited invites, no phone verification needed
    if (invite.type === "UNLIMITED") {
      await prisma.scanLog.create({
        data: {
          inviteId,
          success: true,
          ip,
          userAgent,
        },
      });
      return {
        success: true,
        data: {
          invite,
          message: "Welcome! Here are your wedding details.",
        },
      };
    }

    // For single-use invites, verify phone number
    if (invite.phoneHash !== phoneNumber) {
      await prisma.scanLog.create({
        data: {
          inviteId,
          success: false,
          ip,
          userAgent,
          phoneEnteredSnippet: phoneSnippet,
        },
      });
      return {
        success: false,
        error: "Phone number does not match our records",
      };
    }

    await prisma.scanLog.create({
      data: {
        inviteId,
        success: true,
        ip,
        userAgent,
        phoneEnteredSnippet: phoneSnippet,
      },
    });

    return {
      success: true,
      data: {
        invite,
        message: "Phone verified! Here are your wedding details.",
      },
    };
  } catch (error) {
    console.error("Error verifying invite:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Invalid input",
      };
    }
    return { success: false, error: "Failed to verify invite" };
  }
}
