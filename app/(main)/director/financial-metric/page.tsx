import { getAnalyticAction } from "@/lib/actions";
import React from "react";

const page = async () => {
  const data = await getAnalyticAction();
  console.log(data);

  return <div>finance page</div>;
};

export default page;
