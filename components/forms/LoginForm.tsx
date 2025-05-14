"use client";
import { loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { loginAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import SpinnerMini from "../SpinnerMini";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/context/LoadingContext";

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    setIsLoading(true);

    const data = { ...values };

    const result = await loginAction(data);
    if (result?.error) {
      toast({
        title: "Login Failed",
        description: result.error,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const role = result.data?.role;

    router.replace(`/${role}/dashboard`);
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
        <Button type="submit">
          Log In
          {isLoading && <SpinnerMini></SpinnerMini>}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
