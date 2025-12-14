"use client";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Checkout from "@/assets/checkout.png";
import CheckoutMobile from "@/assets/checkout-mobile.png";
import Capture from "@/assets/Capture.png";
import CaseCode from "@/assets/casecode.png";
import Hoobank from "@/assets/hoobank.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import QuoteGenerator from "@/components/home/quote-generator";
import AnimatedCard from "@/components/projects/animated-project-card";
import { GetIcon } from "@/lib/get-icons";
import { cn } from "@/lib/utils";
import { MyArsenal } from "@/components/home/my-aresnal";
import CustomCursor from "@/components/ui/custom-cursor";
import { Reveal as SpotlightReveal } from "@/components/ui/spotlight-reveal";
import { useState } from "react";

export default function Home() {
  const [isHoveringName, setIsHoveringName] = useState(false);
  return (
    <main className="bg-orange-100/70 ">
      <MaxWidthWrapper className="lg:min-h-screen lg:flex lg:justify-center lg:items-center lg:relative lg:-top-10">
        <CustomCursor />
        {/*portfolio of codecomfort */}
        <div className="flex flex-col  px-5 py-10 w-full h-full  justify-center items-center">
          <div className="flex gap-5 mb-5 mt-10">
            <Badge className="py-1">MERN stack developer</Badge>
            <Badge>Rust developer</Badge>
          </div>

          <div
            className="relative group"
            onMouseEnter={() => setIsHoveringName(true)}
            onMouseLeave={() => setIsHoveringName(false)}
          >
            <div className="max-sm:hidden">
              <SpotlightReveal
                className="relative"
                revealText={
                  <h1 className="text-6xl py-2 px-1 font-bold text-center">
                    Code Comfort
                  </h1>
                }
              >
                <h1 className="text-6xl font-bold text-center text-foreground">
                  Masani Yasovardhan
                </h1>
              </SpotlightReveal>
            </div>
            <div className="hidden max-sm:block">
              <h1 className="text-6xl font-bold text-center text-foreground">
                Masani Yasovardhan
              </h1>
            </div>
          </div>
          <p className="text-xl py-2 px-1 mb-10 text-center font-semibold text-foreground">
            Full Stack Developer | Building Innovative Web Solutions
          </p>
          <p className="text-sm max-w-[400px] text-gray-700 py-2 px-1 mb-10 text-center  text-foreground">
            Crafting next-generation web experiences with the MERN Stack,
            Next.js, and Rust.
          </p>
          <div className="flex gap-5 max-sm:mb-36 relative border-dash-long border-gray-700 px-4 py-3 rounded-lg ">
            <Image
              src={Checkout}
              className="absolute  -right-[320px] -top-[140px] lg:block hidden"
              alt="Checkout"
            />
            <Image
              src={CheckoutMobile}
              className="absolute w-[170px] h-34 left-[60px] -bottom-[170px] md:hidden block"
              alt="Checkout"
            />
            <Button className="rounded-lg">View Projects</Button>
            <Button className="rounded-lg">Contact Me</Button>
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <div className="grid md:grid-cols-3 md:grid-rows-1  grid-rows-2 grid-cols-1  gap-3 w-full  py-10 px-2 ">
          <div className=" col-span-2 flex-1 w-full pt-5  border-dash-long  border-gray-600 ">
            <Card>
              <CardContent className="px-4">
                <CardTitle className="text-4xl py-2   font-bold  text-foreground">
                  About Me
                </CardTitle>
                <CardDescription className="text-sm max-w-[600px] text-gray-700 py-2   text-foreground">
                  I am{" "}
                  <span className="text-primary font-semibold">
                    Yasovardhan
                  </span>
                  , a full stack developer with experience in building web
                  applications using the{" "}
                  <span className="text-primary font-semibold">MERN Stack</span>
                  . I am passionate about coding and building projects that
                  solve real-world problems. I have experience working with
                  clients to understand their requirements and deliver
                  high-quality solutions.
                </CardDescription>
                <CardDescription className="text-foreground font-bold">
                  College: Visvodaya Institute of Technology and Science
                </CardDescription>
                <CardDescription className="text-foreground font-bold">
                  Branch: ECE
                </CardDescription>
                <Link
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "rounded-lg mt-2"
                  )}
                  href={"/resume"}
                >
                  View Resume
                </Link>
              </CardContent>
            </Card>
          </div>
          <div className="max-sm:ml-1 w-full">
            <Card className="border h-full  w-full border-gray-600">
              <CardContent className="flex justify-center flex-col h-full">
                <CardTitle className="text-3xl py-1 mt-2  font-bold  text-foreground">
                  Links
                </CardTitle>
                <CardDescription className="py-4">
                  <Link
                    href="https://github.com/codecomfortcc"
                    target="blank"
                    className="text-primary font-semibold mb-2 w-full"
                  >
                    GitHub
                    <span className="text-foreground font-normal block">
                      @codecomfortcc
                    </span>
                  </Link>
                </CardDescription>
                <Separator className=" bg-gray-600" />
                <CardDescription className="py-4">
                  <Link
                    href="https://linkedin.com/in/yasovardhanmasani"
                    target="blank"
                    className="text-primary font-semibold mb-2 w-full"
                  >
                    LinkedIn
                    <span className="text-foreground font-normal block">
                      @yasovardhanmasani
                    </span>
                  </Link>
                </CardDescription>
                <Separator className=" bg-gray-600" />
                <CardDescription className="py-4">
                  <Link
                    href="https://youtube.com/@codecomfort"
                    target="blank"
                    className="text-primary font-semibold mb-2 w-full"
                  >
                    YouTube
                    <span className="text-foreground font-normal block">
                      @codecomfort
                    </span>
                  </Link>
                </CardDescription>
                <Separator className=" bg-gray-600" />
              </CardContent>
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="w-full px-1 md:px-8">
        <h1 className="text-4xl py-2 px-1 mb-5 font-bold text-center text-foreground">
          Projects
        </h1>
        <div className="grid lg:grid-cols-3 grid-cols-1  gap-x-4 gap-y-3 w-full  px-2 ">
          <AnimatedCard
            id="hoobank"
            title="Hoobank"
            description="A frontend webpage for banking sector with beautiful landing page"
            imageSrc={Hoobank}
            repo="https://github.com/codecomfortcc/hoobankindia.git"
            demo="https://hoobankindiacoin.netlify.app/"
            technologies={[
              { name: "React", icon: "react" },
              {
                name: "Javascript",
                icon: "javascript",
              },
              {
                name: "Tailwind CSS",
                icon: "tailwindcss",
              },
            ]}
            currentStatus="completed"
            futureStatus="unmaintained"
          />

          <AnimatedCard
            id="casecode"
            title="Case Code"
            description="A simple e-commerce website to purchase phone cases"
            imageSrc={CaseCode}
            repo="https://github.com/codecomfortcc/case-code.git"
            demo="https://casecode.vercel.app"
            technologies={[
              { name: "Next.js", icon: "nextjs"},
              {
                name: "TypeScript",
                icon: "typescript",
              },
              {
                name: "Tailwind CSS",
                icon: "tailwindcss",
              },
            ]}
            currentStatus="development"
            futureStatus="maintained"
          />

          <AnimatedCard
            id="designtec"
            title="DesignTec"
            description="A simple e-commerce website to view and purchase designtec products"
            imageSrc={Capture}
            repo="https://github.com/codecomfortcc/design-tec.git"
            technologies={[
              { name: "React", icon: "react" },
              {
                name: "TypeScript",
                icon: "typescript",
              },
              {
                name: "Tailwind CSS",
                icon: "tailwindcss",
              },
            ]}
            currentStatus="paused"
            futureStatus="unmaintained"
          />
        </div>
      </div>
      <MaxWidthWrapper>
        <h1 className="text-4xl py-5 px-1 mt-20 font-bold text-center text-foreground">
          My Arsenal
        </h1>
        <MyArsenal />
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        {/** testimonials with stars etc */}
        <h1 className="text-4xl py-2 px-1 mt-20 font-bold text-center text-foreground">
          Testimonials
        </h1>
        <div className="md:grid-cols-2 grid-cols-1 grid gap-3 px-3 py-2">
          <div className="border-dash-long w-full mt-10 rounded-lg">
            <Card>
              <CardContent className="px-4">
                <CardTitle className="text-3xl py-2 mb-5  font-bold  text-foreground">
                  DesignTec
                </CardTitle>
                <CardDescription className="text-sm max-w-[600px] text-gray-700 py-2   text-foreground">
                  " Yasovardhan delivered outstanding results for DesignTec,
                  meeting every deadline with precision. His ability to write
                  clean, high-quality code made the entire process seamless. I
                  highly recommend him for any complex development needs"
                </CardDescription>
                <div className="flex justify-between items-center mt-5">
                  <Image
                    src={Checkout}
                    alt="checkout"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">Kamalakar</h1>
                    <p className="text-sm">DesignTec ,Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="border-dash-long w-full mt-10 rounded-lg">
            <Card>
              <CardContent className="px-4">
                <CardTitle className="text-3xl py-2 mb-5  font-bold  text-foreground">
                  Tesserart
                </CardTitle>
                <CardDescription className="text-sm max-w-[600px] text-gray-700 py-2   text-foreground">
                  "Yasovardhan is a great developer it's a pleasure to work with
                  and always delivers high-quality work on time. I would highly
                  recommend him to anyone looking for a talented developer."
                </CardDescription>
                <div className="flex justify-between items-center mt-5">
                  <Image
                    src={Checkout}
                    alt="checkout"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">Bharath</h1>
                    <p className="text-sm">Tesserart, owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <QuoteGenerator />
      </MaxWidthWrapper>
    </main>
  );
}
