"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";

import AdminForm from "./forms/AdminForm";

const AdminEditModal = ({ data }: { data: AdminData }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Plan?</DialogTitle>
          <DialogDescription>Follow All Instructions.</DialogDescription>
          <AdminForm
            data={data}
            closeModal={() => setOpen(false)}
            edit={true}
          ></AdminForm>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AdminEditModal;
