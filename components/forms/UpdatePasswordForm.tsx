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
import { useUpdateMemberPassword } from "@/hooks/useUser";
import SpinnerMini from "../SpinnerMini";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/context/LoadingContext";

const defaultValues = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

const UpdatePasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useUpdateMemberPassword();
  const form = useForm<z.infer<typeof passwordUpdateSchema>>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof passwordUpdateSchema>) {
    console.log(values);
    const data = {
      newPassword: values.confirmPassword,
      password: values.password,
    };

    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password updated successfully",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
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
        <Button type="submit">
          Update Password
          {isPending && <SpinnerMini></SpinnerMini>}
        </Button>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
