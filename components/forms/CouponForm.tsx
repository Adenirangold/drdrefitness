"use client";
import { couponSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useMemo, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { set, z } from "zod";
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
import { capitalizeAllLetters } from "@/lib/utils";
import { X } from "lucide-react";
import { useAddCoupons } from "@/hooks/useCoupons";

const CouponForm = ({
  edit,
  data,
  closeModal,
}: {
  edit?: boolean;
  data?: CouponData;
  closeModal?: () => void;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([]);
  const { data: planData, isLoading: planIsLoading } = usePlans();
  const couponMutation = useAddCoupons();

  const plans = useMemo(() => planData?.data || [], [planData]);
  const applicablePlansIds =
    data?.applicablePlans.map((plan: any) => plan._id) || [];

  const form = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: edit ? data?.code : "",
      discountType: edit
        ? data?.discountType === "percentage" || data?.discountType === "fixed"
          ? data?.discountType
          : "percentage"
        : "percentage",
      discountValue: edit ? data?.discountValue : 0,
      validFrom: edit ? data?.validFrom : new Date(),
      validUntil: edit ? data?.validUntil : new Date(),
      maxUses: edit ? data?.maxUses || 0 : 0,
      applicablePlans: edit ? applicablePlansIds : [],
    },
  });

  const locations = useMemo(
    () => Array.from(new Set(plans.map((plan: PlanData) => plan.gymLocation))),
    [plans]
  );

  const branches = useMemo(
    () =>
      selectedLocation
        ? Array.from(
            new Set(
              plans
                .filter(
                  (plan: PlanData) => plan.gymLocation === selectedLocation
                )
                .map((plan: PlanData) => plan.gymBranch)
            )
          )
        : [],
    [plans, selectedLocation]
  );

  const availablePlans = useMemo(
    () =>
      selectedBranch
        ? plans.filter(
            (plan: PlanData) =>
              plan.gymBranch === selectedBranch &&
              plan.gymLocation === selectedLocation
          )
        : [],
    [plans, selectedBranch, selectedLocation]
  );

  const selectedPlansByBranch = useMemo(
    () =>
      plans
        .filter((plan: any) => selectedPlanIds.includes(plan._id))
        .reduce((acc: any, plan: any) => {
          const branch = plan.gymBranch;
          if (!acc[branch]) {
            acc[branch] = { location: plan.gymLocation, plans: [] };
          }
          acc[branch].plans.push(plan);
          return acc;
        }, {} as Record<string, { location: string; plans: any }>),
    [plans, selectedPlanIds]
  );

  const handleSubmit = useCallback(
    async (values: z.infer<typeof couponSchema>) => {
      setIsLoading(true);
      if (values.applicablePlans.length === 0) {
        form.setError("applicablePlans", {
          message: "Please select at least one plan",
        });
        setIsLoading(false);
        return;
      }
      const data = {
        ...values,
        maxUses: values.maxUses === 0 ? null : values.maxUses,
      };

      couponMutation.mutate(data, {
        onSuccess: () => {
          setIsLoading(false);
          toast({
            title: "Success",
            description: "Coupon created successfully",
          });
          form.reset();
          setSelectedBranch("");
          setSelectedLocation("");
          setSelectedPlanIds([]);
        },
        onError: (error) => {
          setIsLoading(false);
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    },
    [couponMutation, form, toast]
  );

  const handleLocationChange = useCallback((value: string) => {
    setSelectedLocation(value);
    setSelectedBranch("");
    // Do not reset selectedPlanIds or applicablePlans to persist selections
  }, []);

  const handleBranchChange = useCallback((value: string) => {
    setSelectedBranch(value);
    // Do not reset selectedPlanIds or applicablePlans to persist selections
  }, []);

  const handlePlanChange = useCallback(
    (selected: any) => {
      const newPlanIds = selected.map((option: any) => option.value);
      setSelectedPlanIds(newPlanIds);
      form.setValue("applicablePlans", newPlanIds);
    },
    [form]
  );

  const removePlan = useCallback(
    (planId: string) => {
      const newPlans = selectedPlanIds.filter((id) => id !== planId);
      setSelectedPlanIds(newPlans);
      form.setValue("applicablePlans", newPlans);
    },
    [selectedPlanIds, form]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
          placeholder="Enter discount value"
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
          placeholder="Leave empty for unlimited uses"
        />

        {planIsLoading || !planData ? (
          <div className="flex justify-center items-center">
            <SpinnerMini />
          </div>
        ) : (
          <>
            <FormItem>
              <FormLabel>Gym Location</FormLabel>
              <Select
                onValueChange={handleLocationChange}
                value={selectedLocation}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a location" />
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

            {
              <FormItem>
                <FormLabel>Gym Branch</FormLabel>
                <Select
                  onValueChange={handleBranchChange}
                  value={selectedBranch}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a branch" />
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
            }

            {
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
                        rules={{
                          validate: (value) =>
                            value.length > 0 ||
                            "Please select at least one plan",
                        }}
                        render={({ field: { value } }) => (
                          <CustomSelect
                            isMulti
                            options={availablePlans.map((plan: any) => ({
                              value: plan._id,
                              label: `${capitalizeAllLetters(
                                plan.gymBranch
                              )} BRANCH-${plan.planType}-${plan.name}`,
                            }))}
                            value={plans
                              .filter((plan: any) =>
                                selectedPlanIds.includes(plan._id)
                              )
                              .map((plan: any) => ({
                                value: plan._id,
                                label: `${capitalizeAllLetters(
                                  plan.gymBranch
                                )} BRANCH-${plan.planType}-${plan.name}`,
                              }))}
                            onChange={handlePlanChange}
                            placeholder="Choose plans"
                            className="basic-multi-select"
                            classNamePrefix="select"
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 font-medium" />
                  </FormItem>
                )}
              />
            }

            {Object.keys(selectedPlansByBranch).length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Selected Plans
                </h2>
                {(
                  Object.entries(selectedPlansByBranch) as Array<
                    [string, { location: string; plans: any[] }]
                  >
                ).map(([branch, { location, plans }]) => (
                  <div
                    key={branch}
                    className="mb-4 border border-gray-200 rounded-lg shadow-sm bg-white p-4"
                  >
                    <div className="border-b border-gray-200 pb-2 mb-3">
                      <h3 className="text-base font-medium text-gray-900">
                        {branch}{" "}
                        <span className="text-gray-500">({location})</span>
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {plans.map((plan: any) => (
                        <div
                          key={plan._id}
                          className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md"
                        >
                          <span className="text-sm text-gray-700">
                            {plan.name} - {plan.planType}
                          </span>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removePlan(plan._id)}
                            className="h-6 w-6 p-0 flex items-center justify-center"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
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
