import { z } from "zod";

// Validation schemas
export const phoneVerificationSchema = z.object({
  inviteId: z.string(),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

export const markInviteUsedSchema = z.object({
  inviteId: z.string(),
});

export type PhoneVerificationSchema = z.infer<typeof phoneVerificationSchema>;
export type MarkInviteUsedSchema = z.infer<typeof markInviteUsedSchema>;
