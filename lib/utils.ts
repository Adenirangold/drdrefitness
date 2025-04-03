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
    // console.log(response);
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);

      if (response.status === 409) {
        return {
          error:
            "The email address is already registered. Please use a different email address.",
        };
      }
      if (response.status === 401) {
        return {
          error: "Invalid credentials (email or password).",
        };
      }
      if (response.status === 404) {
        return {
          error: "Token Invalid. Sign In again  ",
        };
      }

      return {
        error: "Something went wrong. Please try again later.",
      };
    }

    const responseData = await response.json();

    if (responseData.status !== "success") {
      return {
        error: `${response.status || "Unknown"} error occurred. ${
          responseData.message
        }`,
      };
    }

    return { data: responseData };
  } catch (error) {
    return { error: "Something went wrong!!. Please try again later." };
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
        // Handle nested objects
        const nestedDirty = getDirtyData(
          values[key as keyof T],
          dirtyFields[key]
        );
        if (Object.keys(nestedDirty).length > 0) {
          result[key as keyof T] = nestedDirty as any;
        }
      } else if (dirtyFields[key]) {
        // Handle primitive fields
        result[key as keyof T] = values[key as keyof T];
      }
    }
  }

  return result;
}
