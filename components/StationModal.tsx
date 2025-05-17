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

import StationForm from "./forms/StationForm";

const StationModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Add Station</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new station</DialogTitle>

          <StationForm closeModal={() => setOpen(false)}></StationForm>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StationModal;
