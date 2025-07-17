"use client";
import { useAdmin, useDeleteAdmin } from "@/hooks/useAdmin";
import React, { useState } from "react";
import ActionModal from "./ActionModal";
import SpinnerMini from "./SpinnerMini";
import AdminEditModal from "./AdminEditModal";
import AdminForm from "./forms/AdminForm";

function AdminList() {
  const { data, isLoading, isError, error } = useAdmin();
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);
  const [openModalPlanId, setOpenModalPlanId] = useState<string | null>(null);
  const deleteAdminMutation = useDeleteAdmin();

  const adminsData = data?.data?.data;

  const handleDelete = async (id: string) => {
    console.log(`Initiating deletion for plan: ${id}`);
    setDeletingPlanId(id);
    setOpenModalPlanId(id);
    try {
      await deleteAdminMutation.mutateAsync(id);
      setOpenModalPlanId(null);
      setDeletingPlanId(null);
    } catch (err) {
      console.error("Failed to delete plan:", err);
      setDeletingPlanId(null);
      setOpenModalPlanId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Locations
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminsData?.map((admin: AdminData) => (
            <div
              key={admin._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {admin.firstName.charAt(0)}
                  {admin.lastName.charAt(0)}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {admin.firstName} {admin.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">{admin.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span>{" "}
                  {admin.phoneNumber}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Branch:</span>{" "}
                  {admin?.adminLocation?.branch}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span>{" "}
                  {admin?.adminLocation?.location}
                </p>
              </div>
              <div className="flex justify-end space-x-4">
                <AdminEditModal data={admin}></AdminEditModal>

                <ActionModal
                  id={admin._id}
                  title={`Are you sure ?`}
                  description={`This action cannot be undone. This action will permanently delete the admin of  ${admin.firstName?.toUpperCase()} ${admin.lastName?.toUpperCase()}.`}
                  trigger="Delete"
                  sucessTriger={"Delete Admin"}
                  failTriger="Cancel"
                  onSucessClick={() => handleDelete(admin?._id!)}
                  open={openModalPlanId === admin?._id}
                  setOpen={(isOpen) =>
                    setOpenModalPlanId(isOpen ? admin?._id ?? null : null)
                  }
                ></ActionModal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminList;
