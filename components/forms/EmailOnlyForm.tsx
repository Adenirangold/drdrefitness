"use client";
import { emailAloneSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { forgotPasswordAction, MemberInviteAction } from "@/lib/actions";

type ActionType = "forgot-password" | "invite-member";

const EmailOnlyForm = ({ type }: { type: ActionType }) => {
  const defaultValues = {
    email: "",
  };
  const form = useForm<z.infer<typeof emailAloneSchema>>({
    resolver: zodResolver(emailAloneSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof emailAloneSchema>) {
    const data = {
      ...values,
    };
    let result;

    if (type === "forgot-password") {
      result = await forgotPasswordAction(data);
    }
    if (type === "invite-member") {
      result = await MemberInviteAction(data);
    }
    if (result?.error) {
      console.log(result?.error);
      return;
    }
    console.log(result?.data?.message);
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EmailOnlyForm;
