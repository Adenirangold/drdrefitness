"use client";
import React from "react";
import { useQRCode } from "next-qrcode";
import { useQR } from "@/hooks/useQR";
import Spinner from "@/components/Spinner";

const page = () => {
  const { Canvas } = useQRCode();
  const { data, isLoading } = useQR();
  if (isLoading) {
    return <Spinner />;
  }
  console.log(data);

  return (
    <div>
      <Canvas
        text={"https://github.com/bunlong/next-qrcode"}
        options={{
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: "#333",
            light: "#FFF",
          },
        }}
      />
    </div>
  );
};

export default page;
