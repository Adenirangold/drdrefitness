import AdminList from "@/components/AdminList";
import { getAdminAction } from "@/lib/actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["admins"],
      queryFn: getAdminAction,
      staleTime: 1000000 * 60 * 10,
    });
  } catch (error: any) {
    console.error("Failed to prefetch plans:", error.message);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AdminList></AdminList>
    </HydrationBoundary>
  );
}
