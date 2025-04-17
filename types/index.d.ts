interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female";
  address?: {
    street?: string;
    city?: string;
    state?: string;
  };
  emergencyContact?: {
    fullName: string;
    phoneNumber: string;
    relationship: string;
  };
  currentSubscription?: {
    planType: string;
    name: string;
    gymLocation: string;
    gymBranch: string;
  };
}

interface LoginData {
  email: string;
  password: string;
}

interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}
interface UpdatePasswordData {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
interface EmailALoneData {
  email: string;
}
interface PlanData {
  _id?: string;
  planId?: string;
  name: string;
  planType: "individual" | "couple" | "family";
  gymLocation: string;
  gymBranch: string;
  price?: number;
  benefit?: [string];
  duration?: number;
}

interface ActivationData {
  name?: string;
  planType?: string;
  gymLocation?: string;
  gymBranch?: string;
}

interface SelectOption {
  value: string;
  label: string;
}
interface idAloneData {
  id: string;
}
