"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminMembersAction } from "../lib/actions";

export function useAdminMembers() {
  return useQuery({
    queryKey: ["admin-members"],
    queryFn: getAdminMembersAction,
    refetchInterval: 900000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
