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
import { useLoading } from "@/context/LoadingContext";

export function NavFooter() {
  const { isMobile } = useSidebar();
  const { setLoadingHref } = useLoading();

  const router = useRouter();
  const handleLogout = async () => {
    setLoadingHref("/sign-in");
    const result = await logOutAction();
    if (result?.data?.message) {
      router.replace("/sign-in");
      return;
    }
    setLoadingHref(null);
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
