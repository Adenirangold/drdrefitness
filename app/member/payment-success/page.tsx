"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyPaymentAfterSignupAction } from "@/lib/actions";
import Spinner from "@/components/Spinner";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams?.get("reference");

  useEffect(() => {
    if (reference) {
      const verifyPayment = async () => {
        const { data, error } = await verifyPaymentAfterSignupAction(reference);

        if (error) {
          return;
        }

        const token = data?.token;

        if (token) {
          localStorage.setItem("token", token);
        }

        router.replace("/member");
      };

      verifyPayment();
    }
  }, [reference]);

  return <Spinner></Spinner>;
}
