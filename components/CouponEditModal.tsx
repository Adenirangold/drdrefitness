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

import CouponForm from "./forms/CouponForm";

const CouponEditModal = ({ data }: { data: CouponData }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Plan?</DialogTitle>
          <DialogDescription>Follow All Instructions.</DialogDescription>
          <CouponForm
            data={data}
            closeModal={() => setOpen(false)}
            edit={true}
          ></CouponForm>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CouponEditModal;
