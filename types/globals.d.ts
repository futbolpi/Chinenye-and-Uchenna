import type { UserRole } from "@/lib/generated/prisma/enums";

declare global {
  interface CustomJwtSessionClaims {
    onboardingComplete?: boolean;
    role?: UserRole;
  }
}
