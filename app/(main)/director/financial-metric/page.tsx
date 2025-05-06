import Finacial from "@/components/Financial";
import { getAnalyticAction } from "@/lib/actions";
import React from "react";

const page = async () => {
  const data = await getAnalyticAction();
  // console.log(data);

  return (
    <div>
      <Finacial membershipData={data}></Finacial>
    </div>
  );
};

export default page;
