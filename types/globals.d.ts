import type { UserRole } from "@/lib/generated/prisma/enums";

export {};

declare global {
  interface CustomJwtSessionClaims {
    onboardingComplete?: boolean;
    role?: UserRole;
  }
}
