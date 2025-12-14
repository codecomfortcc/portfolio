// Save as components/MyArsenal.tsx
// RUN: npm install gsap
"use client";
import React, { useEffect, useRef } from "react"; // <-- 1. Switched to useEffect
import { IconType } from "react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import {
  ReactjsIcon,
  NextJsIcon,
  TypescriptIcon,
  NodejsIcon,
  NestjsIcon,
  ExpressIcon,
  AwsIcon,
  PostgresqlIcon,
  MongodbIcon,
  TailwindCssIcon,
  RustIcon,
  JavascriptIcon,
} from "@/constants/react-icons";
import { cn } from "@/lib/utils";

const CORE_SKILLS: CoreSkill[] = [
  { name: "TypeScript", icon: TypescriptIcon, color: "group-hover:text-blue-500" },
  { name: "React", icon: ReactjsIcon, color: "group-hover:text-blue-400" },
  { name: "Next.js", icon: NextJsIcon, color: "group-hover:text-white" },
  { name: "Tailwind CSS", icon: TailwindCssIcon, color: "group-hover:text-cyan-400" },
  { name: "Node.js", icon: NodejsIcon, color: "group-hover:text-green-500" },
  { name: "Nest.js", icon: NestjsIcon, color: "group-hover:text-red-500" },
  { name: "Express.js", icon: ExpressIcon, color: "group-hover:text-white" },
  { name: "PostgreSQL", icon: PostgresqlIcon, color: "group-hover:text-blue-600" },
  { name: "MongoDB", icon: MongodbIcon, color: "group-hover:text-green-500" },
  { name: "Rust", icon: RustIcon, color: "group-hover:text-white" },
  { name: "JavaScript", icon:JavascriptIcon, color: "group-hover:text-yellow-500" },
  { name: "AWS", icon: AwsIcon, color: "group-hover:text-orange-400" },
];
type CoreSkill = { name: string; icon: IconType; color: string };

const SkillCard = ({ name, icon: Icon, color }: CoreSkill) => (
  <div
    className="skill-card group relative flex flex-col items-center justify-center
p-6 h-32 sm:h-36 bg-transparent
border-b border-r border-black
transition-all duration-300 ease-in-out hover:bg-purple-900/10 cursor-pointer"
  >
    <Icon
      className={cn("text-5xl mb-2  text-gray-700 transition-colors duration-300 group-hover:text-black", color)}
    />
    <p className={cn("text-sm font-mono text-black whitespace-nowrap group-hover:text-gray-800", color)}>
      {name}
    </p>
    <div
      className="absolute bottom-0 left-0 h-0.5 w-full bg-purple-600 scale-x-0 group-hover:scale-x-100
transition-transform duration-300 ease-out"
    />
  </div>
);

export const MyArsenal = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".arsenal-header", { autoAlpha: 0, y: -30 });
      gsap.set(".skill-card", {
        autoAlpha: 0,
        y: 30,
        scale: 0.9,
        filter: "blur(5px)",
      });
      gsap.set(".show-all-btn", { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(".arsenal-header", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      tl.to(
        ".skill-card",
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      ); 

      tl.to(
        ".show-all-btn",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []); 

  return (
    <section ref={sectionRef} className="py-2" id="arsenal">
      <div className="container mx-auto px-4">
        <div className="border-t border-l border-black">
          <div
            className="arsenal-header flex items-center justify-between
 border-b border-r border-gray-700
 min-h-[100px] p-6"
          >
            <h2 className="text-2xl sm:text-3xl  font-bold text-black uppercase">
              Core Technologies
            </h2>{" "}
            <span className="text-xl sm:text-2xl font-mono text-gray-500">
              ({CORE_SKILLS.length})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {CORE_SKILLS.map((skill) => (
              <SkillCard key={skill.name} {...skill} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center"></div>
      </div>

    
    </section>
  );
};
