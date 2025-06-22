import { useQuery } from "@tanstack/react-query";
import { getAdminStation } from "../lib/actions";

export function useQR() {
  return useQuery({
    queryKey: ["qrCode"],
    queryFn: getAdminStation,
    staleTime: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
    refetchIntervalInBackground: true,
  });
}
