import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { addStation, deleteStation, getAllStations } from "../lib/actions";

export function useStation() {
  return useQuery({
    queryKey: ["stations"],
    queryFn: getAllStations,
    staleTime: 1000 * 60 * 60,

    refetchInterval: 9000000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useAddStation() {
  const queryClient = useQueryClient();
  return useMutation<any, Error, StationData>({
    mutationFn: (data: StationData) => addStation(data),
    onSuccess: (response) => {
      console.log("plan added sucessfully");

      queryClient.invalidateQueries({ queryKey: ["stations"] });
    },
    onError: (error) => {
      console.error("Failed to add plan:", error);
    },
  });
}

export function useDeleteStation() {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationFn: (id) => deleteStation(id),
    onSuccess: (response) => {
      console.log("plan deleted sucessfully");

      queryClient.invalidateQueries({ queryKey: ["stations"] });
    },
    onError: (error) => {
      console.error("Failed to update station:", error);
    },
  });
}
