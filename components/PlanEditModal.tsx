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
import PlanForm from "./forms/PlanForm";

const PlanEditModal = ({ plan }: { plan: PlanData }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Plan?</DialogTitle>
          <DialogDescription>Follow All Instructions.</DialogDescription>
          <PlanForm
            edit={true}
            closeModal={() => setOpen(false)}
            data={plan}
          ></PlanForm>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlanEditModal;
