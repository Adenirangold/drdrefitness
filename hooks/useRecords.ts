import { useQuery } from "@tanstack/react-query";
import { getCheckInOutMembersRecord } from "../lib/actions";

export function useRecords({
  date,
  gymLocation,
  gymBranch,
}: {
  date?: Date;
  gymLocation: string;
  gymBranch: string;
}) {
  return useQuery({
    queryKey: ["records", gymBranch, gymLocation, date?.toISOString()],
    queryFn: () => getCheckInOutMembersRecord({ date, gymLocation, gymBranch }),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
}
