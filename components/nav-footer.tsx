"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";

import { logOutAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function NavFooter() {
  const { isMobile } = useSidebar();

  const router = useRouter();
  const handleLogout = async () => {
    const result = await logOutAction();
    router.replace("/sign-in");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Log Out" onClick={handleLogout}>
          <LogOut></LogOut>
          <span>Log Out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
