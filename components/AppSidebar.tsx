"use client";

import * as React from "react";

import { NavMain } from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthenticatedUser } from "@/hooks/useUser";
import Spinner from "./Spinner";
import { capitalizeAndConcat, capitalizeFirstLetters } from "@/lib/utils";
import { NavFooter } from "./NavFooter";
import { ADMIN_NAV, DIRECTOR_NAV, MEMBER_NAV } from "@/constants";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, setOpenMobile } = useSidebar();
  const { data: member, isLoading, isError, error } = useAuthenticatedUser();

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const getNavItems = (role: string, userData: UserData) => {
    let navItems: NavItem[];
    switch (role.toLowerCase() || "member") {
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

  const navItems = React.useMemo(
    () => getNavItems(member?.data?.role, member?.data),
    [member?.data?.role, member?.data]
  );

  const user = {
    role: member?.data?.role,
    name: capitalizeAndConcat(member?.data?.firstName, member?.data?.lastName),
    avatar: capitalizeFirstLetters(
      member?.data?.firstName,
      member?.data?.lastName
    ),
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="relative">
        {isMobile && (
          <Button
            onClick={() => setOpenMobile(false)}
            variant="ghost"
            className="absolute right-1 z-50 top-1 h-7 w-7 p-0 border border-black-300 bg-white hover:bg-gray-100 rounded-md"
            aria-label="Close sidebar"
          >
            <XIcon className="h-5 w-5" />
          </Button>
        )}
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
