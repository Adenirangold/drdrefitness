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
  Ticket,
  TicketPlus,
  Clipboard,
  ClipboardPlus,
  ChartNoAxesCombined,
  QrCode,
  UserCheck,
  AlarmClockPlus,
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
    title: "Subscription History",
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
    title: "Logger",
    url: "/admin/logger",
    icon: UserCheck,
  },
  {
    title: "QR Code",
    url: "/admin/qrcode",
    icon: QrCode,
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
    title: "Create Plan",
    url: "/director/create-plan",
    icon: ClipboardPlus,
  },
  {
    title: "Plan Management",
    url: "/director/manage-plans",
    icon: Clipboard,
  },
  {
    title: "Create Admin",
    url: "/director/create-admin",
    icon: UserPlus,
  },
  {
    title: "Admin Management",
    url: "/director/manage-admins",
    icon: User,
  },

  {
    title: "Create Coupons",
    url: "/director/create-coupon",
    icon: TicketPlus,
  },
  {
    title: "Manage Coupons",
    url: "/director/manage-coupon",
    icon: Ticket,
  },
  {
    title: "Check-in Station",
    url: "/director/manage-stations",
    icon: AlarmClockPlus,
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

export const NIGERIA_STATES = [
  { label: "Abia", value: "abia" },
  { label: "Adamawa", value: "adamawa" },
  { label: "Akwa Ibom", value: "akwa ibom" },
  { label: "Anambra", value: "anambra" },
  { label: "Bauchi", value: "bauchi" },
  { label: "Bayelsa", value: "bayelsa" },
  { label: "Benue", value: "benue" },
  { label: "Borno", value: "borno" },
  { label: "Cross River", value: "cross river" },
  { label: "Delta", value: "delta" },
  { label: "Ebonyi", value: "ebonyi" },
  { label: "Edo", value: "edo" },
  { label: "Ekiti", value: "ekiti" },
  { label: "Enugu", value: "enugu" },
  { label: "Gombe", value: "gombe" },
  { label: "Imo", value: "imo" },
  { label: "Jigawa", value: "jigawa" },
  { label: "Kaduna", value: "kaduna" },
  { label: "Kano", value: "kano" },
  { label: "Katsina", value: "katsina" },
  { label: "Kebbi", value: "kebbi" },
  { label: "Kogi", value: "kogi" },
  { label: "Kwara", value: "kwara" },
  { label: "Lagos", value: "lagos" },
  { label: "Nasarawa", value: "nasarawa" },
  { label: "Niger", value: "niger" },
  { label: "Ogun", value: "ogun" },
  { label: "Ondo", value: "ondo" },
  { label: "Osun", value: "osun" },
  { label: "Oyo", value: "oyo" },
  { label: "Plateau", value: "plateau" },
  { label: "Rivers", value: "rivers" },
  { label: "Sokoto", value: "sokoto" },
  { label: "Taraba", value: "taraba" },
  { label: "Yobe", value: "yobe" },
  { label: "Zamfara", value: "zamfara" },
  { label: "FCT", value: "federal capital territory" },
];
