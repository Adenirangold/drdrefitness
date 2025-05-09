"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleMouseEnter = (href: string) => {
    router.prefetch(href);
  };
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link
              href={item.url}
              prefetch
              onMouseEnter={() => handleMouseEnter(item.url)}
              className={`flex items-center gap-5 `}
              onClick={() => setOpenMobile(false)}
            >
              <SidebarMenuButton
                isActive={pathname === item.url}
                tooltip={item.title}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
