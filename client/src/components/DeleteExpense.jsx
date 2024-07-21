import React from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DeleteExpense = ({ id, openDelete, setOpenDelete, setIsDeleted }) => {
  const { mutate: deleteExpense, isSuccess } = useMutation({
    mutationFn: async () => {
      return await axios.delete(`/expense/${id}`);
    },
    onSuccess: () => {
      // Invalidate and refetch expenses query to update the list after deletion
      queryClient.invalidateQueries("expenses");
    },
  });

  if (isSuccess) {
    setIsDeleted(true);
  }

  const handleDelete = () => {
    deleteExpense();
    setOpenDelete(false);
  };

  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Your Expense</DialogTitle>
          <DialogDescription>
            Are you sure? Because data connot be recovered.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className=" flex items-center justify-end gap-5">
            <Button variant="ghost" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpenDelete(false);
                handleDelete();
              }}
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteExpense;
