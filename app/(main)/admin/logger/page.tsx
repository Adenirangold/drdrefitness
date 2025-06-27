"use client";

import Spinner from "@/components/Spinner";
import SpinnerSmall from "@/components/SpinnerSmall";
import { columns } from "@/components/table/checkInColumn";
import { DataTable } from "@/components/table/data-table";
import { Input } from "@/components/ui/input";

import { useRecords } from "@/hooks/useRecords";
import { useAuthenticatedUser } from "@/hooks/useUser";

import { assignSessionLabels } from "@/lib/utils";

import React, { useState, useEffect } from "react";

import io from "socket.io-client";

// Initialize Socket.IO client
const socket = io("http://localhost:3000", {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
});

type RecordType = {
  id: string;
  regNumber: string;
  name: string;
  checkInTime: string;
  checkOutTime: string | null;
};

// Utility function to format date with ordinal suffix (e.g., "25th of July 2025")
const formatDateWithOrdinal = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const suffix = getOrdinalSuffix(day);
  return `${day}${suffix} of ${month} ${year}`;
};

// Utility function to get ordinal suffix for a day
const getOrdinalSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const MemberTable = () => {
  const [records, setRecords] = useState<RecordType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default to current date
  const { data: adminData, isLoading: adminIsLoading } = useAuthenticatedUser();
  const gymBranch = adminData?.data?.adminLocation?.branch;
  const gymLocation = adminData?.data?.adminLocation?.location;

  // Calculate min and max dates for the date input (3 months ago to today)
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 3);
  const maxDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  const minDate = threeMonthsAgo.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  // Check if selected date is today
  const isToday = selectedDate.toISOString().split("T")[0] === maxDate;

  const { data: recordData, isLoading: recordIsLoading } = useRecords({
    gymBranch,
    gymLocation,
    date: selectedDate,
  });

  // Map recordData to records in useEffect
  useEffect(() => {
    if (recordData?.data) {
      setRecords(
        recordData.data.map((record: any) => ({
          id: `${record.regNumber}-${record.checkInTime}`,
          regNumber: record.regNumber,
          name: record.name,
          checkInTime: record.checkInTime,
          checkOutTime: record.checkOutTime,
        }))
      );
    }
  }, [recordData]);

  // Handle Socket.IO events, only when selected date is today
  useEffect(() => {
    if (gymBranch && isToday) {
      socket.emit("join-branch", gymBranch);

      socket.on("check-in", ({ member }) => {
        console.log("Check-in data received:", member);
        setRecords((prev) => [
          {
            name: member.name,
            regNumber: member.regNumber,
            checkInTime: member.checkInTime,
            checkOutTime: member.checkOutTime || null,
            id: `${member.regNumber}-${member.checkInTime}`,
          },
          ...prev.filter(
            (record) =>
              record.id !== `${member.regNumber}-${member.checkInTime}`
          ),
        ]);
      });

      socket.on("check-out", ({ member }) => {
        setRecords((prev) =>
          prev.map((record) =>
            record.id === `${member.regNumber}-${member.checkInTime}`
              ? { ...record, checkOutTime: member.checkOutTime }
              : record
          )
        );
      });
    }

    // Cleanup on component unmount or when isToday changes
    return () => {
      if (isToday) {
        socket.off("check-in");
        socket.off("check-out");
      }
    };
  }, [gymBranch, isToday]);

  const data = assignSessionLabels(records);

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : new Date();
    setSelectedDate(newDate);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center space-x-4">
        <Input
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={handleDateChange}
          min={minDate}
          max={maxDate}
          placeholder="Select a date (MM/DD/YYYY)"
          className="w-48"
        />
        <span className="text-sm text-gray-700">
          {formatDateWithOrdinal(selectedDate)}
        </span>
      </div>
      {!isToday && (
        <p className="text-sm text-gray-500 mb-4">
          Real-time updates are disabled for past dates. Select today for live
          updates.
        </p>
      )}
      {recordIsLoading ? (
        <div className="flex justify-center items-center h-64">
          <SpinnerSmall />
        </div>
      ) : (
        <DataTable type="checkInOut" columns={columns} data={data} />
      )}
    </div>
  );
};

export default MemberTable;
