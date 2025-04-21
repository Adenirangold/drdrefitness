"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAuthenticatedUser,
  memberReactivateSubscriptionAction,
  verifyPaymentAfterReactivationAction,
} from "../lib/actions";

export function useAuthenticatedUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getAuthenticatedUser,
    refetchInterval: 900000, // Poll every 15 minutes (300,000 ms)
    refetchIntervalInBackground: true, // Continue polling even when the tab is inactive
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
