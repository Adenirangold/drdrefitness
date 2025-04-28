import { columns } from "@/components/table/column";
import { DataTable } from "@/components/table/data-table";
import { getAllMembersAction } from "@/lib/actions";
import React from "react";

const page = async () => {
  const result = await getAllMembersAction();
  const data = result.data?.data;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
