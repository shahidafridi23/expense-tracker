import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import moment from "moment";
const RenderCard = ({ title, startTime, endTime }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["summary", title],
    queryFn: async () => {
      const { data } = await axios.get(
        `/expense/date?starttime=${startTime}&endtime=${endTime}`
      );
      return data;
    },
  });

  if (isLoading)
    return (
      <div>
        <Skeleton className={"w-full h-[120px]"} />
      </div>
    );

  console.log("sumData", data);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardFooter>
        <p>&#x20b9;{data?.totalAmount}</p>
      </CardFooter>
    </Card>
  );
};
const SummaryCard = ({ isCreated }) => {
  const startOfToday = moment().startOf("day").toISOString();
  const endOfToday = moment().endOf("day").toISOString();

  const startOfWeek = moment().startOf("week").toISOString();
  const endOfWeek = moment().endOf("week").toISOString();

  const startOfMonth = moment().startOf("month").toISOString();
  const endOfMonth = moment().endOf("month").toISOString();

  // const {
  //   data: todayData,
  //   isLoading: isLoadingToday,
  //   refetch: todayRefetch,
  // } = useQuery({
  //   queryKey: ["summary", "today"],
  //   queryFn: async () => {
  //     const { data } = await axios.get(
  //       `/expense?starttime=${startOfToday}&endtime=${endOfToday}`
  //     );
  //     return data;
  //   },
  // });

  // const {
  //   data: weekData,
  //   isLoading: isLoadingWeek,
  //   refetch: weekRefetch,
  // } = useQuery({
  //   queryKey: ["summary", "week"],
  //   queryFn: async () => {
  //     const { data } = await axios.get(
  //       `/expense?starttime=${startOfWeek}&endtime=${endOfWeek}`
  //     );
  //     return data;
  //   },
  // });

  // const {
  //   data: monthData,
  //   isLoading: isLoadingMonth,
  //   refetch: monthRefetch,
  // } = useQuery({
  //   queryKey: ["summary", "month"],
  //   queryFn: async () => {
  //     const { data } = await axios.get(
  //       `/expense?starttime=${startOfMonth}&endtime=${endOfMonth}`
  //     );
  //     return data;
  //   },
  // });

  // if (isLoadingToday || isLoadingWeek || isLoadingMonth)
  //   return (
  //     <div>
  //       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
  //         <Skeleton className={"w-full h-[120px]"} />
  //         <Skeleton className={"w-full h-[120px]"} />
  //         <Skeleton className={"w-full h-[120px]"} />
  //       </div>
  //     </div>
  //   );

  // if (isCreated) {
  //   todayRefetch();
  //   weekRefetch();
  //   monthRefetch();
  // }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
      <RenderCard
        title={"Today"}
        startTime={startOfToday}
        endTime={endOfToday}
      />
      <RenderCard
        title={"This Week"}
        startTime={startOfWeek}
        endTime={endOfWeek}
      />
      <RenderCard
        title={"This Month"}
        startTime={startOfMonth}
        endTime={endOfMonth}
      />
    </div>
  );
};

export default SummaryCard;
