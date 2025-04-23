import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getAllPlanAction } from "../lib/actions";

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getAllPlanAction,
    refetchInterval: 900000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
