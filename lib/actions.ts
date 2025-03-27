"use server";
import { cookies } from "next/headers";
import { config } from "@/lib/config";
import axios from "axios";

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
      `${config.API_KEY}/auth/signup/verify-payment/${reference}`
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
        token,
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

export const getAuthenticatedUser = async (token: string) => {
  try {
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

    console.log(response);
  } catch (error) {
    console.error("Error getting members:", error);
    return { error: "Error Authenticating Member. Please try again later" };
  }
};
