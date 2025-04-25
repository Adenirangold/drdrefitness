"use client";
import Spinner from "@/components/Spinner";
import SubscriptionList from "@/components/SubscriptionList";
import { useAuthenticatedUser } from "@/hooks/useUser";
import React from "react";

const page = () => {
  return (
    <div>
      <SubscriptionList></SubscriptionList>
    </div>
  );
};

export default page;
