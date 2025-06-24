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
    queryKey: ["records"],
    queryFn: () => getCheckInOutMembersRecord({ date, gymLocation, gymBranch }),
  });
}
