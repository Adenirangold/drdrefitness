"use client";
import { passwordresetSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { ResetPasswordAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

const defaultValues = {
  newPassword: "",
  confirmPassword: "",
};

const RequestPasswordForm = ({ resetToken }: { resetToken: string }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof passwordresetSchema>>({
    resolver: zodResolver(passwordresetSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof passwordresetSchema>) {
    console.log(values);
    const data = { ...values };
    const result = await ResetPasswordAction(data, resetToken);

    if (result.error) {
      console.log(result.error);
      return;
    }

    router.replace("/sign-in");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

export default RequestPasswordForm;
