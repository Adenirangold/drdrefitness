// import SignUpForm from "@/components/forms/SignUpForm";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";

import React, { Suspense } from "react";
const SignUpForm = dynamic(() => import("@/components/forms/SignUpForm"), {
  loading: () => <Spinner />,
});

const page = () => {
  return (
    <div>
      <Suspense fallback={<Spinner></Spinner>}>
        <SignUpForm type="edit"></SignUpForm>
      </Suspense>
    </div>
  );
};

export default page;
