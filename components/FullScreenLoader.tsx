"use client";

import { useLoading } from "@/context/LoadingContext";
import { Loader2 } from "lucide-react";
import Spinner from "./Spinner";

export function FullScreenSpinner({ children }: { children: React.ReactNode }) {
  const { loadingHref, setLoadingHref } = useLoading();

  if (!loadingHref) return children;

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    //   <Loader2 className="h-12 w-12 animate-spin text-white" />
    // </div>
    <Spinner></Spinner>
  );
}
