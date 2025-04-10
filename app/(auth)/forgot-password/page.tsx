// "email":"adeniranbayogold@gmail.com"

import EmailOnlyForm from "@/components/forms/EmailOnlyForm";
import React from "react";

const forgetPasswordPage = () => {
  return (
    <div>
      <EmailOnlyForm type="forgot-password"></EmailOnlyForm>
    </div>
  );
};

export default forgetPasswordPage;
