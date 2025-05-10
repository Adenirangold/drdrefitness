"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  loadingHref: string | null;
  setLoadingHref: (href: string | null) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingHref, setLoadingHref] = useState<string | null>(null);

  return (
    <LoadingContext.Provider value={{ loadingHref, setLoadingHref }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
