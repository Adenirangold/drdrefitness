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
    plan: string;
    startDate: Date;
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
