import { getAllPlanAction } from "@/lib/actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
// import ReactivateClientsForm from "@/components/forms/ReactivateClientsForm";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";

const ReactivateClientsForm = dynamic(
  () => import("@/components/forms/ReactivateClientsForm"),
  {
    loading: () => <Spinner />,
  }
);

export default async function page() {
  const queryClient = new QueryClient();

  // Prefetch plans data
  try {
    await queryClient.prefetchQuery({
      queryKey: ["plans"],
      queryFn: getAllPlanAction,
      staleTime: 1000 * 60 * 60,
    });
  } catch (error: any) {
    console.error("Failed to prefetch plans:", error.message);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<Spinner></Spinner>}>
        <ReactivateClientsForm />
      </Suspense>
    </HydrationBoundary>
  );
}
