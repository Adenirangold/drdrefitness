"use client";
import { useAuthenticatedUser } from "@/hooks/useUser";
import React from "react";
import Spinner from "./Spinner";
import { capitalizeFirstLetter, getDaysRemaining } from "@/lib/utils";

interface Plan {
  _id: string;
  planId: string;
  name: string;
  planType: string;
  gymLocation: string;
  gymBranch: string;
  benefits: string[];
  price: number;
  duration: number;
  __v: number;
}

interface Subscription {
  plan: Plan;
  startDate: string;
  endDate: string;
  _id: string;
}

const SubscriptionList: React.FC = () => {
  const { data, isError, isLoading } = useAuthenticatedUser();

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const subscriptionHistory = data?.data?.membershipHistory || [];
  const status = data?.data?.currentSubscription.subscriptionStatus;

  console.log(subscriptionHistory);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Subscription History
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subscriptionHistory.map(
          ({ plan, startDate, endDate, _id }: Subscription, index: number) => (
            <div
              key={_id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-semibold mr-4">
                  {plan?.planType[0].toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 capitalize">
                    {plan?.planType} Plan
                  </h2>
                  <p className="text-sm text-gray-500 capitalize">
                    {plan?.name} - {plan?.gymBranch}, {plan?.gymLocation}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Price:</span> ₦
                  {plan?.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Start Date:</span>{" "}
                  {formatDate(startDate)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">End Date:</span>{" "}
                  {formatDate(endDate)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Duration:</span>{" "}
                  {plan?.duration} days
                </p>
                <p className="text-sm">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      index === 0 && status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {index === 0 ? capitalizeFirstLetter(status) : "Expired"}
                  </span>
                </p>
                {index === 0 && (
                  <p className="text-sm">
                    <span className="font-small">Latest Subscription</span>{" "}
                  </p>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SubscriptionList;
