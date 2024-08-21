import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CreateExpenseValidator } from "@/lib/validators/createExpense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import axios from "axios";
import { toast } from "sonner";
import { DatePicker } from "./ui/datePicker";
import { useContext, useState } from "react";
import { Label } from "./ui/label";
import { Combobox } from "./ui/ComboBox";
import { UserContext } from "@/context/UserContext";
import { Navigate } from "react-router-dom";

const createExpense = async (newUser) => {
  const response = await axios.post("/expense", newUser);
  return response.data;
};

export default function CreateExpense({
  open,
  onOpenChange,
  isCreated,
  setIsCreated,
  onExpenseCreated,
}) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to={"/register"} />;
  }
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState({});
  const form = useForm({
    resolver: zodResolver(CreateExpenseValidator),
    defaultValues: {
      amount: "",
      description: "",
    },
  });

  console.log("user", user);

  const { mutate, isPending } = useMutation({ mutationFn: createExpense });

  const onSubmit = (values) => {
    if (!date || !category?.value || !user.id) return;
    const { amount, description } = values;
    mutate(
      {
        date,
        category: category,
        amount: parseFloat(amount),
        description,
        userId: user.id,
      },
      {
        onSuccess: (data) => {
          toast("Expense Created Successfully!", {
            description: "Create more expenses to track.",
          });

          onExpenseCreated(true);
          setIsCreated(true);

          console.log("Expense Created Successfully:", data);
        },
        onError: (error) => {
          toast(error?.response.data.msg, {
            description: "Try with other Email Address..",
          });
          onOpenChange(!open);
          console.error("Error creating expense:", error);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Expense</DialogTitle>
          <DialogDescription>
            You also can create custom categories.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Amount"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Bought a T Shirt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label>Date</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>

            <div className="flex justify-between items-center gap-2">
              <Label>Category</Label>
              <Combobox category={category} setCategory={setCategory} />
            </div>

            <Button type="submit" className={"w-full"}>
              {isPending ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
