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
        message: result.data?.status || "success",
        authorizationUrl: result.data.data.authorizationUrl,
      },
    };
  } catch (error: any) {
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

    const result = await fetchData(`/auth/signup/verify-payment/${reference}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });

    if (result.error) {
      return {
        error: result.error,
      };
    }

    return {
      data: {
        message: result.data.status || "success",
        token: result.data.data.token,
      },
    };
  } catch (error) {
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
        token: result.data.data.token,
      },
    };
  } catch (error) {
    return {
      error: "Something went wrong. Please try again later",
    };
  }
};

// export const ResetPasswordAction = async (
//   data: ResetPasswordData,
//   resetToken: string
// ) => {
//   try {
//     const response = await fetch(
//       `${config.API_KEY}/auth/reset-password/${resetToken}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     if (!response.ok) {
//       console.error("No data returned in response");
//       return { error: "invalid Password or Email" };
//     }
//   } catch (error) {
//     console.error("Error sign in:", error);
//     return {
//       error: "Unable to log you in now. please try again later",
//     };
//   }
// };

// export const forgorPasswordAction = async (data: EmailALoneData) => {
//   try {
//     const response = await fetch(`${config.API_KEY}/auth/forgot-password`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//   } catch (error) {
//     console.error("Error sign in:", error);
//     return {
//       error: "Unable to log you in now. please try again later",
//     };
//   }
// };

// ////////////////////////MEMBER ACTION//////////////////////////////

export const getAuthenticatedUser = async () => {
  try {
    const result = await fetchData("/auth/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });
    if (result.error) {
      return {
        error: result.error,
      };
    }

    return {
      data: {
        message: "success",
        member: result.data.data,
      },
    };
  } catch (error) {
    console.error("Error getting members:", error);
    return { error: "Error Authenticating Member. Please try again later" };
  }
};
