// import ReactivateClientsForm from "@/components/forms/ReactivateClientsForm";
// import { getAllPlanAction } from "@/lib/actions";
// import React from "react";

// const page = async () => {
//   return (
//     <div>
//       <ReactivateClientsForm></ReactivateClientsForm>
//     </div>
//   );
// };

import { getAllPlanAction } from "@/lib/actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import ReactivateClientsForm from "@/components/forms/ReactivateClientsForm";

export default async function page() {
  const queryClient = new QueryClient();

  // Prefetch plans data
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
      <ReactivateClientsForm />
    </HydrationBoundary>
  );
}
