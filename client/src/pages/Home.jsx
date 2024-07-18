import { CreateExpense } from "@/components/CreateExpense";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to={"/register"} />;
  }

  const [isHaveExpense, setIsHaveExpense] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <MaxWidthWrapper>
      <Navbar />

      {isHaveExpense ? (
        <div>yes</div>
      ) : (
        <div className="w-full h-[75vh] flex items-center justify-center mb-2 p-10 sm:p-0 text-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">You have no expenses</h1>
            <p className="text-2xl font-thin mb-2">
              Start managing your expenses, by creating one.
            </p>
            <Button onClick={() => setOpen(!open)}>Create Expense</Button>
            <CreateExpense open={open} onOpenChange={setOpen} />
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default Home;
