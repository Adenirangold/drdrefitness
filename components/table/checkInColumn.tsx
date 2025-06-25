"use client";

import { getTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export interface MemberCheckInOut {
  regNumber: string;
  name: string;
  checkInTime: string;
  checkOutTime: string | null;
  session: string | null;
}

export const columns: ColumnDef<MemberCheckInOut>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <p className="text-14-regular">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "regNumber",
    header: "Reg Number",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name;

      return <div>{name}</div>;
    },
  },
  {
    accessorKey: "checkInTime",
    header: "Check-In-Time",
    cell: ({ row }) => {
      const checkInTime = row.original.checkInTime;
      return <div>{getTime(checkInTime)}</div>;
    },
  },
  {
    accessorKey: "checkOutTime",
    header: "Check-Out-Time",
    cell: ({ row }) => {
      const checkOutTime = row.original.checkOutTime;
      return <div>{checkOutTime ? getTime(checkOutTime) : "-"}</div>;
    },
  },
  {
    accessorKey: "session",
    header: "Session",
    cell: ({ row }) => {
      const session = row.original.session;
      return <div>{session}</div>;
    },
  },
];
