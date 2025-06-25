// "use client";
// import Spinner from "@/components/Spinner";
// import { columns } from "@/components/table/checkInColumn";
// import { DataTable } from "@/components/table/data-table";
// import { useRecords } from "@/hooks/useRecords";
// import { useAuthenticatedUser } from "@/hooks/useUser";
// import { assignSessionLabels, getSessionLabelById, getTime } from "@/lib/utils";
// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// // Initialize Socket.IO client
// const socket = io("http://localhost:3000");

// type RecordType = {
//   id: string;
//   regNumber: string;
//   name: string;
//   checkInTime: string;
//   checkOutTime: string | null;
// };

// const MemberTable = () => {
//   const [records, setRecords] = useState<RecordType[]>([]);
//   const { data: adminData, isLoading: adminIsLoading } = useAuthenticatedUser();
//   const gymBranch = adminData?.data?.adminLocation?.branch;
//   const gymLocation = adminData?.data?.adminLocation?.location;

//   const { data: recordData, isLoading: recordIsLoading } = useRecords({
//     gymBranch,
//     gymLocation,
//   });

//   console.log(recordData);

//   useEffect(() => {
//     setRecords(
//       recordData.data.map((record: any) => ({
//         id: `${record.regNumber}-${record.checkInTime}`,
//         regNumber: record.regNumber,
//         name: record.name,
//         checkInTime: record.checkInTime,
//         checkOutTime: record.checkOutTime,
//       }))
//     );
//   }, [recordData]);

//   useEffect(() => {
//     if (gymBranch) {
//       socket.emit("join-branch", gymBranch);
//     }
//     socket.on("check-in", ({ member }) => {
//       console.log("Check-in data received:", member);
//       setRecords((prev) => [
//         {
//           name: member.name,
//           regNumber: member.regNumber,
//           checkInTime: member.checkInTime,
//           checkOutTime: member.checkOutTime || null,
//           id: `${member.regNumber}-${member.checkInTime}`,
//         },
//         ...prev.filter(
//           (record) => record.id !== `${member.regNumber}-${member.checkInTime}`
//         ),
//       ]);
//     });

//     socket.on("check-out", ({ member }) => {
//       setRecords((prev) =>
//         prev.map((record) =>
//           record.id === `${member.regNumber}-${member.checkInTime}`
//             ? {
//                 ...record,
//                 checkOutTime: member.checkOutTime,
//               }
//             : record
//         )
//       );
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off("check-in");
//       socket.off("check-out");
//       socket.disconnect();
//     };
//   }, [gymBranch]);

//   if (adminIsLoading || recordIsLoading) {
//     return <Spinner></Spinner>;
//   }

//   const data = assignSessionLabels(records);
//   console.log(data);

//   return (
//     <div className="container mx-auto py-10">
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// };

// export default MemberTable;

"use client";
import Spinner from "@/components/Spinner";
import { columns } from "@/components/table/checkInColumn";
import { DataTable } from "@/components/table/data-table";
import { useRecords } from "@/hooks/useRecords";
import { useAuthenticatedUser } from "@/hooks/useUser";
import { assignSessionLabels } from "@/lib/utils";
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
  const { data: adminData, isLoading: adminIsLoading } = useAuthenticatedUser();
  const gymBranch = adminData?.data?.adminLocation?.branch;
  const gymLocation = adminData?.data?.adminLocation?.location;

  const { data: recordData, isLoading: recordIsLoading } = useRecords({
    gymBranch,
    gymLocation,
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

  // Handle Socket.IO events
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
            ? { ...record, checkOutTime: member.checkOutTime }
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

  // Render loading state
  if (adminIsLoading || recordIsLoading) {
    return <Spinner />;
  }

  const data = assignSessionLabels(records);

  return (
    <div className="container mx-auto py-10">
      <DataTable type="checkInOut" columns={columns} data={data} />
    </div>
  );
};

export default MemberTable;
