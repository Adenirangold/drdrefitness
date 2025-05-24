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
import { PlusIcon } from "lucide-react";

const StationModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300">
        <PlusIcon className="w-5 h-5" />
        <span className="text-sm font-medium">Add Station</span>
      </DialogTrigger>
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
