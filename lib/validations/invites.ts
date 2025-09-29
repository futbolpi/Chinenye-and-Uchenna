import { z } from "zod";

// Validation schemas
export const phoneVerificationSchema = z.object({
  inviteId: z.string(),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

export const markInviteUsedSchema = z.object({
  inviteId: z.string(),
});

export const inviteTypes = ["SINGLE_USE", "UNLIMITED"] as const;

export const createInviteSchema = z.object({
  type: z.literal(inviteTypes),
  guestName: z.string().min(3).max(30),
  phoneHash: z.string().min(10).max(15).optional(),
});

export type PhoneVerificationSchema = z.infer<typeof phoneVerificationSchema>;
export type MarkInviteUsedSchema = z.infer<typeof markInviteUsedSchema>;
export type CreateInviteSchema = z.infer<typeof createInviteSchema>;
