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

  isGroup?: boolean;
  groupRole?: string;

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
  price: number;
  benefits?: string[];
  duration: number;
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

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  isActive?: boolean;
  restrictTo?: {
    isGroup: boolean;
    groupRole?: string;
  };
}

interface AdminData {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  adminLocation: {
    location: string;
    branch: string;
  };
}
