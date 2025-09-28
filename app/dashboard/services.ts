import prisma from "@/lib/prisma";

export const getAllInvites = async () => {
  return await prisma.invite.findMany({
    orderBy: { createdAt: "desc" },
  });
};
