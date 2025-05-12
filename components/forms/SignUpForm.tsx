"use client";
import { memberSchema, memberUpdateSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import {
  EMERGENCY_SELECT_GROUP,
  GENDER_RADIO_GROUP,
  NIGERIA_STATES,
} from "@/constants";
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
import { useAuthenticatedUser, useUpdateMember } from "@/hooks/useUser";
import Spinner from "../Spinner";
import SpinnerMini from "../SpinnerMini";
import { useToast } from "@/hooks/use-toast";

type ActionType = "edit" | "sign-up" | "group" | "admin";

interface SignUpFormProps {
  type: ActionType;
  formParams?: { id?: string; token?: string };
}

const SignUpForm: React.FC<SignUpFormProps> = ({ type, formParams = {} }) => {
  const { toast } = useToast();

  const isSelectNeeded = type === "admin" || type === "sign-up";
  const isEditMode = type === "edit";

  const {
    data: planData,
    isLoading: planIsLoading,
    isError: planIsError,
    error: planError,
  } = isSelectNeeded
    ? usePlans()
    : { data: null, isLoading: false, isError: false, error: null };

  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
  } = isEditMode
    ? useAuthenticatedUser()
    : { data: null, isLoading: false, isError: false, error: null };

  const { mutate, isPending } = useUpdateMember();

  const schema = isEditMode ? memberUpdateSchema : memberSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: isEditMode ? userData?.data?.firstName ?? "" : "",
      lastName: isEditMode ? userData?.data?.lastName ?? "" : "",
      email: isEditMode ? userData?.data?.email ?? "" : "",
      password: isEditMode ? "1234567" : "",
      phoneNumber: isEditMode ? userData?.data?.phoneNumber ?? "" : "",
      dateOfBirth:
        isEditMode && userData?.data?.dateOfBirth
          ? new Date(userData.data.dateOfBirth)
          : undefined,
      gender: isEditMode ? userData?.data?.gender ?? "male" : "male",
      address: {
        street: isEditMode ? userData?.data?.address?.street ?? "" : "",
        city: isEditMode ? userData?.data?.address?.city ?? "" : "",
        state: isEditMode ? userData?.data?.address?.state ?? "" : "",
      },
      emergencyContact: {
        fullName: isEditMode
          ? userData?.data?.emergencyContact?.fullName ?? ""
          : "",
        phoneNumber: isEditMode
          ? userData?.data?.emergencyContact?.phoneNumber ?? ""
          : "",
        relationship: isEditMode
          ? userData?.data?.emergencyContact?.relationship ?? ""
          : "",
      },
    },
  });

  const selectedLocation =
    form.watch("currentSubscription.gymLocation") || "ilorin";
  const branchOptions = getBranchOptions(
    planData?.data ?? [],
    selectedLocation
  );
  const nameOptions = getPlanNameOptions(planData?.data ?? []);
  const planTypeOptions = getPlanTypeOptions(planData?.data ?? []);
  const locationOptions = getLocationOptions(planData?.data ?? []);

  const isLoading = isPending || planIsLoading || userIsLoading;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      if (isEditMode) {
        const dirtyFields = form.formState.dirtyFields;
        const updateData = getDirtyData(values, dirtyFields);
        await mutate(updateData);
      } else if (type === "group") {
        const result = await MemberAcceptInviteAction(
          values,
          formParams.token!,
          formParams.id!
        );
        if (result.error) {
          console.log(result.data?.message);
          toast({
            title: "Error",
            description: result.data?.message,
            variant: "destructive",
          });
          throw new Error(result.error);
        }
      } else if (type === "sign-up") {
        const result = await signUpAction(values);
        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
          throw new Error(result.error);
        }
        document.cookie = `paymentRedirectType=signup; path=/; max-age=3600; SameSite=Lax; Secure`;
        window.location.href = result.data?.authorizationUrl ?? "/";
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  if (planIsError || userIsError) {
    return (
      <div>
        Error:{" "}
        {planError?.message || userError?.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl mx-auto"
      >
        {isSelectNeeded && (
          <div className="space-y-4">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              placeholder="Choose Your Location"
              label="Location"
              name="currentSubscription.gymLocation"
              control={form.control}
              items={locationOptions}
            />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              placeholder="Choose Your Branch"
              label="Branch"
              name="currentSubscription.gymBranch"
              control={form.control}
              items={branchOptions}
            />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              label="Plan Type"
              name="currentSubscription.planType"
              placeholder="Choose Your Plan Type"
              control={form.control}
              items={planTypeOptions}
            />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              label="Plan Name"
              name="currentSubscription.name"
              placeholder="Choose Your Plan"
              control={form.control}
              items={nameOptions}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            label="First Name"
            name="firstName"
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            label="Last Name"
            name="lastName"
            control={form.control}
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Phone Number"
          name="phoneNumber"
          inputType="tel"
          control={form.control}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Email"
          name="email"
          inputType="email"
          disabled={isEditMode}
          control={form.control}
        />
        {!isEditMode && (
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            label="Password"
            name="password"
            inputType="password"
            control={form.control}
          />
        )}
        <CustomFormField
          fieldType={FormFieldType.RADIO}
          label="Gender"
          name="gender"
          control={form.control}
          items={GENDER_RADIO_GROUP}
        />
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="dateOfBirth"
          label="Date of Birth"
          placeholder="mm/dd/yyyy"
        />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Address</h3>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            label="Street"
            name="address.street"
            control={form.control}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              label="City"
              name="address.city"
              control={form.control}
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              label="State"
              name="address.state"
              control={form.control}
              items={NIGERIA_STATES}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Emergency Contact</h3>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            label="Full Name"
            name="emergencyContact.fullName"
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            label="Phone Number"
            name="emergencyContact.phoneNumber"
            inputType="tel"
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            label="Relationship"
            name="emergencyContact.relationship"
            control={form.control}
            items={EMERGENCY_SELECT_GROUP}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <SpinnerMini /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
