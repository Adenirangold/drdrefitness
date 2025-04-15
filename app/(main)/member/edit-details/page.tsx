import SignUpForm from "@/components/forms/SignUpForm";
import { getAuthenticatedUser } from "@/lib/actions";
import React from "react";

const page = async () => {
  const result = await getAuthenticatedUser();
  // console.log(result);

  if (result.error) {
    console.log(result.error);
    return <div>error</div>;
  }
  return (
    <div>
      <SignUpForm type="edit" data={result.data?.member}></SignUpForm>
    </div>
  );
};

export default page;
