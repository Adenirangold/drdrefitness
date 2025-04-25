"use client";
import React from "react";
import Spinner from "./Spinner";
import { useAuthenticatedUser } from "@/hooks/useUser";

const MemberList = () => {
  const { data, isError, isLoading } = useAuthenticatedUser();

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  const members = data?.data?.groupSubscription?.dependantMembers || [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Member List</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map(
          ({
            member,
            status,
            joinedAt,
          }: {
            member: any;
            status: any;
            joinedAt: any;
          }) => (
            <div
              key={member._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-semibold mr-4">
                  {member.firstName[0].toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 capitalize">
                    {member.firstName} {member.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Joined: {new Date(joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {member.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span>{" "}
                  {member.phoneNumber}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MemberList;
