"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../actions";

export function useAuthenticatedUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getAuthenticatedUser,
    refetchInterval: 900000, // Poll every 15 minutes (300,000 ms)
    refetchIntervalInBackground: true, // Continue polling even when the tab is inactive
  });
}
