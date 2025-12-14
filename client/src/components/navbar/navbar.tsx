"use client";
import {  useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
function getCleanPathname(pathname: string) {
  const parts = pathname.replace(/^\/|\/$/g, "").split("/");
  if (parts.length === 0) return "";
  const gibberishRegex = /^[a-zA-Z0-9]{6,}$/; 
  for (let i = parts.length - 1; i >= 0; i--) {
    if (!gibberishRegex.test(parts[i])) {
      return parts[i];
    }
  }
  return parts[parts.length - 1];
}
const Navbar = () => {
  const pathname = usePathname();
  const { direction, isPastThreshold } = useScroll({
  threshold: 60,
});
  useEffect(() => {
if (direction === "down" && isPastThreshold) {
  gsap.to(".navbar", { top: "-40px" });
} else {
  gsap.to(".navbar", { top: 0 });
}
}, [direction, isPastThreshold]);

  return (
    <div className="flex navbar sticky -top-[50px] justify-between w-full z-50 bg-foreground items-center px-3 py-2 border-b border-primary/60">
      <div className="flex w-full justify-between items-center text-white">
        <div className="flex-1">
          <span className="font-bold text-2xl text-violet-100">CC.</span>
        </div>
        <div className="flex-1  flex w-20">
          <Link
            href="/"
            className={cn(
              "w-6 h-6 cursor-pointer rounded-md  px-1 relative",
              pathname === "/" ? "bg-primary" : "bg-transparent"
            )}
          >
            <span className="cursor-pointer font-bold text-lg absolute -top-[1px]">
              M
            </span>
          </Link>

          <Link
            href="/projects"
            className={cn(
              "w-6 h-6 cursor-pointer rounded-md  px-1 relative",
              pathname === "/projects" ? "bg-primary" : "bg-transparent"
            )}
          >
            <span className="cursor-pointer font-bold text-lg absolute -top-[1px] left-[6px]">
              P
            </span>
          </Link>

          <Link
            href="/contact"
            className={cn(
              "w-6 h-6 cursor-pointer rounded-md  px-1 relative",
              usePathname() === "/contact" ? "bg-primary" : "bg-transparent"
            )}
          >
            <span className=" font-bold cursor-pointer text-lg absolute -top-[1px] left-[6px] ">
              C
            </span>
          </Link>
        </div>
        <div>
       </div>
      </div>
      <div className="absolute w-28 h-7 bg-foreground -left-[6px] border-b border-r border-primary/50 -bottom-[22px] rounded-xl drop-shadow-lg text-white">
        <div className=" absolute -top-0 -left-7 w-7 h-7 bg-transparent z-10 curves " />
        <div className="w-full h-full  relative">
          <p className="text-center pb-2 top-0 text-violet-400 capitalize">
            {pathname === "/" ? "main" : getCleanPathname(pathname)}
          </p>
        </div>
        <div className=" absolute -top-0 -right-7 w-7 h-7 bg-transparent z-10 curves-right " />
      </div>
    </div>
  );
};

export default Navbar;
