import EmailOnlyForm from "@/components/forms/EmailOnlyForm";
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
      <EmailOnlyForm formParams={formParams} type="group"></EmailOnlyForm>
    </div>
  );
};

export default page;
