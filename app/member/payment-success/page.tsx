import { redirect } from "next/navigation";
import { verifyPaymentAfterSignupAction } from "@/lib/actions";
import Spinner from "@/components/Spinner";

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: {
    reference: string;
  };
}) {
  const { reference } = await searchParams;
  console.log(reference);

  if (reference) {
    const result = await verifyPaymentAfterSignupAction(reference);

    if (result.error) {
      console.log(result.error);
      return;
    }

    redirect("/member");
  }

  return <Spinner />;
}
