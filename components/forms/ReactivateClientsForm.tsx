"use client";
import { resubscribePlanSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import {
  getBranchOptions,
  getLocationOptions,
  getPlanNameOptions,
  getPlanTypeOptions,
} from "@/lib/utils";

import { usePlans } from "@/hooks/usePlan";
import { useReactivateSubscription } from "@/hooks/useUser";
import SpinnerMini from "../SpinnerMini";
import Spinner from "../Spinner";
import { useToast } from "@/hooks/use-toast";

const defaultValues = {
  planType: "individual" as "individual" | "couple" | "family",
  gymLocation: "",
  gymBranch: "",
  name: "",
  couponCode: "",
};

const ReactivateClientsForm = () => {
  const { data, isLoading, isError, error } = usePlans();
  const [selectedLocation, setSelectedLocation] = useState("ilorin");
  if (isLoading) {
    return <Spinner />;
  }
  const reactivateMutation = useReactivateSubscription();
  const planData = data?.data || [];

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof resubscribePlanSchema>>({
    resolver: zodResolver(resubscribePlanSchema),
    defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.gymLocation) {
        setSelectedLocation(value.gymLocation);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const branchOption = useMemo(
    () => getBranchOptions(planData, selectedLocation),
    [planData, selectedLocation]
  );
  const nameOption = useMemo(() => getPlanNameOptions(planData), [planData]);
  const planTypeOption = useMemo(
    () => getPlanTypeOptions(planData),
    [planData]
  );
  const locationOption = useMemo(
    () => getLocationOptions(planData),
    [planData]
  );

  async function onSubmit(values: z.infer<typeof resubscribePlanSchema>) {
    // console.log(values);
    const paymentType = "reactivate";
    document.cookie = `paymentRedirectType=${paymentType}; path=/; max-age=3600; SameSite=Lax; Secure`;
    const data = {
      name: values.name,
      planType: values.planType,
      gymLocation: values.gymLocation,
      gymBranch: values.gymBranch,
      ...(values.couponCode ? { couponCode: values.couponCode } : {}),
    };

    // console.log(data);

    reactivateMutation.mutate(data, {
      onSuccess: () => {},
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
          label="Plan Type"
          name={"planType"}
          placeholder="Choose Your Plan Type"
          control={form.control}
          items={planTypeOption}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          label="Plan Name"
          name={"name"}
          placeholder="Choose Your Plan"
          control={form.control}
          items={nameOption}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Coupon Code"
          name="couponCode"
          placeholder="Enter Coupon Code (optional)"
          control={form.control}
        ></CustomFormField>

        <Button type="submit">
          Reactivate Subscription
          {reactivateMutation.isPending && <SpinnerMini></SpinnerMini>}
        </Button>
      </form>
    </Form>
  );
};

export default ReactivateClientsForm;
