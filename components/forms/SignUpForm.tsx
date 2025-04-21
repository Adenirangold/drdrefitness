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
import { usePlans } from "@/hooks/usePlan";
import { useAuthenticatedUser } from "@/hooks/useUser";
type ActionType = "edit" | "sign-up" | "group" | "admin";

const SignUpForm = ({
  type,

  formParams,
}: {
  type: ActionType;
  formParams?: any;
}) => {
  const {
    data: usePlanData,
    isLoading: planIsLoading,
    isError: planIsError,
    error: planError,
  } = usePlans();
  const {
    data: useAuthenticatedUserData,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
  } = useAuthenticatedUser();

  const userData = useAuthenticatedUserData?.data;

  const planData = usePlanData?.data || [];
  const { id, token } = formParams ?? {};
  const selectNeeded = type === "admin" || type === "sign-up";
  const edit = type === "edit";

  const defaultValues = {
    firstName: edit ? userData?.firstName : "",
    lastName: edit ? userData?.lastName : "",
    email: edit ? userData?.email : "",
    password: edit ? "1234567" : "",
    phoneNumber: edit ? userData?.phoneNumber : "",
    dateOfBirth: edit
      ? userData?.dateOfBirth
        ? new Date(userData.dateOfBirth)
        : undefined
      : undefined,
    gender: edit ? userData?.gender ?? "male" : "male",
    address: {
      street: edit ? userData?.address?.street : "",
      city: edit ? userData?.address?.city : "",
      state: edit ? userData?.address?.state : "",
    },
    emergencyContact: {
      fullName: edit ? userData?.emergencyContact?.fullName : "",
      phoneNumber: edit ? userData?.emergencyContact?.phoneNumber : "",
      relationship: edit ? userData?.emergencyContact?.relationship : "",
    },
  };

  const sigupSchema = edit ? memberUpdateSchema : memberSchema;
  const form = useForm<z.infer<typeof sigupSchema>>({
    resolver: zodResolver(sigupSchema),
    defaultValues,
  });
  const selectedLocation =
    form.watch("currentSubscription.gymLocation") || "ilorin";
  const branchOption = getBranchOptions(planData, selectedLocation);
  const nameOption = getPlanNameOptions(planData);
  const planTypeOption = getPlanTypeOptions(planData);
  const locationOption = getLocationOptions(planData);

  async function onSubmit(values: z.infer<typeof sigupSchema>) {
    console.log(values);

    if (type === "edit") {
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
    } else if (type === "sign-up") {
      const data = {
        ...values,
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
              name={"currentSubscription.gymLocation"}
              control={form.control}
              items={locationOption}
            ></CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              placeholder="Choose Your Branch"
              label="Branch"
              name={"currentSubscription.gymBranch"}
              control={form.control}
              items={branchOption}
            ></CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              label="Plan Type"
              name={"currentSubscription.planType"}
              placeholder="Choose Your Plan Type"
              control={form.control}
              items={planTypeOption}
            ></CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              label="Plan Name"
              name={"currentSubscription.name"}
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
