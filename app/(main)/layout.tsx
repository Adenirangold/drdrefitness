// app/(main)/layout.tsx
import { getAllPlanAction, getAuthenticatedUser } from "@/lib/actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: getAuthenticatedUser,
    });
  } catch (error) {
    console.error("Failed to prefetch user:", error);
  }

  try {
    await queryClient.prefetchQuery({
      queryKey: ["plans"],
      queryFn: getAllPlanAction,
    });
  } catch (error) {
    console.error("Failed to prefetch plans:", error);
  }

  const dehydratedState = dehydrate(queryClient);
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <HydrationBoundary state={dehydratedState}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header></Header>
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  );
}
