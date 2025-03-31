"use client";
import { loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { loginAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    const data = { ...values };
    const result = await loginAction(data);

    if (result.error) {
      console.log(result.error);
      return;
    }
    router.push("/member");
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
