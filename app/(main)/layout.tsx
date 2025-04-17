// app/(main)/layout.tsx
import { getAllPlanAction, getAuthenticatedUser } from "@/lib/actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

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

  return (
    <HydrationBoundary state={dehydratedState}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header></Header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  );
}
