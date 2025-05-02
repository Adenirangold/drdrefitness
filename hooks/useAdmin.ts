"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  addAdminAction,
  deleteAdminAction,
  editAdminAction,
  getAdminAction,
} from "../lib/actions";

export function useAdmin() {
  return useQuery({
    queryKey: ["admins"],
    queryFn: getAdminAction,
    refetchInterval: 900000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useAddAdmin() {
  const queryClient = useQueryClient();
  return useMutation<any, Error, AdminData>({
    mutationFn: (data) => addAdminAction(data),
    onSuccess: (response) => {
      console.log("admin added sucessfully");

      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error) => {
      console.error("Failed to add plan:", error);
    },
  });
}
export function useEditAdmin() {
  const queryClient = useQueryClient();
  return useMutation<any, Error, Partial<AdminData>>({
    mutationFn: (data) => editAdminAction(data),
    onSuccess: (response) => {
      console.log("admin edited sucessfully");

      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error) => {
      console.error("Failed to edit plan:", error);
    },
  });
}
export function useDeleteAdmin() {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationFn: (id) => deleteAdminAction(id),
    onSuccess: (response) => {
      console.log("admin deleted sucessfully");

      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error) => {
      console.error("Failed to delete admin:", error);
    },
  });
}
