"use client";
import { couponSchema, loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import SpinnerMini from "../SpinnerMini";
import { useToast } from "@/hooks/use-toast";
import CustomSelect from "react-select";
import { usePlans } from "@/hooks/usePlan";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CouponForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([]);
  const { data: planData, isLoading: planIsLoading } = usePlans();

  // Ensure plans is an empty array if planData is undefined or still loading
  const plans = planData?.data || [];

  const form = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      discountType: "percentage" as "percentage" | "fixed",
      discountValue: 0,
      validFrom: new Date(),
      validUntil: new Date(),
      maxUses: 0,
      applicablePlans: [],
    },
  });

  const locations = Array.from(
    new Set(plans.map((plan: PlanData) => plan.gymLocation))
  );

  const branches = selectedLocation
    ? Array.from(
        new Set(
          plans
            .filter((plan: PlanData) => plan.gymLocation === selectedLocation)
            .map((plan: PlanData) => plan.gymBranch)
        )
      )
    : [];

  const availablePlans = selectedBranch
    ? plans.filter(
        (plan: PlanData) =>
          plan.gymBranch === selectedBranch &&
          plan.gymLocation === selectedLocation
      )
    : [];

  async function onSubmit(values: z.infer<typeof couponSchema>) {
    console.log(values);
  }

  // Render loading state if plans are still being fetched
  if (planIsLoading || !planData) {
    return (
      <div className="flex justify-center items-center">
        <SpinnerMini />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* ... rest of your form ... */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Coupon Code"
          name="code"
          inputType="text"
          placeholder="Create a coupon code"
          control={form.control}
        />
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          label="Discount Type"
          name="discountType"
          control={form.control}
          items={[
            { label: "Percentage", value: "percentage" },
            { label: "Fixed Amount", value: "fixed" },
          ]}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Discount Value"
          name="discountValue"
          inputType="number"
          control={form.control}
          placeholder="Enter discount value in respect to the discount type (percentage or fixed amount)"
        />
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="validFrom"
          label="Valid From"
          placeholder="mm/dd/yyyy"
        />
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="validUntil"
          label="Valid Until"
          placeholder="mm/dd/yyyy"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Maximum Uses (Optional)"
          name="maxUses"
          inputType="number"
          control={form.control}
          placeholder="Maximum number of times this coupon can be used"
        />

        <FormItem>
          <FormLabel>Gym Location</FormLabel>
          <Select
            onValueChange={(value) => {
              setSelectedLocation(value);
              setSelectedBranch("");
            }}
            value={selectedLocation}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {locations.map((location: any) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
        {selectedLocation && (
          <FormItem>
            <FormLabel>Gym Branch</FormLabel>
            <Select
              onValueChange={(value) => {
                setSelectedBranch(value);
              }}
              value={selectedBranch}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {branches.map((branch: any) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}

        {selectedBranch && (
          <FormField
            control={form.control}
            name="applicablePlans"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Applicable Plans</FormLabel>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="applicablePlans"
                    render={({ field: { onChange, value } }) => (
                      <CustomSelect
                        isMulti
                        // options={availablePlans.map((plan: any) => ({
                        //   value: plan._id,
                        //   label: `${plan.name} - ${plan.planType}`,
                        // }))}
                        // value={availablePlans
                        //   .filter((plan: any) =>
                        //     selectedPlanIds.includes(plan._id)
                        //   )
                        //   .map((plan: any) => ({
                        //     value: plan._id,
                        //     label: `${plan.name} - ${plan.planType}`,
                        //   }))}
                        // onChange={(selected) => {
                        //   const newPlanIds = selected.map(
                        //     (option) => option.value
                        //   );
                        //   const updatedPlans = [
                        //     ...new Set([...selectedPlanIds, ...newPlanIds]),
                        //   ];
                        //   setSelectedPlanIds(updatedPlans);
                        //   onChange(updatedPlans);
                        // }}
                        options={availablePlans.map((plan: any) => ({
                          value: plan._id,
                          label: `${plan.name} - ${plan.planType}`,
                        }))}
                        value={plans
                          .filter((plan: any) =>
                            selectedPlanIds.includes(plan._id)
                          )
                          .map((plan: any) => ({
                            value: plan._id,
                            label: `${plan.name} - ${plan.planType}`,
                          }))}
                        onChange={(selected) => {
                          const newPlanIds = selected.map(
                            (option) => option.value
                          );
                          setSelectedPlanIds(newPlanIds);
                          onChange(newPlanIds);
                        }}
                        placeholder="Select plans..."
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={isLoading}>
          Create Coupon
          {isLoading && <SpinnerMini />}
        </Button>
      </form>
    </Form>
  );
};

export default CouponForm;
