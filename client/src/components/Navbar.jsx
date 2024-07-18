import React from "react";
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

const Navbar = () => {
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
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
