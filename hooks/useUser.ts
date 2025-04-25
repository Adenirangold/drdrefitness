"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getAuthenticatedUser,
  loginAction,
  memberReactivateSubscriptionAction,
  memberUpdateAction,
  memberUpdatePasswordAction,
  verifyPaymentAfterReactivationAction,
} from "../lib/actions";

export function useAuthenticatedUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getAuthenticatedUser,
    refetchInterval: 900000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useReactivateSubscription() {
  const queryClient = useQueryClient();
  return useMutation<any, Error, ActivationData>({
    mutationFn: (data: ActivationData) =>
      memberReactivateSubscriptionAction(data),
    onSuccess: (response) => {
      console.log("Subscription reactivated successfully");
      if (response.data?.authorizationUrl) {
        window.location.href = response.data.authorizationUrl;
      }

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Failed to reactivate subscription:", error);
    },
  });
}

export function useUpdateMember() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, UserData>({
    mutationFn: (data: UserData) => memberUpdateAction(data),
    onSuccess: () => {
      console.log("Member updated successfully:");

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Failed to update member:", error.message);
    },
  });
}
export function useUpdateMemberPassword() {
  return useMutation<any, Error, UpdatePasswordData>({
    mutationFn: (data: UpdatePasswordData) => memberUpdatePasswordAction(data),
    onSuccess: (response) => {
      console.log("Member password updated successfully:");
    },
    onError: (error) => {
      console.error("Failed to update member password:", error.message);
    },
  });
}
