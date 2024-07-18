import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { UserContext } from "@/context/UserContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to={"/register"} />;
  }
  return (
    <MaxWidthWrapper>
      <Navbar />
    </MaxWidthWrapper>
  );
};

export default Home;
