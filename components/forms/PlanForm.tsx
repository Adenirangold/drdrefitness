"use client";
import {
  planSchema,
  planUpdateSchema,
  resubscribePlanSchema,
} from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import SpinnerMini from "../SpinnerMini";
import {
  generateRandomId,
  getBranches,
  getDirtyData,
  getDurationByName,
  locationItems,
  PlanTypeItems,
  planTypeItems,
} from "@/lib/utils";
import { useAddPlan, useEditPlan } from "@/hooks/usePlan";

const PlanForm = ({
  data,
  edit,
  closeModal,
}: {
  data?: PlanData;
  edit?: boolean;
  closeModal?: () => void;
}) => {
  const router = useRouter();
  const { mutate, isError, isPending, isSuccess, error } = useAddPlan();
  const editMutation = useEditPlan();
  const planFormSchema = edit ? planUpdateSchema : planSchema;

  useEffect(() => {
    if (editMutation.isSuccess) {
      if (closeModal) {
        closeModal();
      }
    }
  }, [editMutation.isSuccess, closeModal]);

  const defaultValues = {
    planType: edit
      ? data?.planType
      : ("individual" as "individual" | "couple" | "family"),
    gymLocation: edit ? data?.gymLocation : "",
    gymBranch: edit ? data?.gymBranch : "",
    name: edit ? data?.name : "",
    price: edit ? data?.price : 0,
    benefits: edit ? data?.benefits?.join(",") : "",
  };
  const form = useForm<z.infer<typeof planFormSchema>>({
    resolver: zodResolver(planFormSchema),
    defaultValues,
  });
  const selectedLocation = form.watch("gymLocation") || "ilorin";
  const branchesItems = getBranches(selectedLocation);

  async function onSubmit(values: z.infer<typeof planFormSchema>) {
    console.log(values);
    const duration = getDurationByName(values.name!);

    if (edit) {
      const dirtyFields = form.formState.dirtyFields;
      const updateData = getDirtyData(values, dirtyFields);

      const updateddata = {
        ...updateData,
        _id: data?._id,
        duration: duration,
        benefits: values?.benefits
          ?.split(",")
          .map((item) => item.trim())
          .filter((item) => item),
      };

      editMutation.mutate(updateddata);

      if (isError) {
        return;
      }
    } else {
      const data = {
        planId: generateRandomId(12),
        planType: values.planType!,
        name: values.name!,
        gymLocation: values.gymLocation!,
        gymBranch: values.gymBranch!,
        benefits: values?.benefits
          ?.split(",")
          .map((item) => item.trim())
          .filter((item) => item),
        price: values.price!,
        duration: duration,
      };

      mutate(data);
    }

    if (isError || editMutation.isError) {
      return;
    }

    router.push("/director/manage-plans");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          label="Plan Name"
          name={"name"}
          placeholder="Choose Your Plan"
          control={form.control}
          items={planTypeItems}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          placeholder="Choose Location"
          label="Location"
          name={"gymLocation"}
          control={form.control}
          items={locationItems}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          placeholder="Choose Branch"
          label="Branch"
          name={"gymBranch"}
          control={form.control}
          items={branchesItems}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          label="Plan Type"
          name={"planType"}
          placeholder="Choose Plan Type"
          control={form.control}
          items={PlanTypeItems}
        ></CustomFormField>

        <CustomFormField
          label="Price"
          control={form.control}
          name="price"
          fieldType={FormFieldType.INPUT}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          name="benefits"
          control={form.control}
          label="Benefit"
        ></CustomFormField>

        <Button type="submit">
          {isPending || editMutation.isPending ? (
            <SpinnerMini></SpinnerMini>
          ) : edit ? (
            "Edit Plan"
          ) : (
            "Add Plan"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PlanForm;
