"use client";
import { emailAloneSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import {
  forgotPasswordAction,
  MemberAcceptInviteAction,
  MemberInviteAction,
} from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";
import SpinnerMini from "../SpinnerMini";

type ActionType = "forgot-password" | "invite-member" | "group";

const EmailOnlyForm = ({
  type,
  formParams,
}: {
  type: ActionType;
  formParams?: any;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();
  const { id, token } = formParams ?? {};
  const defaultValues = {
    email: "",
  };
  const form = useForm<z.infer<typeof emailAloneSchema>>({
    resolver: zodResolver(emailAloneSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof emailAloneSchema>) {
    setIsLoading(true);
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
    if (type === "group") {
      result = await MemberAcceptInviteAction(data, token, id);
    }
    if (result?.error) {
      setIsLoading(false);
      toast({
        title: "Something Went Wrong",
        description: result.error,
        variant: "destructive",
      });
      return;
    }
    if (type === "forgot-password") {
      toast({
        title: "Email Sent",
        description: "Check your email for further instructions",
      });
      form.reset();
    }
    if (type === "invite-member") {
      toast({
        title: "Invitation Sent",
        description:
          "The invitation has been sent successfully to the email you provided.",
      });
      form.reset();
    }
    if (type === "group") {
      toast({
        title: "Invitation Accepted",
        description: "You have successfully accepted the invitation",
      });
      router.replace("/member/dashboard");
    }
    setIsLoading(false);
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
        <Button type="submit">
          Submit
          {isLoading && <SpinnerMini></SpinnerMini>}
        </Button>
      </form>
    </Form>
  );
};

export default EmailOnlyForm;
