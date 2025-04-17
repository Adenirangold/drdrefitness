"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  CreditCard,
  Edit,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Lock,
  Map,
  PieChart,
  RefreshCw,
  Settings2,
  SquareTerminal,
  UserPlus,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuthenticatedUser } from "@/lib/hooks/useUser";
import Spinner from "./Spinner";
import { capitalizeAndConcat, capitalizeFirstLetters } from "@/lib/utils";
import { NavFooter } from "./nav-footer";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
};

const SIDEBAR_NAV = [
  {
    title: "Dashboard",
    url: "/member/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Resubscribe",
    url: "/member/resubscription",
    icon: RefreshCw,
  },
  {
    title: "Edit Profile",
    url: "/member/edit-details",
    icon: Edit,
  },
  {
    title: "Invite Member",
    url: "/member/invite-member",
    icon: UserPlus,
  },
  {
    title: "View Members",
    url: "/member/group-members",
    icon: Users,
  },
  {
    title: "Update Password",
    url: "/member/update-password",
    icon: Lock,
  },
  {
    title: "Subscriptions",
    url: "#",
    icon: CreditCard,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: member, isLoading, isError, error } = useAuthenticatedUser();
  if (isLoading) return <Spinner></Spinner>;
  // console.log(member?.data);

  const user = {
    email: member?.data?.email,
    name: capitalizeAndConcat(member?.data?.firstName, member?.data?.lastName),
    avatar: capitalizeFirstLetters(
      member?.data?.firstName,
      member?.data?.lastName
    ),
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SIDEBAR_NAV} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter></NavFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
