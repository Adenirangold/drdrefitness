import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  addCouponAction,
  addPlanAction,
  deleteAdminAction,
  deleteCouponAction,
  deletePlanAction,
  editPlanAction,
  getAllCouponsAction,
  getAllPlanAction,
} from "../lib/actions";

export function useCoupons() {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: getAllCouponsAction,
    staleTime: 1000 * 60 * 60,

    refetchInterval: 9000000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useAddCoupons() {
  const queryClient = useQueryClient();
  return useMutation<any, Error, CouponData>({
    mutationFn: (data: CouponData) => addCouponAction(data),
    onSuccess: (response) => {
      console.log("coupons added sucessfully");

      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: (error) => {
      console.error("Failed to add coupons:", error);
    },
  });
}
export function useDeleteCoupon() {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationFn: (id) => deleteCouponAction(id),
    onSuccess: (response) => {
      console.log("admin deleted sucessfully");

      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: (error) => {
      console.error("Failed to delete admin:", error);
    },
  });
}
