import { redirect } from "next/navigation";
import {
  verifyPaymentAfterReactivationAction,
  verifyPaymentAfterSignupAction,
} from "@/lib/actions";
import Spinner from "@/components/Spinner";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: {
    reference: string;
  };
}) {
  const { reference } = await searchParams;
  const cookieStore = await cookies();
  const paymentType = cookieStore.get("paymentRedirectType")?.value;

  // console.log(paymentType);

  if (reference) {
    let redirectUrl = "/sign-in";
    let result;
    switch (paymentType) {
      case "signup":
        result = await verifyPaymentAfterSignupAction(reference);
        redirectUrl = "/sign-in";
        break;
      case "reactivate":
        result = await verifyPaymentAfterReactivationAction(reference);
        redirectUrl = "/member/dashboard";

        break;

      default:
        console.log("Unknown payment type");
    }

    if (result?.error) {
      console.log(result?.error);
      return;
    }

    redirect(redirectUrl);
  }

  return <Spinner />;
}
