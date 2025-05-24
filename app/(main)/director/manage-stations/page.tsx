import StationList from "@/components/StationList";
import StationModal from "@/components/StationModal";
import React from "react";

function page() {
  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-end mb-6">
        <StationModal></StationModal>
      </div>

      <div className="">
        <StationList></StationList>
      </div>
    </div>
  );
}

export default page;
