"use client";
import { adminSchema, adminSchemaUpdate, loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import SpinnerMini from "../SpinnerMini";
import { getBranches, getDirtyData, locationItems } from "@/lib/utils";
import { useAddAdmin, useEditAdmin } from "@/hooks/useAdmin";
import { useToast } from "@/hooks/use-toast";

const AdminForm = ({
  edit,
  data,
  closeModal,
}: {
  edit?: boolean;
  data?: AdminData;
  closeModal?: () => void;
}) => {
  const [openModal, setOpenModal] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const addAdminMutation = useAddAdmin();
  const editAdminMutation = useEditAdmin();
  const [isloading, setIsLoading] = useState(false);

  const defaultValues = {
    email: edit ? data?.email : "",
    phoneNumber: edit ? data?.phoneNumber : "",
    password: edit ? "********" : "",
    adminLocation: {
      branch: edit ? data?.adminLocation.branch : "",
      location: edit ? data?.adminLocation.location : "",
    },
  };
  const adminFormSchema = edit ? adminSchemaUpdate : adminSchema;
  const form = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues,
  });

  const selectedLocation = form.watch("adminLocation.location") || "ilorin";
  const branchesItems = useMemo(
    () => getBranches(selectedLocation),
    [selectedLocation]
  );

  async function onSubmit(values: z.infer<typeof adminFormSchema>) {
    setIsLoading(true);
    // console.log(values);

    if (edit) {
      const dirtyFields = form.formState.dirtyFields;
      const updateData = getDirtyData(values, dirtyFields);
      const updatedData = {
        ...updateData,
        _id: data?._id,
      };

      editAdminMutation.mutate(updatedData, {
        onSuccess: () => {
          if (closeModal) {
            closeModal();
          }
          toast({
            title: "Success",
            description: "Your changes were saved successfully",
          });
        },
        onError: (error) => {
          setIsLoading(false);
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
          return;
        },
      });
    } else {
      const data = {
        email: values.email!,
        password: values.password!,
        firstName: values.adminLocation?.branch!,
        lastName: "branch",
        role: "admin",
        phoneNumber: values.phoneNumber!,
        adminLocation: {
          location: values.adminLocation?.location!,
          branch: values.adminLocation?.branch!,
        },
      };

      addAdminMutation.mutate(data, {
        onSuccess: () => {
          router.push("/director/manage-admins");
          toast({
            title: "Success",
            description: "Admin Added successfully",
          });
        },
        onError: (error) => {
          setIsLoading(false);
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
          return;
        },
      });
    }
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
          disabled={edit}
        ></CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          label="Password"
          name="password"
          inputType="password"
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
          fieldType={FormFieldType.SELECT}
          placeholder="Choose Location"
          label="Location"
          disabled={edit}
          name={"adminLocation.location"}
          control={form.control}
          items={locationItems}
        ></CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          placeholder="Choose Branch"
          label="Branch"
          disabled={edit}
          name={"adminLocation.branch"}
          control={form.control}
          items={branchesItems}
        ></CustomFormField>

        <Button type="submit">
          {isloading ? (
            <SpinnerMini></SpinnerMini>
          ) : edit ? (
            "Edit Admin"
          ) : (
            "Add Admin"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AdminForm;
