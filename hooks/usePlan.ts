import { useQuery } from "@tanstack/react-query";
import { getAllPlanAction } from "../lib/actions";

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getAllPlanAction,
  });
}
