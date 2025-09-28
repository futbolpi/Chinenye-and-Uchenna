import prisma from "@/lib/prisma";

export async function getInvite(id: string) {
  try {
    const invite = await prisma.invite.findUnique({
      where: { id },
    });
    return invite;
  } catch (error) {
    console.error("Error fetching invite:", error);
    return null;
  }
}
