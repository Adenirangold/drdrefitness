// "use client";
// import React from "react";

// export default function Finacial({ membershipData }: { membershipData: any }) {
//   const {
//     activeMembers,
//     branchesAndLocations,
//     cumulativeMoneyPerYear,
//     cumulativeMoneyTotal,
//     nonActiveMembers,
//     paymentsAllBranchesByMonth,
//     paymentsByBranchByMonth,
//   } = membershipData.data;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Membership Dashboard</h1>

//       {/* Active Members Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Active Members</h2>
//         <p>Total Active Members: {activeMembers?.totalActiveMembers}</p>
//         <table className="w-full border-collapse border mt-4">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Branch</th>
//               <th className="border p-2">Count</th>
//             </tr>
//           </thead>
//           <tbody>
//             {activeMembers?.activeMembersByBranch?.map(
//               (item: any, index: any) => (
//                 <tr key={index}>
//                   <td className="border p-2 capitalize">{item.branch}</td>
//                   <td className="border p-2">{item.count}</td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </table>
//       </section>

//       {/* Branches and Locations Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Branches and Locations</h2>
//         <p>Number of Branches: {branchesAndLocations?.numberOfBranches}</p>
//         <p>Number of Locations: {branchesAndLocations?.numberOfLocations}</p>
//       </section>

//       {/* Cumulative Money Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Cumulative Money (2025)</h2>
//         <p>Total: ₦{cumulativeMoneyTotal?.toLocaleString()}</p>
//         <table className="w-full border-collapse border mt-4">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Year</th>
//               <th className="border p-2">Total Payment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cumulativeMoneyPerYear?.map((item: any, index: any) => (
//               <tr key={index}>
//                 <td className="border p-2">{item.year}</td>
//                 <td className="border p-2">
//                   ₦{item.totalPayment?.toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       {/* Non-Active Members Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Non-Active Members</h2>
//         <p>
//           Total Non-Active Members: {nonActiveMembers?.totalNonActiveMembers}
//         </p>
//         {nonActiveMembers?.nonActiveMembersByBranch.length === 0 ? (
//           <p>No non-active members by branch.</p>
//         ) : (
//           <table className="w-full border-collapse border mt-4">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">Branch</th>
//                 <th className="border p-2">Count</th>
//               </tr>
//             </thead>
//             <tbody>
//               {nonActiveMembers?.nonActiveMembersByBranch.map(
//                 (item: any, index: any) => (
//                   <tr key={index}>
//                     <td className="border p-2 capitalize">{item.branch}</td>
//                     <td className="border p-2">{item.count}</td>
//                   </tr>
//                 )
//               )}
//             </tbody>
//           </table>
//         )}
//       </section>

//       {/* Payments by Branch Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">
//           Payments by Branch (May 2025)
//         </h2>
//         {paymentsByBranchByMonth?.map((branchData: any, index: any) => (
//           <div key={index} className="mb-4">
//             <h3 className="text-xl font-medium capitalize">
//               {branchData.branch}
//             </h3>
//             <table className="w-full border-collapse border mt-2">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border p-2">Year</th>
//                   <th className="border p-2">Month</th>
//                   <th className="border p-2">Total Payment</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {branchData.payments?.map((payment: any, idx: any) => (
//                   <tr key={idx}>
//                     <td className="border p-2">{payment.year}</td>
//                     <td className="border p-2">{payment.month}</td>
//                     <td className="border p-2">
//                       ₦{payment.totalPayment.toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </section>

//       {/* Total Payments by Month Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Total Payments by Month</h2>
//         <table className="w-full border-collapse border mt-4">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Year</th>
//               <th className="border p-2">Month</th>
//               <th className="border p-2">Total Payment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paymentsAllBranchesByMonth?.map((payment: any, index: any) => (
//               <tr key={index}>
//                 <td className="border p-2">{payment.year}</td>
//                 <td className="border p-2">{payment.month}</td>
//                 <td className="border p-2">
//                   ₦{payment.totalPayment?.toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// }

"use client";
import React from "react";

export default function Financial({ membershipData }: { membershipData: any }) {
  const {
    activeMembers,
    branchesAndLocations,
    cumulativeMoneyPerYear,
    cumulativeMoneyTotal,
    nonActiveMembers,
    paymentsAllBranchesByMonth,
    paymentsByBranchByMonth,
  } = membershipData.data;

  // Function to convert month number to month name
  const getMonthName = (month: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1] || month; // Fallback to number if invalid
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Membership Dashboard</h1>

      {/* Active Members Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Active Members</h2>
        <p>Total Active Members: {activeMembers?.totalActiveMembers}</p>
        <table className="w-full border-collapse border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Branch</th>
              <th className="border p-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {activeMembers?.activeMembersByBranch?.map(
              (item: any, index: any) => (
                <tr key={index}>
                  <td className="border p-2 capitalize">{item.branch}</td>
                  <td className="border p-2">{item.count}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      {/* Branches and Locations Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Branches and Locations</h2>
        <p>Number of Branches: {branchesAndLocations?.numberOfBranches}</p>
        <p>Number of Locations: {branchesAndLocations?.numberOfLocations}</p>
      </section>

      {/* Cumulative Money Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cumulative Money (2025)</h2>
        <p>Total: ₦{cumulativeMoneyTotal?.toLocaleString()}</p>
        <table className="w-full border-collapse border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Year</th>
              <th className="border p-2">Total Payment</th>
            </tr>
          </thead>
          <tbody>
            {cumulativeMoneyPerYear?.map((item: any, index: any) => (
              <tr key={index}>
                <td className="border p-2">{item.year}</td>
                <td className="border p-2">
                  ₦{item.totalPayment?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Non-Active Members Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Non-Active Members</h2>
        <p>
          Total Non-Active Members: {nonActiveMembers?.totalNonActiveMembers}
        </p>
        {nonActiveMembers?.nonActiveMembersByBranch.length === 0 ? (
          <p>No non-active members by branch.</p>
        ) : (
          <table className="w-full border-collapse border mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Branch</th>
                <th className="border p-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {nonActiveMembers?.nonActiveMembersByBranch.map(
                (item: any, index: any) => (
                  <tr key={index}>
                    <td className="border p-2 capitalize">{item.branch}</td>
                    <td className="border p-2">{item.count}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </section>

      {/* Payments by Branch Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Payments by Branch (May 2025)
        </h2>
        {paymentsByBranchByMonth?.map((branchData: any, index: any) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-medium capitalize">
              {branchData.branch}
            </h3>
            <table className="w-full border-collapse border mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Year</th>
                  <th className="border p-2">Month</th>
                  <th className="border p-2">Total Payment</th>
                </tr>
              </thead>
              <tbody>
                {branchData.payments?.map((payment: any, idx: any) => (
                  <tr key={idx}>
                    <td className="border p-2">{payment.year}</td>
                    <td className="border p-2">
                      {getMonthName(payment.month)}
                    </td>
                    <td className="border p-2">
                      ₦{payment.totalPayment.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      {/* Total Payments by Month Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Total Payments by Month</h2>
        <table className="w-full border-collapse border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Year</th>
              <th className="border p-2">Month</th>
              <th className="border p-2">Total Payment</th>
            </tr>
          </thead>
          <tbody>
            {paymentsAllBranchesByMonth?.map((payment: any, index: any) => (
              <tr key={index}>
                <td className="border p-2">{payment.year}</td>
                <td className="border p-2">{getMonthName(payment.month)}</td>
                <td className="border p-2">
                  ₦{payment.totalPayment?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
