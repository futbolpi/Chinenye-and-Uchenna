import { type NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

import { env } from "@/env";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ inviteId: string }> }
) {
  try {
    const { inviteId } = await params;

    // Get the invite to verify it exists
    const invite = await prisma.invite.findUnique({ where: { id: inviteId } });

    if (!invite) {
      return NextResponse.json({ error: "Invite not found" }, { status: 404 });
    }

    // Generate the invite URL
    const baseUrl = env.NEXT_PUBLIC_APP_URL;
    const inviteUrl = `${baseUrl}/invite/${inviteId}`;

    // Generate QR code with wedding-themed styling
    const qrCodeBuffer = await QRCode.toBuffer(inviteUrl, {
      type: "png",
      width: 512,
      margin: 2,
      color: {
        dark: "#2D1B1B", // Dark charcoal from our theme
        light: "#FEFCFC", // Ivory background from our theme
      },
      errorCorrectionLevel: "M",
    });

    const uint8Array = new Uint8Array(qrCodeBuffer);

    // Return the QR code as a PNG image
    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}
