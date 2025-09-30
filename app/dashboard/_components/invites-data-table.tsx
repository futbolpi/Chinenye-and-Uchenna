"use client";

import { DataTable } from "@/components/ui/data-table";
import { Invite } from "@/lib/generated/prisma/client";
import { useInviteColumns } from "./use-invite-columns";

interface InvitesDataTableProps {
  data: Invite[];
  onGenerateQR: (invite: Invite) => void;
}

export function InvitesDataTable({
  data,
  onGenerateQR,
}: InvitesDataTableProps) {
  const columns = useInviteColumns({ onGenerateQR });

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="guestName"
      searchPlaceholder="Search guests..."
    />
  );
}
