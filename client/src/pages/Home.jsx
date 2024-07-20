import { useContext, useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import ExpenseTable from "@/components/ExpenseTable";

import CreateExpense from "@/components/CreateExpense";
import CategoryCard from "@/components/CategoryCard";
import SummaryCard from "@/components/SummaryCard";
import { UserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Home = () => {
  const { user } = useContext(UserContext);

  const [hasExpenses, setHasExpenses] = useState(false);
  const [open, setOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    const checkExpenses = async () => {
      try {
        const response = await axios.get("/expense/check");
        setHasExpenses(response.data.flag);
      } catch (error) {
        console.error("Error checking expenses", error);
      }
    };

    checkExpenses();
  }, [isCreated]);

  const handleExpenseCreated = () => {
    setIsCreated((prev) => !prev);
    setOpen(false);
  };

  if (!user) {
    return <Navigate to={"/register"} />;
  }

  return (
    <MaxWidthWrapper>
      <Navbar />

      {hasExpenses ? (
        <>
          {/* Recents */}
          <div className="my-5 sm:my-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-5">
              Recents
            </h2>
            <ExpenseTable limit={3} isCreated={isCreated} sort={"createdAt"} />
            <div className="flex justify-end my-3">
              <Button onClick={() => setOpen(!open)}>Create Expense</Button>
              <CreateExpense
                open={open}
                onOpenChange={setOpen}
                onExpenseCreated={handleExpenseCreated}
              />
            </div>
          </div>

          {/* Category */}
          <div className="my-5 sm:my-10">
            <Link to={"/category"}>
              <h2 className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-5">
                Category &#x21c0;
              </h2>
            </Link>
            <CategoryCard limit={8} isCreated={isCreated} />
          </div>

          {/* Summary */}
          <div className="my-5 sm:my-10">
            <Link to={"/summary"}>
              <h2 className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-5">
                Summary &#x21c0;
              </h2>
            </Link>
            <SummaryCard isCreated={isCreated} />
          </div>
        </>
      ) : (
        <div className="w-full h-[75vh] flex items-center justify-center mb-2 p-10 sm:p-0 text-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">You have no expenses</h1>
            <p className="text-2xl font-thin mb-2">
              Start managing your expenses, by creating one.
            </p>
            <Button onClick={() => setOpen(!open)}>Create Expense</Button>
            <CreateExpense
              open={open}
              onOpenChange={setOpen}
              onExpenseCreated={handleExpenseCreated}
            />
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default Home;
