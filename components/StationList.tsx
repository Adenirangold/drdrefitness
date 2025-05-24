"use client";
import { useDeleteStation, useStation } from "@/hooks/useStation";
import React, { useState } from "react";
import Spinner from "./Spinner";
import { Button } from "./ui/button";
import SpinnerMini from "./SpinnerMini";
import { useToast } from "@/hooks/use-toast";
import ActionModal from "./ActionModal";

const StationList = () => {
  const { data, isLoading: dataIsLoading } = useStation();
  const { mutate } = useDeleteStation();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  if (dataIsLoading) {
    return <Spinner></Spinner>;
  }

  const stationData = data?.data || [];

  const handleDelete = (id: string) => {
    setIsLoading(true);
    mutate(id, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Deleted Station successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      },
    });
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Station List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stationData.map(
          (station: {
            gymLocation: string;
            _id: string;
            gymBranch: string;
          }) => (
            <div
              key={station._id}
              className="bg-white rounded-lg shadow-md p-6 relative group hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2 capitalize">
                {station.gymBranch}
              </h2>
              <p className="text-gray-600 mb-4">
                Location: {station.gymLocation}
              </p>

              {/* Modal trigger at bottom right */}
              <div className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 text-sm rounded hover:bg-red-600 transition">
                <ActionModal
                  trigger="Delete"
                  title="Delete Station"
                  description="Are you sure you want to delete this station?"
                  failTriger="Cancel"
                  sucessTriger={isLoading ? <SpinnerMini /> : "Delete"}
                  onSucessClick={() => handleDelete(station._id)}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StationList;
