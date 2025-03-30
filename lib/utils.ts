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
      console.error(`Error: ${response.statusText}`);
      return { error: "Something went wrong. Please try again later." };
    }

    const responseData = await response.json();

    if (responseData.message !== "success") {
      console.error("No data returned in response");
      return {
        error: `${responseData.status || "Unknown"} error occurred. ${
          responseData.message
        }`,
      };
    }

    return { data: responseData };
  } catch (error) {
    console.error("An error occurred:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
