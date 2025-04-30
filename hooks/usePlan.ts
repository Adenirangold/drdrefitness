import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  addPlanAction,
  editPlanAction,
  getAllPlanAction,
} from "../lib/actions";

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getAllPlanAction,
    refetchInterval: 900000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useAddPlan() {
  const queryClient = useQueryClient();
  return useMutation<any, Error, PlanData>({
    mutationFn: (data: PlanData) => addPlanAction(data),
    onSuccess: (response) => {
      console.log("plan added sucessfully");

      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: (error) => {
      console.error("Failed to add plan:", error);
    },
  });
}

export function useEditPlan() {
  const queryClient = useQueryClient();
  return useMutation<any, Error, Partial<PlanData>>({
    mutationFn: (data: Partial<PlanData>) => editPlanAction(data, data._id!),
    onSuccess: (response) => {
      console.log("plan updated sucessfully");

      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: (error) => {
      console.error("Failed to update plan:", error);
    },
  });
}
