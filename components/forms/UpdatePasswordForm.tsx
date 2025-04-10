"use client";
import { passwordUpdateSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { memberUpdatePasswordAction, ResetPasswordAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

const defaultValues = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

const UpdatePasswordForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof passwordUpdateSchema>>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof passwordUpdateSchema>) {
    console.log(values);
    const data = { ...values };
    const result = await memberUpdatePasswordAction(data);

    if (result.error) {
      console.log(result.error);
      return;
    }
    console.log(result.data?.message);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Previous Password"
          name="password"
          inputType="password"
          control={form.control}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="New Password"
          name="newPassword"
          inputType="password"
          control={form.control}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Confirm Password"
          name="confirmPassword"
          inputType="password"
          control={form.control}
        ></CustomFormField>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
