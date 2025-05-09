import SignUpForm from "@/components/forms/SignUpForm";
// const SignUpForm = dynamic(() => import("@/components/forms/SignUpForm"), {
//   ssr: false,
//   loading: () => <Spinner />,
// });
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";

import React, { Suspense } from "react";

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
