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
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";

export function NavFooter() {
  const { isMobile } = useSidebar();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleLogout = async () => {
    setIsLoading(true);
    const result = await logOutAction();
    if (result?.data?.message) {
      router.replace("/sign-in");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Log Out" onClick={handleLogout}>
          <LogOut></LogOut>
          <span>
            Log Out
            {isLoading && <SpinnerMini></SpinnerMini>}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
