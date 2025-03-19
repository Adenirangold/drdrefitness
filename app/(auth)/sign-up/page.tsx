import { memberSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  dateOfBirth: new Date(),
  gender: "male" as "male" | "female",
  address: {
    street: "",
    city: "",
    state: "",
    country: "",
  },
  emergencyContact: {
    fullName: "",
    phoneNumber: "",
    relationship: "",
  },
  currentSubscription: {
    plan: "",
    startDate: new Date(),
    endDate: new Date(),
  },
};

const form = useForm<z.infer<typeof memberSchema>>({
  resolver: zodResolver(memberSchema),
  defaultValues,
});

const signUpPage = () => {
  return <div>signUpPage</div>;
};

export default signUpPage;
