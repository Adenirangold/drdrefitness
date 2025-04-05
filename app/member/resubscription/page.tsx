import ReactivateClientForm from "@/components/forms/reactivateClientForm";
import { getAllPlanAction } from "@/lib/actions";
import React from "react";

const page = async () => {
  const result = await getAllPlanAction();
  console.log(result.data);
  const { _id, name, planType, gymLocation, gymBranch, price, duration } =
    result.data?.plan;
  const data = {
    id: _id,
    name,
    planType,
    gymLocation,
    gymBranch,
    price,
    duration,
  };

  return (
    <div>
      <ReactivateClientForm data={data}></ReactivateClientForm>
    </div>
  );
};

export default page;
