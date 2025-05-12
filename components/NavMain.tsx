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
import { useCallback, useEffect, useState } from "react";

import { useLoading } from "@/context/LoadingContext";

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { loadingHref, setLoadingHref } = useLoading();
  const { setOpenMobile, openMobile, isMobile } = useSidebar();
  const normalizePath = (path: string) => path.replace(/\/$/, "");

  const handleClick = useCallback(
    (href: string) => {
      const normalizedPathname = normalizePath(pathname);
      const normalizedHref = normalizePath(href);

      if (normalizedHref !== normalizedPathname) {
        if (isMobile && openMobile) {
          setOpenMobile(false);
          setTimeout(() => {
            setLoadingHref(href);

            setTimeout(() => {
              if (normalizePath(pathname) !== normalizePath(href)) {
                setLoadingHref(null);
              }
            }, 3000);
          }, 100);
        } else {
          setLoadingHref(href);
          console.log("Set loadingHref:", href);
        }
      }
    },
    [pathname, setLoadingHref, setOpenMobile, isMobile, openMobile, loadingHref]
  );

  const handleMouseEnter = (href: string) => {
    router.prefetch(href);
  };

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link
                href={item.url}
                prefetch
                onMouseEnter={() => handleMouseEnter(item.url)}
                className={`flex items-center gap-5 `}
                onClick={() => handleClick(item.url)}
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
    </>
  );
}
