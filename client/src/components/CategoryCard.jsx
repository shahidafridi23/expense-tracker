import React, { useEffect } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
const RenderCard = ({ category, totalAmount }) => {
  console.log("rendered");
  return (
    <Link to={`/category/${category.value}`}>
      <Card>
        <CardHeader>
          <CardTitle>{category.label}</CardTitle>
        </CardHeader>
        <CardFooter>
          <p>&#x20b9;{totalAmount}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
const CategoryCard = ({ limit, isCreated }) => {
  const url = limit ? `/category?limit=${limit}` : "/category";
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(["categories"]);
  }, [url, queryClient, isCreated]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categories", url],
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <Skeleton className={"w-full h-[120px]"} />
          <Skeleton className={"w-full h-[120px]"} />
          <Skeleton className={"w-full h-[120px]"} />
          <Skeleton className={"w-full h-[120px]"} />
          <Skeleton className={"w-full h-[120px]"} />
          <Skeleton className={"w-full h-[120px]"} />
        </div>
      </div>
    );

  console.log("card", data.categories);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {data.categories.map((category) => (
        <RenderCard key={category._id} {...category} />
      ))}
    </div>
  );
};

export default CategoryCard;
