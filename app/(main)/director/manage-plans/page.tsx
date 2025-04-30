import { getAllPlanAction } from "@/lib/actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import ReactivateClientsForm from "@/components/forms/ReactivateClientsForm";
import PlanList from "@/components/PlanList";

export default async function page() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["plans"],
      queryFn: getAllPlanAction,
      staleTime: 1000 * 60 * 10,
    });
  } catch (error: any) {
    console.error("Failed to prefetch plans:", error.message);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PlanList></PlanList>
    </HydrationBoundary>
  );
}
