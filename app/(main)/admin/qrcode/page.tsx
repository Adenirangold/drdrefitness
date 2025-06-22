"use client";
import React from "react";
import { useQRCode } from "next-qrcode";
import { useQR } from "@/hooks/useQR";
import Spinner from "@/components/Spinner";

const page = () => {
  const { Canvas } = useQRCode();
  const { data, isLoading, error } = useQR();
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">Error loading QR code: {error.message}</p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>No QR code data available</p>
      </div>
    );
  }
  console.log(data.data);
  const { checkInStationId, token } = data.data;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Scan to Check In or Out
      </h2>

      <Canvas
        text={JSON.stringify({ token, stationId: checkInStationId })}
        options={{
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 9,
          width: 500,
          color: {
            dark: "#333",
            light: "#FFF",
          },
        }}
      />
      {/* <p className="mt-4 text-gray-600">Branch: {branchId}</p> */}
    </div>
  );
};

export default page;
