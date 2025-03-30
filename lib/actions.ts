"use server";

import { config } from "@/lib/config";
import axios from "axios";
import { fetchData } from "./utils";
// axios.defaults.withCredentials = true;

// ////////////////////////AUTHENICATIONS//////////////////////////////

export const signUpAction = async (data: UserData) => {
  try {
    const result = await fetchData("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (result.error) {
      return {
        error: result.error,
      };
    }

    return {
      data: {
        message: result.data?.message || "success",
        authorizationUrl: result.data.authorizationUrl,
      },
    };
  } catch (error: any) {
    console.error(error);
    return { error: "Something went wrong. Please try again later" };
  }
};

export const verifyPaymentAfterSignupAction = async (reference: string) => {
  try {
    if (!reference) {
      console.error("Reference does not exist");
      return {
        error: "Error occurred trying to verify payment. Try again later",
      };
    }

    const response = await fetch(
      `${config.API_KEY}/auth/signup/verify-payment/${reference}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.error("No data returned in response");
      return {
        error: "Error occurred trying to verify payment. Try again later",
      };
    }

    const responseData = await response.json();

    if (!responseData || !responseData.data) {
      console.error("No data returned in response");
      return {
        error: "Error occurred trying to verify payment. Try again later",
      };
    }

    const token = responseData.data.token;

    if (!token) {
      console.error("No token received");
      return {
        error: "Authentication token missing. Please try again.",
        status: 401,
      };
    }

    return {
      data: {
        message: "success",
      },
    };
  } catch (error) {
    console.error("Error verifying payment:", error);
    return {
      error:
        "Payment verification failed, An unexpected error occurred. Please try again late",
    };
  }
};

export const loginAction = async (data: LoginData) => {
  try {
    const result = await fetchData("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (result.error) {
      return {
        error: result.error,
      };
    }

    return {
      data: {
        message: result.data?.message || "success",
      },
    };
  } catch (error) {
    console.error("Error sign in:", error);
    return {
      error: "Something went wrong. Please try again later",
    };
  }
};

export const ResetPasswordAction = async (
  data: ResetPasswordData,
  resetToken: string
) => {
  try {
    const response = await fetch(
      `${config.API_KEY}/auth/reset-password/${resetToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      console.error("No data returned in response");
      return { error: "invalid Password or Email" };
    }
  } catch (error) {
    console.error("Error sign in:", error);
    return {
      error: "Unable to log you in now. please try again later",
    };
  }
};

export const forgorPasswordAction = async (data: EmailALoneData) => {
  try {
    const response = await fetch(`${config.API_KEY}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error sign in:", error);
    return {
      error: "Unable to log you in now. please try again later",
    };
  }
};

// ////////////////////////MEMBER ACTION//////////////////////////////

export const getAuthenticatedUser = async () => {
  try {
    const response = await fetch(`${config.API_KEY}/members`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("No data returned in response");
      return {
        error:
          "Error occurred trying to authenticate member. Please try again later ",
      };
    }

    const responseData = await response.json();

    if (!responseData?.data) {
      console.error("No data returned in response");
      return {
        error:
          "Error occurred trying to authenticate member. Please try again later ",
      };
    }

    return {
      data: {
        message: "success",
        member: responseData.data,
      },
    };
  } catch (error) {
    console.error("Error getting members:", error);
    return { error: "Error Authenticating Member. Please try again later" };
  }
};
