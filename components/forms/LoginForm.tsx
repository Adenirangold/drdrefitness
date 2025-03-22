"use client";
import { loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
      </form>
    </Form>
  );
};

export default LoginForm;
