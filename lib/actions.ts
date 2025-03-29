"use server";
import { cookies } from "next/headers";
import { config } from "@/lib/config";
import axios from "axios";

// ////////////////////////AUTHENICATIONS//////////////////////////////

export const signUpAction = async (data: UserData) => {
  try {
    const response = await axios.post(`${config.API_KEY}/auth/signup`, data);

    if (!response?.data?.data) {
      console.error("No data returned in response");
      return { error: "Unable to sign in now. please try again later" };
    }

    const { authorizationUrl } = response.data.data;
    if (!authorizationUrl) {
      console.error("Authorization url not available");
      return { error: "Unable to sign in now. please try again later" };
    }

    return { data: { authorizationUrl } };
  } catch (error: any) {
    console.error(error);
    return { error: "Unable to sign in now. please try again later" };
  }
};

export const verifyPaymentAfterSignupAction = async (reference: string) => {
  try {
    if (!reference) {
      console.error("Reference does not exist");
      return {
        error: "Error occured trying to verify payment. Try again later",
      };
    }
    const response = await axios.get(
      `${config.API_KEY}/auth/signup/verify-payment/${reference}`,
      {
        withCredentials: true,
      }
    );
    if (!response || !response.data) {
      console.error("No data returned in response");
      return {
        error: "Error occured trying to verify payment. Try again later",
      };
    }

    const token = response.data.data.token;

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
    const response = await axios.post(`${config.API_KEY}/auth/login`, data);

    if (!response?.data?.data) {
      console.error("No data returned in response");
      return { error: "invalid Password or Email" };
    }
    return {
      data: {
        message: "success",
      },
    };
  } catch (error) {
    console.error("Error sign in:", error);
    return {
      error: "Unable to log you in now. please try again later",
    };
  }
};

export const ResetPasswordAction = async (
  data: ResetPasswordData,
  resetToken: string
) => {
  try {
    const response = await axios.post(
      `${config.API_KEY}/auth/reset-password/${resetToken}`,
      data
    );

    if (!response?.data?.data) {
      console.error("No data returned in response");
      return { error: "invalid Password or Email" };
    }
    return {
      data: {
        message: "success",
      },
    };
  } catch (error) {
    console.error("Error sign in:", error);
    return {
      error: "Unable to log you in now. please try again later",
    };
  }
};

export const forgorPasswordAction = async (data: EmailALoneData) => {
  try {
    const response = await axios.post(
      `${config.API_KEY}/auth/forgot-password`,
      data
    );
  } catch (error) {
    console.error("Error sign in:", error);
    return {
      error: "Unable to log you in now. please try again later",
    };
  }
};

// ////////////////////////MEMBER ACTION//////////////////////////////

export const getAuthenticatedUser = async (token: string) => {
  try {
    if (!token) {
      return {
        error: "Authentication token is required",
      };
    }
    const response = await axios.get(`${config.API_KEY}/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response || !response.data) {
      console.error("No data returned in response");
      return {
        error:
          "Error occured trying to authenticate member. Please try again later ",
      };
    }
    if (response && response.data) {
      return {
        data: response.data.data,
      };
    }
  } catch (error) {
    console.error("Error getting members:", error);
    return { error: "Error Authenticating Member. Please try again later" };
  }
};
