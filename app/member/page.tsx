"use client";
import { getAuthenticatedUser } from "@/lib/actions";
import React, { useEffect, useState } from "react";

const page = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    } else {
      console.log("No token found in localStorage");
    }
  }, []);
  console.log(token);

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const result = await getAuthenticatedUser(token);
      };

      fetchUser();
    }
  }, [token]);

  return <div> memberrrrr page</div>;
};

export default page;
