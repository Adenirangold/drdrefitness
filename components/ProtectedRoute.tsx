"use client";

import { useAuthenticatedUser } from "@/lib/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "./Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "member" | "admin" | "director";
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { data: user, isLoading, isError, error } = useAuthenticatedUser();
  console.log(user);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/sign-in");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <Spinner></Spinner>;

  if (!user) return null;

  // Check role if requiredRole is specified
  if (requiredRole && user.data.role !== requiredRole) {
    return <div>You do not have permission to access this page.</div>;
  }

  return <>{children}</>;
}
