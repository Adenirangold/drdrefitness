import ReactivateClientsForm from "@/components/forms/ReactivateClientsForm";
import { getAllPlanAction } from "@/lib/actions";
import React from "react";

const page = async () => {
  return (
    <div>
      <ReactivateClientsForm></ReactivateClientsForm>
    </div>
  );
};

export default page;
