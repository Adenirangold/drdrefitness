"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";

import Spinner from "./Spinner";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { loadingHref, setLoadingHref } = useLoading();
  const pathname = usePathname();

  const normalizePath = (path: string) =>
    path.replace(/\/$/, "").split("?")[0].split("#")[0];

  useEffect(() => {
    const normalizedPathname = normalizePath(pathname);
    const normalizedLoadingHref = loadingHref
      ? normalizePath(loadingHref)
      : null;

    if (loadingHref && normalizedPathname === normalizedLoadingHref) {
      setLoadingHref(null);
    }
  }, [pathname, loadingHref, setLoadingHref]);

  return (
    <div className="relative h-full w-full">
      {children}
      {loadingHref && <Spinner />}
    </div>
  );
}
