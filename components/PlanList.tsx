"use client";
import { useDeletePlan, usePlans } from "@/hooks/usePlan";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import {
  capitalizeFirstLetter,
  formatPrice,
  getLocationItems,
} from "@/lib/utils";
import PlanEditModal from "./PlanEditModal";
import ActionModal from "./ActionModal";
import SpinnerMini from "./SpinnerMini";

function PlanList() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const { data, isLoading, isError, error } = usePlans();
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);
  const [openModalPlanId, setOpenModalPlanId] = useState<string | null>(null);
  const deletePlanMutation = useDeletePlan();

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  const planData = data.data;
  const locationItems = getLocationItems(planData);

  const handleDelete = async (id: string) => {
    console.log(`Initiating deletion for plan: ${id}`);
    setDeletingPlanId(id);
    setOpenModalPlanId(id);
    try {
      await deletePlanMutation.mutateAsync(id);
      setOpenModalPlanId(null);
      setDeletingPlanId(null);
    } catch (err) {
      console.error("Failed to delete plan:", err);
      setDeletingPlanId(null);
      setOpenModalPlanId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Plans</h1>
      <div className="mb-6 w-full max-w-md">
        <label
          htmlFor="location-filter"
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Filter by Location
        </label>
        <select
          id="location-filter"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          {locationItems.map((location: any) => (
            <option key={location.value} value={location.value}>
              {location.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {planData
          .filter(
            (plan: any) =>
              selectedLocation === "All" ||
              plan.gymLocation.toLowerCase() === selectedLocation.toLowerCase()
          )
          .map((plan: any) => (
            <div
              key={plan.planId}
              className="bg-white rounded-lg shadow-lg p-6 w-full"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {capitalizeFirstLetter(plan.name)} (
                {capitalizeFirstLetter(plan.planType)})
              </h2>

              {/* Plan Name and Type */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Plan Type
                </h3>
                <p className="text-gray-600">
                  {capitalizeFirstLetter(plan.planType)}
                </p>
              </div>

              {/* Duration */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Duration
                </h3>
                <p className="text-gray-600">{plan.duration} days</p>
              </div>

              {/* Price */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Price</h3>
                <p className="text-gray-600">{formatPrice(plan.price)}</p>
              </div>

              {/* Gym Location and Branch */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Location
                </h3>
                <p className="text-gray-600">
                  {capitalizeFirstLetter(plan.gymLocation)} -{" "}
                  {capitalizeFirstLetter(plan.gymBranch)}
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Benefits
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {plan?.benefits?.map((benefit: string, index: any) => (
                    <li key={index}>{capitalizeFirstLetter(benefit)}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end space-x-4">
                <PlanEditModal plan={plan}></PlanEditModal>
                <ActionModal
                  id={plan._id}
                  title={`Are you sure ?`}
                  description={`This action cannot be undone. This action will permanently delete  ${plan.name?.toUpperCase()}-PLAN for ${plan?.gymBranch?.toUpperCase()}-BRANCH in ${plan.gymLocation?.toUpperCase()}.`}
                  trigger="Delete"
                  sucessTriger={
                    deletePlanMutation.isPending ? (
                      <SpinnerMini></SpinnerMini>
                    ) : (
                      "Delete Plan"
                    )
                  }
                  failTriger="Cancel"
                  onSucessClick={() => handleDelete(plan._id)}
                  open={openModalPlanId === plan._id}
                  setOpen={(isOpen) =>
                    setOpenModalPlanId(isOpen ? plan._id : null)
                  }
                ></ActionModal>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlanList;
