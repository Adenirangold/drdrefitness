"use client";
import { adminSchema, loginSchema } from "@/lib/schema";
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
import { getBranches, locationItems } from "@/lib/utils";

const defaultValues = {
  email: "",
  password: "",
};

const AdminForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues,
  });

  const selectedLocation = form.watch("adminLocation") || "ilorin";
  const branchesItems = getBranches(selectedLocation);

  async function onSubmit(values: z.infer<typeof adminSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          placeholder="Choose Location"
          label="Location"
          name={"adminLocation"}
          control={form.control}
          items={locationItems}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          placeholder="Choose Branch"
          label="Branch"
          name={"adminBranch"}
          control={form.control}
          items={branchesItems}
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
        <Button type="submit">
          {/* {isLoading ? <SpinnerMini></SpinnerMini> : "Log In"} */}
          Create Admin
        </Button>
      </form>
    </Form>
  );
};

export default AdminForm;
