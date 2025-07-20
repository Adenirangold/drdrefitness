import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { title } from "process";
import { Button } from "./ui/button";
import SpinnerMini from "./SpinnerMini";

const ActionModal = ({
  trigger,
  title,
  description,
  failTriger,
  sucessTriger,
  onSucessClick,
  open,
  setOpen,
  id,
  loading,
}: {
  trigger: any;
  title: string;
  description: string;
  failTriger: string;
  sucessTriger: any;
  onSucessClick?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  id?: string;
  loading?: boolean;
}) => {
  return (
    <AlertDialog key={id} open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-red-600 text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{failTriger}</AlertDialogCancel>

          <Button
            onClick={onSucessClick}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
            disabled={typeof sucessTriger !== "string"}
          >
            {sucessTriger}
            {loading && <SpinnerMini></SpinnerMini>}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionModal;
