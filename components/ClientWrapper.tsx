"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";

import Spinner from "./Spinner";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { loadingHref, setLoadingHref, isLoading, setIsLoading } = useLoading();
  const pathname = usePathname();

  // Normalize URLs
  const normalizePath = (path: string) =>
    path.replace(/\/$/, "").split("?")[0].split("#")[0];

  // Clear loading state when pathname matches loadingHref
  useEffect(() => {
    const normalizedPathname = normalizePath(pathname);
    const normalizedLoadingHref = loadingHref
      ? normalizePath(loadingHref)
      : null;

    console.log("ClientWrapper useEffect:", {
      rawPathname: pathname,
      rawLoadingHref: loadingHref,
      normalizedPathname,
      normalizedLoadingHref,
    });

    if (loadingHref && normalizedPathname === normalizedLoadingHref) {
      console.log("Clearing loading state in ClientWrapper");
      setLoadingHref(null);
    }
  }, [pathname, loadingHref, setLoadingHref]);

  console.log("ClientWrapper render:", { loadingHref });

  return (
    <div className="relative h-full w-full">
      {children}
      {loadingHref && <Spinner />}
    </div>
  );
}
