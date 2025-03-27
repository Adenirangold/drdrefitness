"use client";
import { getAuthenticatedUser } from "@/lib/actions";
import React, { useEffect, useState } from "react";

const page = () => {
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    } else {
      console.log("No token found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const result = await getAuthenticatedUser(token);
        console.log(result?.data);
        setData(result?.data.member);
      };

      fetchUser();
    }
  }, [token]);

  return <div> memberrrrr page</div>;
};

export default page;
