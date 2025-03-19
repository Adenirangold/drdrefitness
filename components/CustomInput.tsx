import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CustomInput = ({
  label,
  name,
  control,
  description,
  placeholder,
  disabled,
}: CustomProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={name === "password" ? "password" : "text"}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
