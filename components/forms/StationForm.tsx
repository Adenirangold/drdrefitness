"use client";
import { resubscribePlanSchema, StationSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import { getBranches, locationItems } from "@/lib/utils";
import SpinnerMini from "../SpinnerMini";
import { useToast } from "@/hooks/use-toast";
import { useAddStation } from "@/hooks/useStation";

const defaultValues = {
  gymLocation: "",
  gymBranch: "",
};

const StationForm = ({ closeModal }: { closeModal?: () => void }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending } = useAddStation();

  const form = useForm<z.infer<typeof StationSchema>>({
    resolver: zodResolver(StationSchema),
    defaultValues,
  });

  const selectedLocation = form.watch("gymLocation") || "ilorin";
  const branchesItems = useMemo(
    () => getBranches(selectedLocation),
    [selectedLocation]
  );

  async function onSubmit(values: z.infer<typeof StationSchema>) {
    console.log(values);

    const data = {
      gymLocation: values.gymLocation,
      gymBranch: values.gymBranch,
    };

    mutate(data, {
      onSuccess: () => {
        if (closeModal) {
          closeModal();
        }
        toast({
          title: "Success",
          description: "You added new station successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      },
    });
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
          items={locationItems}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          placeholder="Choose Your Branch"
          label="Branch"
          name={"gymBranch"}
          control={form.control}
          items={branchesItems}
        ></CustomFormField>

        <Button type="submit">
          Submit
          {isPending && <SpinnerMini></SpinnerMini>}
        </Button>
      </form>
    </Form>
  );
};

export default StationForm;
