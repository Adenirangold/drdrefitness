"use client";
import Spinner from "@/components/Spinner";
import { columns } from "@/components/table/column";
import { DataTable } from "@/components/table/data-table";
import { useAdminMembers } from "@/hooks/useAdminMember";
import React from "react";

const page = () => {
  const { data: adminData, isLoading } = useAdminMembers();
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const data = adminData?.data?.data;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
