import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DeleteExpense from "./DeleteExpense";
import { Button } from "./ui/button";

const ActionsDialog = ({ open, onOpenChange, id, setIsDeleted }) => {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit or Delete</DialogTitle>
            <DialogDescription>
              Choose the action, what you want.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className=" flex items-center justify-end gap-5">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Edit
              </Button>
              <Button
                onClick={() => {
                  onOpenChange(false);
                  setOpenDelete(true);
                }}
              >
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DeleteExpense
        id={id}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        setIsDeleted={setIsDeleted}
      />
    </>
  );
};

export default ActionsDialog;
