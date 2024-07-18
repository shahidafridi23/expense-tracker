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
import { useState } from "react";
import { Label } from "./ui/label";
import { Combobox } from "./ui/ComboBox";

const createExpense = async (newUser) => {
  const response = await axios.post("/auth/register", newUser);
  return response.data;
};

export function CreateExpense({ open, onOpenChange }) {
  const [date, setDate] = useState(null);
  const [value, setValue] = useState("");
  const form = useForm({
    resolver: zodResolver(CreateExpenseValidator),
    defaultValues: {
      description: "",
    },
  });

  console.log(date);
  console.log(value);

  const { mutate, isPending } = useMutation({ mutationFn: createExpense });

  const onSubmit = (values) => {
    if (!date || !value) return;
    mutate(values, {
      onSuccess: (data) => {
        toast("Registered Successfully!", {
          description: "Explore the expense tracker.",
        });
        console.log("User registered successfully:", data);
      },
      onError: (error) => {
        toast(error?.response.data.msg, {
          description: "Try with other Email Address..",
        });
        console.error("Error registering user:", error);
      },
    });
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
              <Combobox value={value} setValue={setValue} />
              <Button variant="outline" type="button">
                Custom
              </Button>
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
