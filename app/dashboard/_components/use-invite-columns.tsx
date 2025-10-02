"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pen, QrCode } from "lucide-react";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Invite } from "@/lib/generated/prisma/client";
import MarkAsUsed from "./mark-as-used";

type InviteColumnsProps = {
  onGenerateQR: (invite: Invite) => void;
  handleUpdateInvite: (invite: Invite) => void;
};

const getColumns: ({
  onGenerateQR,
}: InviteColumnsProps) => ColumnDef<Invite>[] = ({
  onGenerateQR,
  handleUpdateInvite,
}) => {
  return [
    {
      accessorKey: "guestName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium text-foreground hover:bg-transparent"
          >
            Guest Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium text-foreground">
          {row.getValue("guestName")}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        return (
          <Badge
            variant={type === "UNLIMITED" ? "secondary" : "default"}
            className={
              type === "UNLIMITED"
                ? "bg-secondary text-secondary-foreground"
                : "bg-primary text-primary-foreground"
            }
          >
            {type === "UNLIMITED" ? "Unlimited" : "Single Use"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email") as string | null;
        return (
          <div className="text-muted-foreground">{email || "No email"}</div>
        );
      },
    },
    {
      accessorKey: "redeemedCount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium text-foreground hover:bg-transparent"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const invite = row.original;
        const isUsed =
          invite.type === "SINGLE_USE" && invite.redeemedCount === 0;

        return (
          <div className="flex items-center gap-2">
            {isUsed && (
              <Badge variant="outline" className="text-accent border-accent">
                Used
              </Badge>
            )}
            {invite.type === "SINGLE_USE" && (
              <span className="text-sm text-muted-foreground">
                {invite.redeemedCount} remaining
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium text-foreground hover:bg-transparent"
          >
            Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return (
          <div className="text-muted-foreground">
            {date.toLocaleDateString()}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const invite = row.original;
        const isUsed =
          invite.type === "SINGLE_USE" && invite.redeemedCount === 0;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(invite.id)}
              >
                Copy invite ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleUpdateInvite(invite)}
                className="flex items-center gap-2"
              >
                <Pen className="h-4 w-4" />
                Update Invite
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onGenerateQR(invite)}
                className="flex items-center gap-2"
              >
                <QrCode className="h-4 w-4" />
                Generate QR Code
              </DropdownMenuItem>
              {!isUsed && <MarkAsUsed inviteId={invite.id} />}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

export const useInviteColumns = ({
  onGenerateQR,
  handleUpdateInvite,
}: InviteColumnsProps) => {
  const columns = useMemo(
    () => getColumns({ onGenerateQR, handleUpdateInvite }),
    [onGenerateQR, handleUpdateInvite],
  );
  return columns;
};
