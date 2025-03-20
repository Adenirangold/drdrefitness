"use client";
import CustomInput from "@/components/CustomInput";
import { memberSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

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
    country: "",
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
        <CustomInput control={form.control} name="firstName"></CustomInput>
      </form>
    </Form>
  );
};

export default SignUpForm;
