import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, Captions, IndianRupee, Layers3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { formatDate } from "@/lib/utils";

export default function ExpenseTable({
  limit,
  category,
  sort,
  starttime,
  endtime,
  isCreated,
}) {
  const createQueryString = (params) => {
    const queryParams = new URLSearchParams();

    if (params.limit !== undefined) queryParams.append("limit", params.limit);
    if (params.category !== undefined)
      queryParams.append("category", params.category);
    if (params.sort !== undefined) queryParams.append("sort", params.sort);
    if (params.starttime !== undefined)
      queryParams.append("starttime", params.starttime);
    if (params.endtime !== undefined)
      queryParams.append("endtime", params.endtime);

    return queryParams.toString();
  };

  // Creating the query string using the props
  const queryString = createQueryString({
    limit,
    category,
    sort,
    starttime,
    endtime,
  });

  // Constructing the URL
  const url = `/expense?${queryString}`;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const { data } = await axios.get(url);
      return data;
    },
  });

  if (isCreated) {
    refetch();
  }

  if (isLoading)
    return (
      <div>
        <Table>
          <Skeleton className={"w-full h-11 mb-2"} />
          <Skeleton className={"w-full h-11 mb-2"} />
          <Skeleton className={"w-full h-11 mb-2"} />
          <Skeleton className={"w-full h-11 mb-2"} />
          <Skeleton className={"w-full h-11 mb-2"} />
        </Table>
      </div>
    );

  if (isError) {
    return toast("Something Went Wrong!", {
      description: "Refersh page or try sometime later.",
    });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">
            <div className="flex items-center gap-1">
              <CalendarDays width={15} height={15} /> Date
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-1">
              <Captions width={20} height={20} /> Description
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-1">
              <Layers3 width={20} height={20} /> Category
            </div>
          </TableHead>
          <TableHead className="text-right">
            <div className="flex items-center justify-end gap-1">
              <IndianRupee width={15} height={15} /> Amount
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.expenses.map((expense) => (
          <TableRow key={expense._id}>
            <TableCell className="font-medium">
              {formatDate(expense.date)}
            </TableCell>
            <TableCell>{expense.description}</TableCell>
            <TableCell>{expense.category.label}</TableCell>
            <TableCell className="text-right">
              &#x20b9;{expense.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            &#x20b9;{data.totalAmount}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
