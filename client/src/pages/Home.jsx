import { UserContext } from "@/context/UserContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to={"/register"} />;
  }
  return <div>Home</div>;
};

export default Home;
