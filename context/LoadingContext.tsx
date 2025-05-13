"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  loadingHref: string | null;
  setLoadingHref: (href: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingHref, setLoadingHref] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider
      value={{ loadingHref, setLoadingHref, isLoading, setIsLoading }}
    >
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
