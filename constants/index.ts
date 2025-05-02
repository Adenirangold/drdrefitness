import { planSchema } from "@/lib/schema";
import {
  CreditCard,
  Edit,
  LayoutDashboard,
  Lock,
  RefreshCw,
  User,
  UserPlus,
  Users,
  Settings,
  Clipboard,
  ClipboardPlus,
  ChartNoAxesCombined,
} from "lucide-react";

export const GENDER_RADIO_GROUP = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
];
export const EMERGENCY_SELECT_GROUP = [
  {
    value: "sibling",
    label: "Sibling",
  },
  {
    value: "father",
    label: "Father",
  },
  {
    value: "mother",
    label: "Mother",
  },
  {
    value: "relative",
    label: "Relative",
  },
  {
    value: "partner",
    label: "Partner",
  },
  {
    value: "spouse",
    label: "Spouse",
  },
  {
    value: "friend",
    label: "Friend",
  },
];

export const MEMBER_NAV = [
  {
    title: "Dashboard",
    url: "/member/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Resubscribe Gym Plan",
    url: "/member/resubscription",
    icon: RefreshCw,
  },
  {
    title: "Edit Profile",
    url: "/member/edit-details",
    icon: Edit,
  },
  {
    title: "Invite Group Member",
    url: "/member/invite-member",
    icon: UserPlus,
    restrictTo: {
      isGroup: true,
      groupRole: "primary",
    },
  },
  {
    title: "View Group Members",
    url: "/member/group-members",
    icon: Users,
    restrictTo: {
      isGroup: true,
      groupRole: "primary",
    },
  },
  {
    title: "Update Password",
    url: "/member/update-password",
    icon: Lock,
  },
  {
    title: "Gym Subscriptions",
    url: "/member/subscriptions",
    icon: CreditCard,
  },
];
export const ADMIN_NAV = [
  {
    title: "Members Overview",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Add Member",
    url: "/admin/users",
    icon: UserPlus,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export const DIRECTOR_NAV = [
  {
    title: "Members Overview",
    url: "/director/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Analytics Reports",
    url: "/director/financial-metric",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Plan Management",
    url: "/director/manage-plans",
    icon: Clipboard,
  },
  {
    title: "Create Plan",
    url: "/director/create-plan",
    icon: ClipboardPlus,
  },
  {
    title: "Admin Management",
    url: "/director/manage-admins",
    icon: User,
  },
  {
    title: "Create Admin",
    url: "/director/create-admin",
    icon: UserPlus,
  },
];

export const CurrentLocations = [
  { location: "abuja", branch: ["wuse", "gwarinpa"] },
  { location: "ilorin", branch: ["gra", "tanke", "kwara-poly"] },
  { location: "lagos", branch: ["osapa", "lekki", "oshodi"] },
];
export const PlanName = [
  { name: "monthly", duration: 31 },
  { name: "2-months", duration: 61 },
  { name: "3-months", duration: 93 },
  { name: "6-months", duration: 184 },
  { name: "1-year", duration: 365 },
];
export const PlanType = ["individual", "couple", "family"];
