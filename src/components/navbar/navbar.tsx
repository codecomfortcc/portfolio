"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {AlignJustify, LayoutDashboard, LogIn, LogOut, UserRoundPlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet'

interface NavbarProps {
  userdata: {
    user: KindeUser | null;
    isAdmin: boolean;
  };
}

const Navbar = ({ userdata }: NavbarProps) => {
  const [currentPathName, setCurrentPathName] = useState("/");
  const pathname = usePathname();
  useEffect(() => {
    setCurrentPathName(pathname);
  }, []);
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
      gsap.to(".navbar", { top: "-50px", duration: 0.3 });
    }
  }, [scrollDirection]);

  return (
    <div className="flex navbar sticky -top-[50px] justify-between w-full z-50 bg-foreground items-center px-3 py-2 border-b border-primary/60">
      <div className="flex w-full justify-between items-center text-white">
        <div className="flex-1">
          <span className="font-bold text-2xl text-violet-100">CC.</span>
        </div>
        <div className="flex-1">
          <RadioGroup defaultValue={pathname} className="flex gap-0 ">
            <div
              className="relative "
              onClick={() => {
                router.push("/");
              }}
            >
              <RadioGroupItem
                value="/"
                id="main"
                className="text-primary/50 "
              />
              <Label
                htmlFor="main"
                className="absolute select-none left-[8px] top-[3px] font-bold text-lg"
              >
                M
              </Label>
            </div>

            <div
              className="relative"
              onClick={() => {
                router.push("/projects");
              }}
            >
              <RadioGroupItem
                value="/projects"
                id="project"
                className="text-primary/50 "
              />
              <Label
                htmlFor="project"
                className="absolute select-none left-[10px] top-[3px] font-bold text-lg"
              >
                P
              </Label>
            </div>

            <div
              className="relative"
              onClick={() => {
                router.push("/contact");
              }}
            >
              <RadioGroupItem
                value="/contact"
                id="contact"
                className="text-primary/50 disabled:text-primary/30"
              />
              <Label
                htmlFor="contact"
                className="absolute select-none left-[8px] top-[3px] font-bold text-lg"
              >
                C
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <div className="gap-2 md:flex hidden">
            <TooltipProvider>
              {userdata.user ? (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/api/auth/logout"
                        className={buttonVariants({
                          variant: "ghost",
                          className:
                            "px-2 hover:bg-violet-300/20 hover:text-white",
                        })}
                      >
                        <LogOut className="w-5 h-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary border-none">
                      <p className="text-white">Logout</p>
                    </TooltipContent>
                  </Tooltip>
                  {userdata.isAdmin ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/dashboard"
                          className={buttonVariants({
                            variant: "default",
                            className: "px-2 0",
                          })}
                        >
                          <LayoutDashboard className="w-5 h-5" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className="bg-primary border-none">
                        <p className="text-white">Dashboard</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : null}
                </>
              ) : (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/api/auth/login"
                        className={buttonVariants({
                          variant: "ghost",
                          className:
                            "px-2 hover:bg-violet-300/20 hover:text-white",
                        })}
                      >
                        <LogIn className="w-5 h-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary border-none">
                      <p className="text-white">Login</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/api/auth/register"
                        className={buttonVariants({
                          variant: "default",
                          className: "px-2",
                        })}
                      >
                        <UserRoundPlus className="w-5 h-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary border-none">
                      <p className="text-white">Signup</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              )}
            </TooltipProvider>
          </div>
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
          <p className="text-center pb-2 top-0 text-violet-400 ">
            {pathname === "/"
              ? "Main"
              : pathname === "/projects"
              ? "Projects"
              : pathname === "/contact"
              ? "Contact"
              : "Dashboard"}
          </p>
        </div>
        <div className=" absolute -top-0 -right-7 w-7 h-7 bg-transparent z-10 curves-right " />
      </div>
    </div>
  );
};

export default Navbar;
