import ReactivateClientsForm from "@/components/forms/ReactivateClientsForm";
import { getAllPlanAction } from "@/lib/actions";
import React from "react";

const page = async () => {
  const result = await getAllPlanAction();
  // console.log(result.data);

  const data = result.data?.plan.map((item: PlanData) => {
    return {
      id: item._id,
      name: item.name,
      planType: item.planType,
      gymLocation: item.gymLocation,
      gymBranch: item.gymBranch,
      price: item.price,
      duration: item.duration,
    };
  });

  return (
    <div>
      <ReactivateClientsForm data={data}></ReactivateClientsForm>
    </div>
  );
};

export default page;
