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

export const createInviteSchema = z
  .object({
    type: z.literal(inviteTypes),
    guestName: z.string().min(3).max(30),
    phoneHash: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.type === "SINGLE_USE" &&
      (!data.phoneHash || data.phoneHash.length < 10)
    ) {
      ctx.addIssue({
        code: "too_small",
        message: "Phone Number should be at least 10 digits",
        path: ["phoneHash"], // Attach error to specific field
        minimum: 10,
        origin: "string",
        inclusive: true,
      });
    }
    if (
      data.type === "SINGLE_USE" &&
      (!data.phoneHash || data.phoneHash.length > 15)
    ) {
      ctx.addIssue({
        code: "too_big",
        message: "Phone Number should be at most 15 digits",
        path: ["phoneHash"], // Attach error to specific field
        maximum: 15,
        origin: "string",
        inclusive: true,
      });
    }
  });

export type PhoneVerificationSchema = z.infer<typeof phoneVerificationSchema>;
export type MarkInviteUsedSchema = z.infer<typeof markInviteUsedSchema>;
export type CreateInviteSchema = z.infer<typeof createInviteSchema>;
