import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { admins, couples, staff } from "@/config/constants";
import { UserRole } from "./generated/prisma/enums";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserRole(emailAddress: string): UserRole {
  if (admins.includes(emailAddress)) {
    return "ADMIN";
  }
  if (couples.includes(emailAddress)) {
    return "COUPLE";
  }
  if (staff.includes(emailAddress)) {
    return "STAFF";
  }

  return "GUEST";
}
