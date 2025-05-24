import { useQuery } from "@tanstack/react-query";
import { getAdminStation } from "../lib/actions";

export function useQR() {
  return useQuery({
    queryKey: ["qrCode"],
    queryFn: getAdminStation,
    staleTime: 1000 * 60 * 60,
  });
}
