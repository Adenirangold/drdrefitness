"use server";

import { config } from "@/lib/config";

import { fetchData } from "./utils";
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
    console.log(error);

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
      maxAge: 60 * 60 * 24 * 29,
    });

    return {
      data: {
        message: result.data?.message || "success",
        token: result.data.data.token,
        role: result.data.data.role,
      },
    };
  } catch (error) {
    return {
      error: "Something went wrong. Please try again later",
    };
  }
};

export const logOutAction = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("authToken");
    return {
      data: {
        message: "success",
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

// ///////////////////////AUTHETICATION//////////////////////////////

export const getAuthenticatedUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;

  const response = await fetch(`${config.API_KEY}/members/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong. Please try again later"
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};

// ////////////////////////MEMBER ACTION//////////////////////////////
export const memberUpdatePasswordAction = async (data: UpdatePasswordData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;

  const response = await fetch(`${config.API_KEY}/members/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    body: JSON.stringify(data),

    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong. Please try again later"
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};

export const memberUpdateAction = async (data: UserData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;

  const response = await fetch(`${config.API_KEY}/members/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    cache: "no-store",
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("Something went wrong. Please try again later");
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};

export const memberReactivateSubscriptionAction = async (
  data: ActivationData
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;

  const response = await fetch(`${config.API_KEY}/members/subscription/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("Something went wrong. Please try again later");
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};
export const verifyPaymentAfterReactivationAction = async (
  reference: string
) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value || null;
    if (!reference) {
      console.error("Reference does not exist");
      return {
        error: "Error occurred trying to verify payment. Try again later",
      };
    }

    const result = await fetchData(
      `/members/subscription/verify-payment/${reference}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `authToken=${token}`,
        },

        credentials: "include",
      }
    );

    if (result.error) {
      return {
        error: result.error,
      };
    }

    return {
      data: {
        message: result.data.status || "success",
      },
    };
  } catch (error) {
    return {
      error:
        "Payment verification failed, An unexpected error occurred. Please try again later",
    };
  }
};

export const MemberInviteAction = async (data: EmailALoneData) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value || null;

    const result = await fetchData(`/members/group-subscription`, {
      method: "POST",
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
        message: result.data.status || "success",
      },
    };
  } catch (error) {
    return {
      error:
        "Payment verification failed, An unexpected error occurred. Please try again later",
    };
  }
};

export const MemberAcceptInviteAction = async (
  data: UserData,
  token: string,
  id: string
) => {
  try {
    const result = await fetchData(
      `/members/group-subscription/${token}/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),

        credentials: "include",
      }
    );

    if (result.error) {
      return {
        error: result.error,
      };
    }

    return {
      data: {
        message: result.data.status || "success",
      },
    };
  } catch (error) {
    return {
      error: "An unexpected error occurred. Please try again later",
    };
  }
};
export const deleteDepedantMemberAction = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value || null;

    const result = await fetchData(`/members/group-subscription/${id}`, {
      method: "DELETE",
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
        message: result.data.status || "success",
      },
    };
  } catch (error) {
    return {
      error: "An unexpected error occurred. Please try again later",
    };
  }
};

///////////////////////////////////////////PLAN//////////////////////////////////////

export const getAllPlanAction = async () => {
  const response = await fetch(`${config.API_KEY}/plans/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong. Please try again later"
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};

export const addPlanAction = async (data: PlanData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  const response = await fetch(`${config.API_KEY}/plans/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    body: JSON.stringify(data),

    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong. Please try again later"
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};

export const editPlanAction = async (data: Partial<PlanData>, id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  const response = await fetch(`${config.API_KEY}/plans/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    body: JSON.stringify(data),

    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong. Please try again later"
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};
export const deletePlanAction = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  const response = await fetch(`${config.API_KEY}/plans/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong. Please try again later"
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};

///////////////////////////////////////////ADMIN//////////////////////////////////////

export const getAdminMembersAction = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  try {
    const result = await fetchData("/admin", {
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
        message: result.data?.message || "success",
        data: result.data?.data,
      },
    };
  } catch (error) {
    return {
      error: "Something went wrong. Please try again later",
    };
  }
};
// //////////////////////// Director//////////////////////////////////////

export const getAllMembersAction = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  try {
    const result = await fetchData("/director", {
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
        message: result.data?.status || "success",
        data: result.data?.data,
      },
    };
  } catch (error) {
    return {
      error: "Something went wrong. Please try again later",
    };
  }
};
export const getAdminAction = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  try {
    const result = await fetchData("/director/admin", {
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
        message: result.data?.status || "success",
        data: result.data?.data,
      },
    };
  } catch (error) {
    return {
      error: "Something went wrong. Please try again later",
    };
  }
};

export const addAdminAction = async (data: AdminData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  const response = await fetch(`${config.API_KEY}/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    body: JSON.stringify(data),

    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong. Please try again later"
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};
export const editAdminAction = async (data: Partial<AdminData>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  const response = await fetch(`${config.API_KEY}/director/admin/${data._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    body: JSON.stringify(data),

    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong. Please try again later"
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};
export const deleteAdminAction = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  const response = await fetch(`${config.API_KEY}/director/admin/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong. Please try again later"
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};

export const getAnalyticAction = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  const response = await fetch(`${config.API_KEY}/director/analytic`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong. Please try again later"
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};
// ////////////////////////////////////////////STATION//////////////////////////////////////

export const addStation = async (data: StationData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  const response = await fetch(`${config.API_KEY}/station`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    body: JSON.stringify(data),

    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong. Please try again later"
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};
export const getAllStations = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;
  const response = await fetch(`${config.API_KEY}/station`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong. Please try again later"
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};
