import RequestPasswordForm from "@/components/forms/ResetPasswordForm";
import React from "react";

const resetPasswordPage = async ({
  params,
}: {
  params: { resetToken: string };
}) => {
  const { resetToken } = await params;

  return (
    <>
      <RequestPasswordForm resetToken={resetToken}></RequestPasswordForm>
    </>
  );
};

export default resetPasswordPage;
