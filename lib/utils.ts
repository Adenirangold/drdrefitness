import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { config } from "./config";

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
