"use client";
import { memberSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { EMERGENCY_SELECT_GROUP, GENDER_RADIO_GROUP } from "@/constants";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  dateOfBirth: new Date(),
  gender: "male" as "male" | "female",
  address: {
    street: "",
    city: "",
    state: "",
  },
  emergencyContact: {
    fullName: "",
    phoneNumber: "",
    relationship: "",
  },
  currentSubscription: {
    plan: "",
    startDate: new Date(),
    endDate: new Date(),
  },
};

const SignUpForm = () => {
  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof memberSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          control={form.control}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Password"
          name="password"
          inputType="password"
          control={form.control}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.RADIO}
          label="Gender"
          name="gender"
          control={form.control}
          items={GENDER_RADIO_GROUP}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Date-Of-Birth"
          name="dateOfBirth"
          control={form.control}
          inputType="date"
        ></CustomFormField>
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
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          label=""
          name={"currentSubscription.startDate"}
          control={form.control}
        ></CustomFormField>
      </form>
    </Form>
  );
};

export default SignUpForm;
