"use client";
import { useRecords } from "@/hooks/useRecords";
import { useAuthenticatedUser } from "@/hooks/useUser";
import { getSessionLabelById, getTime } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Initialize Socket.IO client
const socket = io("http://localhost:3000");

type RecordType = {
  id: string;
  regNumber: string;
  name: string;
  checkInTime: string;
  checkOutTime: string | null;
};

const MemberTable = () => {
  const [records, setRecords] = useState<RecordType[]>([]);
  const { data: adminData } = useAuthenticatedUser();
  const { branch: gymBranch, location: gymLocation } =
    adminData?.data?.adminLocation;

  const { data: recordData } = useRecords({ gymBranch, gymLocation });

  console.log(recordData);

  useEffect(() => {
    if (recordData) {
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

  useEffect(() => {
    if (gymBranch) {
      socket.emit("join-branch", gymBranch);
    }
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
          (record) => record.id !== `${member.regNumber}-${member.checkInTime}`
        ),
      ]);
    });

    socket.on("check-out", ({ member }) => {
      setRecords((prev) =>
        prev.map((record) =>
          record.id === `${member.regNumber}-${member.checkInTime}`
            ? {
                ...record,
                checkOutTime: member.checkOutTime,
              }
            : record
        )
      );
    });

    // Cleanup on component unmount
    return () => {
      socket.off("check-in");
      socket.off("check-out");
      socket.disconnect();
    };
  }, [gymBranch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Member Check-In Status</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Registration Number</th>
            <th className="py-2 px-4 border">Check-In Time</th>
            <th className="py-2 px-4 border">Check-Out Time</th>
            <th className="py-2 px-4 border">Session</th>
          </tr>
        </thead>
        <tbody>
          {records.map((member: any, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border">{member.name}</td>
              <td className="py-2 px-4 border">{member.regNumber}</td>
              <td className="py-2 px-4 border">
                {member.checkInTime ? getTime(member.checkInTime) : "-"}
              </td>
              <td className="py-2 px-4 border">
                {member.checkOutTime ? getTime(member.checkOutTime) : "-"}
              </td>
              <td className="py-2 px-4 border">
                {getSessionLabelById(records, member)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
