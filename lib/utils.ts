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
    console.log(response);
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
