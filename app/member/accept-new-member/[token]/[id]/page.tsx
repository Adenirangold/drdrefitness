import SignUpForm from "@/components/forms/SignUpForm";
import React from "react";

interface AcceptNewMemberPageProps {
  params: {
    token: string;
    id: string;
  };
}
const page = async ({ params }: AcceptNewMemberPageProps) => {
  const { id, token } = await params;

  const formParams = {
    token,
    id,
  };

  return (
    <div>
      <SignUpForm formParams={formParams} type="group"></SignUpForm>
    </div>
  );
};

export default page;
