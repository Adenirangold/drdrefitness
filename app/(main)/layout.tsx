// app/(main)/layout.tsx
import { getAllPlanAction, getAuthenticatedUser } from "@/lib/actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { redirect } from "next/navigation";
import { LoadingProvider } from "@/context/LoadingContext";
import { ClientWrapper } from "@/components/ClientWrapper";

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
      staleTime: 1000 * 60 * 30,
    });
  } catch (error: any) {
    console.error("Failed to prefetch user:", error);
    if (error.status === 401) {
      return redirect("/sign-in");
    }
  }

  const dehydratedState = dehydrate(queryClient);
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <HydrationBoundary state={dehydratedState}>
      <LoadingProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <SidebarInset>
            <Header></Header>
            <ClientWrapper>
              <Suspense fallback={<Spinner />}>{children}</Suspense>
            </ClientWrapper>
          </SidebarInset>
        </SidebarProvider>
      </LoadingProvider>
    </HydrationBoundary>
  );
}
