import CategoryCard from "@/components/CategoryCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const Category = () => {
  return (
    <MaxWidthWrapper>
      <div className="my-5 sm:my-10">
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-5">
          Category &#x21c0;
        </h2>

        <p className="font-thin mb-10">
          Here you can find all the categories in which you have made expenses,
          click below card to know the detailed information.
        </p>

        <CategoryCard />
      </div>
    </MaxWidthWrapper>
  );
};

export default Category;
