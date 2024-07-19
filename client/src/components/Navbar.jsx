import React, { useContext } from "react";
import Logo from "./ui/Logo";
import { AlignRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { UserContext } from "@/context/UserContext";
import { Navigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return <Navigate to={"/register"} />;
  }

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between py-6 md:py-10">
      <Logo />

      <Sheet>
        <SheetTrigger asChild>
          <AlignRight
            width={40}
            height={40}
            fontWeight={500}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Hi! {user.name}</SheetTitle>
            <SheetDescription>
              here are some direct links of serices.
            </SheetDescription>
          </SheetHeader>
          <div className="w-full my-5">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
