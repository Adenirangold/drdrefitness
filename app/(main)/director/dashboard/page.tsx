"use client";
import { columns } from "@/components/table/column";
import { DataTable } from "@/components/table/data-table";
import { getAllMembersAction } from "@/lib/actions";
import React from "react";

import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";

const page = () => {
  const { data: memberData, isLoading } = useQuery({
    queryKey: ["all-admin-members"],
    queryFn: getAllMembersAction,
    refetchInterval: 9000000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const data = memberData?.data?.data;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
