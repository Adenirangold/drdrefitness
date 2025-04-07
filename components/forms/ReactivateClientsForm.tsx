"use client";
import { resubscribePlanSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/stores/authStore";
import {
  getBranchOptions,
  getLocationOptions,
  getPlanNameOptions,
  getPlanTypeOptions,
} from "@/lib/utils";

const defaultValues = {
  planType: "individual" as "individual" | "couple" | "family",
  gymLocation: "",
  gymBranch: "",
  name: "",
};

const ReactivateClientsForm = ({ data }: { data: PlanData[] }) => {
  const branchOption = getBranchOptions(data);
  const nameOption = getPlanNameOptions(data);
  const planTypeOption = getPlanTypeOptions(data);
  const locationOption = getLocationOptions(data);

  const router = useRouter();

  const form = useForm<z.infer<typeof resubscribePlanSchema>>({
    resolver: zodResolver(resubscribePlanSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof resubscribePlanSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          placeholder="Choose Your Location"
          label="Location"
          name={"gymLocation"}
          control={form.control}
          items={locationOption}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          placeholder="Choose Your Branch"
          label="Branch"
          name={"gymBranch"}
          control={form.control}
          items={branchOption}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          label="Name"
          name={"name"}
          placeholder="Choose Your Plan"
          control={form.control}
          items={nameOption}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          label="Plan Type"
          name={"planType"}
          control={form.control}
          items={planTypeOption}
        ></CustomFormField>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ReactivateClientsForm;
