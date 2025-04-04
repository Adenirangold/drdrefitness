"use server";

import { config } from "@/lib/config";

import { fetchData } from "./utils";
import useAuthStore from "@/app/stores/authStore";
import { cookies } from "next/headers";

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
        "Payment verification failed, An unexpected error occurred. Please try again later",
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
    const cookieStore = await cookies();
    cookieStore.set("authToken", result.data.data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

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

export const ResetPasswordAction = async (
  data: ResetPasswordData,
  resetToken: string
) => {
  try {
    const result = await fetchData(`/auth/reset-password/${resetToken}`, {
      method: "PATCH",
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

export const forgotPasswordAction = async (data: EmailALoneData) => {
  try {
    const result = await fetchData("/auth/forgot-password", {
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
    return {
      error: "Something went wrong. Please try again later",
    };
  }
};

// ////////////////////////MEMBER ACTION//////////////////////////////

export const getAuthenticatedUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;

  try {
    const result = await fetchData("/members/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `authToken=${token}`,
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
    console.error("Error:", error);
    return { error: "Something went wrong. Please try again later" };
  }
};
export const memberUpdatePasswordAction = async (data: UpdatePasswordData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;

  try {
    const result = await fetchData("/members/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `authToken=${token}`,
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
    console.error("Error:", error);
    return { error: "Something went wrong. Please try again later" };
  }
};

export const memberUpdateAction = async (data: UserData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  // console.log(data);

  try {
    const result = await fetchData("/members/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `authToken=${token}`,
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
    console.error("Error:", error);
    return { error: "Something went wrong. Please try again later" };
  }
};
// /////////////////////////////////////////PLAN/////////////

export const getAllPlanAction = async (data: UserData) => {
  try {
    const result = await fetchData("/plans/", {
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
        message: result.data?.message || "success",
        plan: result.data.plan,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return { error: "Something went wrong. Please try again later" };
  }
};
