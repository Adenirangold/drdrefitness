import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

const emergencyContactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full Name is required")
    .max(100, "Full Name should not be more than 100 letters"),
  phoneNumber: z
    .string()
    .min(11, "Phone number should be at least 11 digits")
    .max(15),
  relationship: z.string().min(2, "Relationship is required"),
});

const healthInfoSchema = z.object({
  height: z.coerce.number().positive().optional(),
  weight: z.coerce.number().positive().optional(),
  medicalConditions: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
});

export const planSchema = z.object({
  planType: z.enum(["individual", "couple", "family"]).default("individual"),
  name: z.string().min(2).max(50),
  gymLocation: z.string().min(2).max(50),
  gymBranch: z.string().min(2).max(50),
  benefits: z.string().optional(),
  price: z.coerce.number().positive(),
  duration: z.coerce.number().positive().optional(),
});

export const currentSubscriptionPlanSchema = planSchema
  .pick({
    planType: true,
    name: true,
    gymBranch: true,
    gymLocation: true,
  })
  .extend({
    couponCode: z
      .string()
      .optional()
      .refine(
        (val) =>
          val === undefined || val.trim().length === 0 || val.trim().length > 0,
        {
          message: "Coupon code cannot be just spaces",
        }
      ),
  });

export const memberSchema = z.object({
  firstName: z
    .string()
    .min(2, "First Name is required")
    .max(50, "First Name should not be more than 50 letters"),
  lastName: z
    .string()
    .min(2, "Last Name is required")
    .max(50, "Last Name should not be more than 50 letters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z
    .string()
    .min(11, "Phone number should be at least 11 digits")
    .max(15),
  dateOfBirth: z.coerce.date(),
  gender: z.enum(["male", "female"]),
  address: addressSchema,
  emergencyContact: emergencyContactSchema,
  // healthInfo: healthInfoSchema.optional(),
  currentSubscription: currentSubscriptionPlanSchema.optional(),
});

export const loginSchema = memberSchema.pick({
  email: true,
  password: true,
});

export const passwordresetSchema = z
  .object({
    newPassword: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const emailAloneSchema = memberSchema.pick({
  email: true,
});

export const passwordUpdateSchema = z
  .object({
    password: z.string(),
    newPassword: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const memberUpdateSchema = memberSchema.partial();
export const planUpdateSchema = planSchema.partial();

export const resubscribePlanSchema = planSchema.partial().extend({
  couponCode: z
    .string()
    .optional()
    .refine(
      (val) =>
        val === undefined || val.trim().length === 0 || val.trim().length > 0,
      {
        message: "Coupon code cannot be just spaces",
      }
    ),
});

export const adminSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z
    .string()
    .min(11, "Phone number should be at least 11 digits")
    .max(15),

  adminLocation: z.object({
    location: z.string().min(2).max(50),
    branch: z.string().min(2).max(50),
  }),
});

export const StationSchema = z.object({
  gymLocation: z.string().min(2).max(50),
  gymBranch: z.string().min(2).max(50),
});

export const adminSchemaUpdate = adminSchema.partial();

export const dateSchema = z.object({
  date: z.coerce.date(),
});
