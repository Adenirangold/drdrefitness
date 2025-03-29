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

  if (reference) {
    const { data, error } = await verifyPaymentAfterSignupAction(reference);

    if (error) {
      console.log(error);
    }

    redirect("/member");
  }

  return <Spinner />;
}
