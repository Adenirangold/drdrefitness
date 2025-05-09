"use client";
import Spinner from "@/components/Spinner";
import SubscriptionList from "@/components/SubscriptionList";
import { useAuthenticatedUser } from "@/hooks/useUser";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<Spinner></Spinner>}>
        <SubscriptionList></SubscriptionList>
      </Suspense>
    </div>
  );
};

export default page;
