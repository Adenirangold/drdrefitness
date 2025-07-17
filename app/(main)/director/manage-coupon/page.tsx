import CouponList from "@/components/CouponList";
import { getAllCouponsAction } from "@/lib/actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["coupons"],
      queryFn: getAllCouponsAction,
      staleTime: 1000000 * 60 * 10,
    });
  } catch (error: any) {
    console.error("Failed to prefetch plans:", error.message);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CouponList></CouponList>
    </HydrationBoundary>
  );
}
