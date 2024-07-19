import ExpenseTable from "@/components/ExpenseTable";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Hash, Layers2 } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailedCard = () => {
  const { category } = useParams();
  console.log("category", category);

  if (!category) return "loading...";

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(["category"]);
  }, [category, queryClient]);

  const { data, isLoading } = useQuery({
    queryKey: ["category", category],
    queryFn: async () => {
      const { data } = await axios.get(`/category/${category}`);
      return data;
    },
  });

  if (isLoading)
    return (
      <MaxWidthWrapper>
        <div className="my-10">
          <h1 className="text-4xl sm:text-6xl font-bold mb-5 sm:mb-8">
            <Skeleton className={"w-[290px] h-12"} />
          </h1>
          <div className="flex items-center mb-5 sm:mb-8">
            <div className="flex items-center justify-between font-medium mr-6 sm:mr-10 text-xl gap-2">
              <Skeleton className={"w-[150px] h-8"} />
            </div>
            <span className="text-xl font-bold">
              <Skeleton className={"w-[50px] h-8"} />
            </span>
          </div>
          <div className="flex items-center mb-5 sm:mb-8">
            <div className="flex items-center justify-between font-medium mr-6 sm:mr-10 text-xl gap-2">
              <Skeleton className={"w-[150px] h-8"} />
            </div>
            <Skeleton className={"w-[50px] h-8"} />
          </div>
        </div>
      </MaxWidthWrapper>
    );

  console.log("categorydata", data);
  return (
    <MaxWidthWrapper>
      <div className="my-10">
        <h1 className="text-4xl sm:text-6xl font-bold mb-5 sm:mb-8">
          {data.category.category.label}
        </h1>
        <div className="flex items-center mb-5 sm:mb-8">
          <div className="flex items-center justify-between font-medium mr-6 sm:mr-10 text-xl gap-2">
            <Hash /> Total Amount
          </div>
          <span className="text-xl font-bold">
            &#x20b9;{data.category.totalAmount}
          </span>
        </div>
        <div className="flex items-center mb-5 sm:mb-8">
          <div className="flex items-center justify-between font-medium mr-6 sm:mr-10 text-xl gap-2">
            <Layers2 /> Total Expenses
          </div>
          <span className="text-xl font-bold">{data.totalExpenses}</span>
        </div>
      </div>

      <ExpenseTable category={category} />
      <div className="mb-20"></div>
    </MaxWidthWrapper>
  );
};

export default DetailedCard;
