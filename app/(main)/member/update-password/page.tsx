import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import Spinner from "@/components/Spinner";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<Spinner></Spinner>}></Suspense>
      <UpdatePasswordForm></UpdatePasswordForm>
    </div>
  );
};

export default page;
