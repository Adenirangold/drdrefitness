"use client";
import { memberSchema, memberUpdateSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { EMERGENCY_SELECT_GROUP, GENDER_RADIO_GROUP } from "@/constants";
import { Button } from "../ui/button";
import { config } from "@/lib/config";
import {
  MemberAcceptInviteAction,
  memberUpdateAction,
  signUpAction,
} from "@/lib/actions";
import {
  getBranchOptions,
  getDirtyData,
  getLocationOptions,
  getPlanNameOptions,
  getPlanTypeOptions,
} from "@/lib/utils";
import { usePlans } from "@/lib/hooks/usePlan";
type ActionType = "edit" | "sign-up" | "group" | "admin";

const SignUpForm = ({
  type,
  data,
  formParams,
}: {
  type: ActionType;
  formParams?: any;
  data?: Partial<UserData>;
}) => {
  const { data: usePlanData, isLoading, isError, error } = usePlans();
  const planData = usePlanData?.data || [];
  const { id, token } = formParams ?? {};
  const selectNeeded = type === "admin" || type === "sign-up";
  const edit = type === "edit";

  const defaultValues = {
    firstName: edit ? data?.firstName : "",
    lastName: edit ? data?.lastName : "",
    email: edit ? data?.email : "",
    password: edit ? "1234567" : "",
    phoneNumber: edit ? data?.phoneNumber : "",
    dateOfBirth: edit
      ? data?.dateOfBirth
        ? new Date(data.dateOfBirth)
        : new Date()
      : new Date(),
    gender: edit ? data?.gender ?? "male" : "male",
    address: {
      street: edit ? data?.address?.street : "",
      city: edit ? data?.address?.city : "",
      state: edit ? data?.address?.state : "",
    },
    emergencyContact: {
      fullName: edit ? data?.emergencyContact?.fullName : "",
      phoneNumber: edit ? data?.emergencyContact?.phoneNumber : "",
      relationship: edit ? data?.emergencyContact?.relationship : "",
    },
  };

  const sigupSchema = edit ? memberUpdateSchema : memberSchema;
  const form = useForm<z.infer<typeof sigupSchema>>({
    resolver: zodResolver(sigupSchema),
    defaultValues,
  });
  const selectedLocation =
    form.watch("subscriptionPlan.gymLocation") || "ilorin";
  const branchOption = getBranchOptions(planData, selectedLocation);
  const nameOption = getPlanNameOptions(planData);
  const planTypeOption = getPlanTypeOptions(planData);
  const locationOption = getLocationOptions(planData);

  async function onSubmit(values: z.infer<typeof sigupSchema>) {
    console.log(values);

    if (edit) {
      const dirtyFields = form.formState.dirtyFields;
      const updateData = getDirtyData(values, dirtyFields);

      const data = {
        ...updateData,
      };
      const result = await memberUpdateAction(data);
      if (result.error) {
        console.log(result.error);
        return;
      }
      console.log(result.data?.message);
    } else if (type === "group") {
      const data = {
        ...values,
      };
      const result = await MemberAcceptInviteAction(data, token, id);
      if (result.error) {
        console.log(result.error);
        return;
      }
      console.log(result.data?.message);
    } else {
      const data = {
        ...values,
        currentSubscription: {
          plan: "67d19044aa1d17317dc3c4f2",
          startDate: new Date(),
        },
      };

      const result = await signUpAction(data);
      if (result.error) {
        console.log(result.error);
        return;
      }
      const paymentType = "signup";
      document.cookie = `paymentType=${paymentType}; path=/; max-age=3600`;

      window.location.href = result.data?.authorizationUrl;
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {selectNeeded && (
          <div>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              placeholder="Choose Your Location"
              label="Location"
              name={"subscriptionPlan.gymLocation"}
              control={form.control}
              items={locationOption}
            ></CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              placeholder="Choose Your Branch"
              label="Branch"
              name={"subscriptionPlan.gymBranch"}
              control={form.control}
              items={branchOption}
            ></CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              label="Plan Type"
              name={"subscriptionPlan.planType"}
              placeholder="Choose Your Plan Type"
              control={form.control}
              items={planTypeOption}
            ></CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              label="Plan Name"
              name={"subscriptionPlan.name"}
              placeholder="Choose Your Plan"
              control={form.control}
              items={nameOption}
            ></CustomFormField>
          </div>
        )}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="First Name"
          name="firstName"
          control={form.control}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Last Name"
          name="lastName"
          control={form.control}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Phone Number"
          name="phoneNumber"
          inputType="number"
          control={form.control}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Email"
          name="email"
          inputType="email"
          disabled={edit}
          control={form.control}
        ></CustomFormField>
        {!edit && (
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            label="Password"
            name="password"
            inputType="password"
            control={form.control}
          ></CustomFormField>
        )}
        <CustomFormField
          fieldType={FormFieldType.RADIO}
          label="Gender"
          name="gender"
          control={form.control}
          items={GENDER_RADIO_GROUP}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="dateOfBirth"
          label="Date-Of-Birth"
          placeholder="mm/dd/yyyy"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Street"
          name={"address.street"}
          control={form.control}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="City"
          name={"address.city"}
          control={form.control}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="State"
          name={"address.state"}
          control={form.control}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Full Name"
          name={"emergencyContact.fullName"}
          control={form.control}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Phone Number"
          name={"emergencyContact.phoneNumber"}
          inputType="number"
          control={form.control}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          label="Relationship"
          name={"emergencyContact.relationship"}
          control={form.control}
          items={EMERGENCY_SELECT_GROUP}
        ></CustomFormField>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
