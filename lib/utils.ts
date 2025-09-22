import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { config } from "./config";
import { CurrentLocations, PlanName, PlanType } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchData(endpoint: string, options: RequestInit = {}) {
  const url = `${config.API_KEY}${endpoint}`;
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Something went wrong. Please try again later"
      );
    }

    const responseData = await response.json();

    if (responseData.status && responseData.status !== "success") {
      throw new Error(
        responseData.message || "Something went wrong. Please try again later"
      );
    }

    return { data: responseData };
  } catch (error: any) {
    return {
      error: error.message || "Something went wrong. Please try again later.",
    };
  }
}

export function getDirtyData<T>(
  values: T,
  dirtyFields: Record<string, any>
): Partial<T> {
  const result: Partial<T> = {};

  for (const key in dirtyFields) {
    if (Object.prototype.hasOwnProperty.call(dirtyFields, key)) {
      if (typeof dirtyFields[key] === "object" && dirtyFields[key] !== null) {
        const nestedDirty = getDirtyData(
          values[key as keyof T],
          dirtyFields[key]
        );
        if (Object.keys(nestedDirty).length > 0) {
          result[key as keyof T] = nestedDirty as any;
        }
      } else if (dirtyFields[key]) {
        result[key as keyof T] = values[key as keyof T];
      }
    }
  }

  return result;
}

export function getBranchOptions(data: PlanData[], selectedLocation: string) {
  const filteredPlans = data?.filter(
    (item) => item.gymLocation === selectedLocation
  );

  const uniqueBranches = [
    ...new Set(filteredPlans.map((item) => item.gymBranch)),
  ];

  return uniqueBranches.map((branch) => ({
    value: branch,
    label: branch.charAt(0).toUpperCase() + branch.slice(1),
  }));
}

export function getPlanNameOptions(data: PlanData[]) {
  return [...new Set(data.map((item) => item.name))].map((name) => ({
    value: name,
    label: name.charAt(0).toUpperCase() + name.slice(1),
  }));
}

export function getPlanTypeOptions(data: PlanData[]) {
  return [...new Set(data.map((item) => item.planType))].map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
  }));
}
export function getLocationOptions(data: PlanData[]) {
  return [...new Set(data.map((item) => item.gymLocation))].map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
  }));
}

export function capitalizeAndConcat(...strings: string[]): string {
  return strings
    .map((str: string) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");
}
export function capitalizeFirstLetters(...strings: string[]): string {
  return strings.map((str) => str.charAt(0).toUpperCase()).join("");
}
export function capitalizeAllLetters(strings: string): string {
  return strings.toUpperCase();
}

export function capitalizeFirstLetter(str: string) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function formatDateString(dateString: string) {
  const date = new Date(dateString);

  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  return date.toLocaleDateString("en-US", options).replace(/,/, "");
}
export const getDaysRemaining = (
  endDate: string | Date | undefined
): number => {
  if (!endDate) return 0;

  const today = new Date();
  const end = new Date(endDate);

  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffInMs = end.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return daysRemaining >= 0 ? daysRemaining : 0;
};

export const locationItems = CurrentLocations.map((loc) => ({
  value: loc.location,
  label: loc.location.charAt(0).toUpperCase() + loc.location.slice(1),
}));
export const planTypeItems = PlanName.map((plan) => ({
  value: plan.name,
  label: plan.name.replace("-", " ").toUpperCase(),
}));

export const getBranches = (locationValue: string) => {
  const foundLocation = CurrentLocations.find(
    (loc) => loc.location.toLowerCase() === locationValue.toLowerCase()
  );
  return foundLocation
    ? foundLocation.branch.map((branch) => ({
        value: branch,
        label: branch.charAt(0).toUpperCase() + branch.slice(1), // e.g., "wuse" -> "Wuse"
      }))
    : [];
};
export const PlanTypeItems = PlanType.map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export const getDurationByName = (planName: string) => {
  const plan = PlanName.find(
    (p) => p.name.toLowerCase() === planName.toLowerCase()
  );
  return plan ? plan.duration : 0;
};
export const generateRandomId = (length = 8) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};
export const formatPrice = (price: number) => {
  return `₦${price?.toLocaleString("en-NG")}`;
};
export function getLocationItems(
  planData: any[]
): { value: string; label: string }[] {
  const uniqueLocations = [
    ...new Set(planData.map((item) => item.gymLocation)),
  ];

  return uniqueLocations.map((loc) => ({
    value: loc,
    label: loc.charAt(0).toUpperCase() + loc.slice(1),
  }));
}

export function getTime(isoString: string) {
  const date = new Date(isoString);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${formattedMinutes} ${ampm}`;
}

export function getSessionLabelById(data: any, currentEntry: any) {
  const sessionLabels = [
    "First Session",
    "Second Session",
    "Third Session",
    "Fourth Session",
    "Fifth Session",
    "Fifth Session",
    "Fifth Session",
    "Fifth Session",
    "Fifth Session",
    "Fifth Session",
    "Fifth Session",
    "Fifth Session",
  ];

  // Step 1: Filter all sessions with same _id
  const sameIdSessions = data
    .filter((entry: any) => entry._id === currentEntry._id)
    .sort(
      (a: any, b: any) =>
        new Date(a.checkInTime).getTime() - new Date(b.checkInTime).getTime()
    );

  const sessionIndex = sameIdSessions.findIndex(
    (entry: any) =>
      entry.checkInTime === currentEntry.checkInTime &&
      entry.checkOutTime === currentEntry.checkOutTime
  );

  return sessionLabels[sessionIndex] || `${sessionIndex + 1}th Session`;
}

export function assignSessionLabels(data: any[]) {
  const sessionLabels = [
    "First Session",
    "Second Session",
    "Third Session",
    "Fourth Session",
    "Fifth Session",
  ];

  // Group entries by _id
  const grouped: Record<string, any[]> = {};

  data.forEach((entry) => {
    if (!grouped[entry._id]) {
      grouped[entry._id] = [];
    }
    grouped[entry._id].push(entry);
  });

  // Assign session labels
  const result = data.map((entry) => {
    const group = grouped[entry._id];
    const sortedGroup = group.sort(
      (a, b) =>
        new Date(a.checkInTime).getTime() - new Date(b.checkInTime).getTime()
    );

    const index = sortedGroup.findIndex(
      (e) =>
        e.checkInTime === entry.checkInTime &&
        e.checkOutTime === entry.checkOutTime
    );

    return {
      ...entry,
      session: sessionLabels[index] || `${index + 1}th Session`,
    };
  });

  return result;
}

export const getOrdinalSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
export const formatDateWithOrdinal = (date: Date | undefined): string => {
  if (!date) {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();
    const suffix = getOrdinalSuffix(day);
    return `${day}${suffix} of ${month} ${year}`;
  }
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const suffix = getOrdinalSuffix(day);
  return `${day}${suffix} of ${month} ${year}`;
};
