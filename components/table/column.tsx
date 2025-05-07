"use client";

import {
  capitalizeFirstLetter,
  formatDateString,
  getDaysRemaining,
} from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import MemberModal from "../MemberModal";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export interface Plan {
  name: string;
  planType: string;
  duration: number;
  price: number;
}

export interface MemberRef {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface CurrentSubscription {
  plan: Plan | null;
  subscriptionStatus?: string;
  startDate?: string;
  endDate?: string;
  autoRenew?: boolean;
  paymentMethod?: string;
  paymentStatus?: string;
  transactionReference?: string;
}

export interface MembershipHistory {
  plan: Plan | null;
  startDate?: string;
  endDate?: string;
}

export interface DependantMember {
  member: MemberRef | null;
  status?: string;
  joinedAt?: string;
}

export interface GroupSubscription {
  groupType?: string;
  groupMaxMember?: number;
  primaryMember?: MemberRef | null;
  dependantMembers?: DependantMember[];
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface EmergencyContact {
  fullName?: string;
  phoneNumber?: string;
  relationship?: string;
}

export interface HealthInfo {
  height?: number;
  weight?: number;
  medicalConditions?: string[];
  allergies?: string[];
}

export interface MemberResponse {
  _id: string;
  regNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  profilePicture?: string;
  address: Address;
  emergencyContact: EmergencyContact;
  healthInfo?: HealthInfo;
  isActive?: boolean;
  registrationDate?: string;
  currentSubscription: CurrentSubscription;
  membershipHistory?: MembershipHistory[];
  isGroup: boolean;
  groupRole: string;
  groupSubscription?: GroupSubscription;
}

export const columns: ColumnDef<MemberResponse>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <p className="text-14-regular">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "regNumber",
    header: "Reg",
  },
  {
    // accessorKey: "fullName",
    accessorFn: (row) =>
      `${capitalizeFirstLetter(row.firstName)} ${capitalizeFirstLetter(
        row.lastName
      )}`,
    id: "fullName",
    header: "Name",
    cell: ({ row }) => {
      const formatedFirstName = capitalizeFirstLetter(row.original.firstName!);
      const formatedLastName = capitalizeFirstLetter(row.original.lastName!);

      return <div>{`${formatedFirstName} ${formatedLastName}`}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      const fullName = `${capitalizeFirstLetter(
        row.original.firstName
      )} ${capitalizeFirstLetter(row.original.lastName)}`;
      return fullName.toLowerCase().includes(filterValue.toLowerCase());
    },
  },

  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "groupRole",
    header: "Group-Role",
    cell: ({ row }) => {
      const formated = capitalizeFirstLetter(row.original.groupRole!);

      return <div>{formated}</div>;
    },
  },
  {
    accessorKey: "currentSubscription.plan.name",
    header: "Plan",
    cell: ({ row }) => {
      const formated = capitalizeFirstLetter(
        row.original?.currentSubscription?.plan?.name!
      );

      return <div>{formated}</div>;
    },
  },
  {
    accessorKey: "currentSubscription.plan.planType",
    header: "Plan-Type",
    cell: ({ row }) => {
      const formated = capitalizeFirstLetter(
        row.original?.currentSubscription?.plan?.planType!
      );

      return <div>{formated}</div>;
    },
  },
  {
    accessorKey: "currentSubscription.startDate",
    header: "Start-Date",
    cell: ({ row }) => {
      const formated = formatDateString(
        row.original?.currentSubscription?.startDate!
      );

      return <div>{formated}</div>;
    },
  },
  {
    accessorKey: "currentSubscription.endDate",
    header: "End-Date",
    cell: ({ row }) => {
      const formated = formatDateString(
        row.original?.currentSubscription?.endDate!
      );

      return <div>{formated}</div>;
    },
  },
  {
    accessorKey: "daysLeft",
    header: "Days-Left",
    cell: ({ row }) => {
      const formated = getDaysRemaining(
        row.original.currentSubscription.endDate
      );

      return <div>{formated}</div>;
    },
  },
  {
    accessorKey: "currentSubscription.subscriptionStatus",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formated = capitalizeFirstLetter(
        row.original?.currentSubscription?.subscriptionStatus!
      );

      return <div>{formated}</div>;
    },
  },
  {
    accessorKey: "Action",
    header: "Actions",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <div className="flex gap-3">
          <MemberModal member={member}></MemberModal>
        </div>
      );
    },
  },
];
