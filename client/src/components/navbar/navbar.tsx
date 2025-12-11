"use client";
import React, { use, useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import {
  AlignJustify,
  LayoutDashboard,
  LogIn,
  LogOut,
  UserRoundPlus,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { cn } from "@/lib/utils";
function getCleanPathname(pathname:string) {
  // Remove starting and trailing slashes
  const parts = pathname.replace(/^\/|\/$/g, '').split('/');

  if (parts.length === 0) return '';

  // Define a "gibberish" pattern — usually random alphanumeric IDs
  const gibberishRegex = /^[a-zA-Z0-9]{6,}$/; // 6+ random chars

  // Start from the end, go backward until we find a non-gibberish segment
  for (let i = parts.length - 1; i >= 0; i--) {
    if (!gibberishRegex.test(parts[i])) {
      return parts[i];
    }
  }


  return parts[parts.length - 1];
}
const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setScrollDirection("down");
      } else if (window.scrollY < lastScrollY) {
        setScrollDirection("up");
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (scrollDirection === "up") {
      gsap.to(".navbar", { top: 0, duration: 0.3 });
    } else if (scrollDirection === "down") {
      gsap.to(".navbar", { top: "-40px", duration: 0.3 });
    }
  }, [scrollDirection]);

  return (
    <div className="flex navbar sticky -top-[50px] justify-between w-full z-50 bg-foreground items-center px-3 py-2 border-b border-primary/60">
      <div className="flex w-full justify-between items-center text-white">
        <div className="flex-1">
          <span className="font-bold text-2xl text-violet-100">CC.</span>
        </div>
        <div className="flex-1  flex w-20">
            <Link href="/" className={cn("w-6 h-6 cursor-pointer rounded-md  px-1 relative",pathname === "/" ? "bg-primary": "bg-transparent")} >
              <Label htmlFor="main" className="cursor-pointer font-bold text-lg absolute -top-[1px]">
                M
              </Label>
            </Link>

            <Link href="/projects"  className={cn("w-6 h-6 cursor-pointer rounded-md  px-1 relative",pathname === "/projects" ? "bg-primary": "bg-transparent")} >
              <Label htmlFor="main" className="cursor-pointer font-bold text-lg absolute -top-[1px] left-[6px]">
                P
              </Label>
            </Link>

            <Link href="/contact" className={cn("w-6 h-6 cursor-pointer rounded-md  px-1 relative",usePathname() === "/contact" ? "bg-primary": "bg-transparent")} >
              <Label htmlFor="project" className=" font-bold cursor-pointer text-lg absolute -top-[1px] left-[6px] ">
                C
              </Label>
            </Link>
        </div>
        <div>
          <div className="gap-2 md:flex hidden"></div>
          <div className="md:hidden flex">
            <Sheet>
              <SheetTrigger>
                <AlignJustify className="w-5 h-5 text-white hover:text-primary transition-all duration-200 ease-in" />
              </SheetTrigger>
              <SheetContent>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="w-full border-b py-4 border-gray-600 px-2">
                  <Link
                    href="/login"
                    className=" hover:bg-violet-300/20 hover:text-violet-300 text-white w-full "
                  >
                    <LogIn className="w-5 h-5" />
                    <span> Login</span>
                  </Link>
                </SheetDescription>
                <SheetDescription className="w-full border-b py-4 border-gray-600 px-2">
                  <Link
                    href="/sign-up"
                    className=" hover:bg-violet-300/20 hover:text-violet-300 text-white w-full "
                  >
                    <UserRoundPlus className="w-5 h-5" />
                    <span> Signup</span>
                  </Link>
                </SheetDescription>
                <SheetDescription className="w-full border-b py-4 border-gray-600 px-2">
                  <Link
                    href="/dashboard"
                    className=" bg-primary hover:bg-violet-300/20 hover:text-violet-300 text-white w-full "
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span> Dashboard</span>
                  </Link>
                </SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div className="absolute w-28 h-7 bg-foreground -left-[6px] border-b border-r border-primary/50 -bottom-[22px] rounded-xl drop-shadow-lg text-white">
        <div className=" absolute -top-0 -left-7 w-7 h-7 bg-transparent z-10 curves " />
        <div className="w-full h-full  relative">
          <p className="text-center pb-2 top-0 text-violet-400 capitalize">
            {pathname === "/"
              ? "main"
              : getCleanPathname(pathname)
            }
          </p>
        </div>
        <div className=" absolute -top-0 -right-7 w-7 h-7 bg-transparent z-10 curves-right " />
      </div>
    </div>
  );
};

export default Navbar;
