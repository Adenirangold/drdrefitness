import EmailOnlyForm from "@/components/forms/EmailOnlyForm";
import Spinner from "@/components/Spinner";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<Spinner></Spinner>}>
        <EmailOnlyForm type="invite-member"></EmailOnlyForm>
      </Suspense>
    </div>
  );
};

export default page;
