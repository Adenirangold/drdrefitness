// app/(main)/layout.tsx
import { getAllPlanAction } from "@/lib/actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

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
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
