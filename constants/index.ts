import {
  CreditCard,
  Edit,
  LayoutDashboard,
  Lock,
  RefreshCw,
  UserPlus,
  Users,
  Settings,
  BarChart,
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
    title: "Admin Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Manage Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export const DIRECTOR_NAV = [
  {
    title: "Director Dashboard",
    url: "/director/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Reports",
    url: "/director/reports",
    icon: BarChart,
  },
  {
    title: "Manage Admins",
    url: "/director/admins",
    icon: Users,
  },
];
