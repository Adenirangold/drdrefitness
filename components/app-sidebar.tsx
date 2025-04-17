"use client";

import * as React from "react";

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
import SidebarSkeletons from "./skeletons/sidebar-skeletons";
import { ADMIN_NAV, DIRECTOR_NAV, MEMBER_NAV } from "@/constants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: member, isLoading, isError, error } = useAuthenticatedUser();

  if (isLoading) {
    return <SidebarSkeletons></SidebarSkeletons>;
  }

  const getNavItems = (role: string, userData: UserData) => {
    let navItems: NavItem[];
    switch (role.toLowerCase()) {
      case "member":
        navItems = MEMBER_NAV;
        break;
      case "admin":
        navItems = ADMIN_NAV;
        break;
      case "director":
        navItems = DIRECTOR_NAV;
        break;
      default:
        return [];
    }
    return navItems.filter((item) => {
      if (!item.restrictTo) return true;

      const { isGroup, groupRole } = item.restrictTo;

      if (isGroup && groupRole) {
        return userData.isGroup === true && userData.groupRole === groupRole;
      }

      return userData.isGroup === isGroup;
    });
  };

  const navItems = getNavItems(member?.data?.role, member?.data);

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
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter></NavFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
