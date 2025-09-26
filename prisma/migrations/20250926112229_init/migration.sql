-- CreateEnum
CREATE TYPE "public"."InviteType" AS ENUM ('UNLIMITED', 'SINGLE_USE');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'COUPLE', 'GUEST', 'STAFF');

-- CreateTable
CREATE TABLE "public"."Invite" (
    "id" TEXT NOT NULL,
    "type" "public"."InviteType" NOT NULL,
    "guestName" TEXT NOT NULL,
    "phoneHash" TEXT,
    "email" TEXT,
    "notes" TEXT,
    "redeemedCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ScanLog" (
    "id" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "phoneEnteredSnippet" TEXT,
    "success" BOOLEAN NOT NULL,
    "staffClerkId" TEXT,
    "inviteId" TEXT NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScanLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "role" "public"."UserRole" NOT NULL DEFAULT 'GUEST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ScanLog" ADD CONSTRAINT "ScanLog_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "public"."Invite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
