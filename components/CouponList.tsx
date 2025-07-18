"use client";
import { useCoupons } from "@/hooks/useCoupons";
import { formatDateString } from "@/lib/utils";
import React from "react";

function CouponList() {
  const { data: couponData, isLoading, isError, error } = useCoupons();

  const data = couponData?.data || [];

  //   console.log(data);

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 tracking-tight">
        Coupon Management Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((coupon: any) => (
          <div
            key={coupon._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {coupon.code}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    coupon.discountType === "percentage"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}% Off`
                    : `#${coupon.discountValue} Off`}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Valid From:</span>{" "}
                  {formatDateString(coupon.validFrom)}
                </p>
                <p>
                  <span className="font-medium">Valid Until:</span>{" "}
                  {formatDateString(coupon.validUntil)}
                </p>
                <p>
                  <span className="font-medium">Max Uses:</span>{" "}
                  {coupon.maxUses || "Unlimited"}
                </p>
                <p>
                  <span className="font-medium">Current Uses:</span>{" "}
                  {coupon.currentUses}
                </p>
                <div>
                  <span className="font-medium">Applicable Plans:</span>
                  {coupon.applicablePlans.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {coupon.applicablePlans.map((plan: any, index: any) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <p className="text-sm text-gray-700">
                            {plan.gymBranch}{" "}
                            {plan.planType.charAt(0).toUpperCase() +
                              plan.planType.slice(1)}{" "}
                            {plan.name.charAt(0).toUpperCase() +
                              plan.name.slice(1)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500"> All Plans</span>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {}}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CouponList;
