import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Checkout from '@/assets/checkout.png'
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
import HoverCard from "@/components/ui/hover-card";
import NameFill from "@/components/ui/name-fill";
import QuoteGenerator from "@/components/quote-generator";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <main className="bg-orange-100/70 ">
 
        <MaxWidthWrapper className="min-h-screen ">
          {/*portfolio of codecomfort */}
          <div className="flex flex-col px-5 py-10 w-full h-full  justify-center items-center">
            <div className="flex gap-5 mb-5 mt-10">
              <Badge className="py-1">MERN stack developer</Badge>
              <Badge>Go developer</Badge>
            </div>

            <h1 className="text-6xl py-2 px-1  font-bold text-center text-foreground">
              Code Comfort
            </h1>
            <p className="text-xl py-2 px-1 mb-10 text-center font-semibold text-foreground">
              A place where you can find comfort in code
            </p>
            <p className="text-sm max-w-[600px] text-gray-700 py-2 px-1 mb-10 text-center  text-foreground">
              {/** some paragraph saying about how code comfort works on projects you want to build */}
              We work on projects you want to build. We are a team of developers
              who are passionate about coding and building projects. We work on
              projects of all sizes, from small websites to large web
              applications.
            </p>
            <div className="flex gap-5  relative border-dash-long border-gray-700 px-4 py-3 rounded-lg ">
              <Image
                src={Checkout}
                className="absolute  -right-[320px] -top-[140px] lg:block hidden"
                alt="Checkout"
              />
              <Image
                src={CheckoutMobile}
                className="absolute w-[170px] h-34 left-[60px] -bottom-[170px] lg:hidden block"
                alt="Checkout"
              />
              <Button>View Projects</Button>
              <Button>Contact Me</Button>
            </div>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper>
          <div className="grid md:grid-cols-3 md:grid-rows-1 grid-rows-2 grid-cols-1 gap-x-3 gap-y-3 w-full  py-10 px-2 ">
            <div className=" col-span-2 flex-1  w-full pt-5  border-dash-long  border-gray-600 ">
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
                    <span className="text-primary font-semibold">
                      MERN Stack
                    </span>
                    . I am passionate about coding and building projects that
                    solve real-world problems. I have experience working with
                    clients to understand their requirements and deliver
                    high-quality solutions.
                  </CardDescription>
                  <CardDescription className='text-foreground font-bold'>
                    College: Visvodaya Institute of Technology and Science
                  </CardDescription>
                  <CardDescription className='text-foreground font-bold'>
                    Branch: ECE
                  </CardDescription>
                  <Button className="mt-5">View Resume</Button>
                </CardContent>
              </Card>
            </div>
            <div className="w-full ">
              <Card className="border  w-full border-gray-600">
                <CardContent>
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
                      href="https://youtube.com/@codecomfort"
                      target="blank"
                      className="text-primary font-semibold mb-2 w-full"
                    >
                      Youtube
                      <span className="text-foreground font-normal block">
                        @codecomfort
                      </span>
                    </Link>
                  </CardDescription>
                  <Separator className=" bg-gray-600" />
                  <CardDescription className="py-4">
                    <Link
                      href="https://x.com/@codecomfortyt"
                      target="blank"
                      className="text-primary font-semibold mb-2 w-full"
                    >
                      Twitter (X)
                      <span className="text-foreground font-normal block">
                        @codecomfortyt
                      </span>
                    </Link>
                  </CardDescription>
                  <Separator className=" bg-gray-600" />
                </CardContent>
              </Card>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className='w-full px-2'>
          <h1 className="text-4xl py-2 px-1  font-bold text-center text-foreground">
            Projects
          </h1>
          <div className="grid lg:grid-cols-3  md:grid-cols-2 grid-cols-1  gap-x-3 gap-y-3 w-full  px-2 ">
            <HoverCard
              info={{
                title: "Hoobank",
                description: "A frontend webpage for banking sector with beautiful landing page",
                image: Hoobank,
                id: "/projects/hoobank",
                repo: "https://github.com/codecomfortcc/hoobankindia.git",
              }}
            />
            <HoverCard
              info={{
                title: "Case Code",
                description: "A simple e-commerce website to purchase phone cases",
                image: CaseCode,
                id: "/projects/casecode",
                repo: "https://github.com/codecomfortcc/case-code.git",
              }}
            />
            <HoverCard
              info={{
                title: "DesignTec",
                description: "A simple e-commerce website to view and purchase designtec products",
                image: Capture,
                id: "/projects/designtec",
                repo: "https://github.com/codecomfortcc/design-tec.git",
              }}
            />
          </div>
        </div>
        <MaxWidthWrapper>
          <NameFill name="BELIEVE YOURSELF" />
        </MaxWidthWrapper>
        <MaxWidthWrapper>
          {/** testimonials with stars etc */}
          <h1 className="text-4xl py-2 px-1 mt-20 font-bold text-center text-foreground">
            Testimonials
          </h1>
          <div className='md:grid-cols-2 grid-cols-1 grid gap-3 px-3 py-2'>
            <div className="border-dash-long w-full mt-10 rounded-lg">
              <Card>
                <CardContent className="px-4">
                  <CardTitle className="text-3xl py-2 mb-5  font-bold  text-foreground">
                  DesignTec
                  </CardTitle>
                  <CardDescription className="text-sm max-w-[600px] text-gray-700 py-2   text-foreground">
                    "Yasovardhan is a great developer who is passionate about
                    building projects. He is a pleasure to work with and always
                    delivers high-quality work on time. I would highly recommend
                    him to anyone looking for a talented developer."
                  </CardDescription>
                  <div className="flex justify-between items-center mt-5">
                    <Image
                      src={Checkout}
                      alt="checkout"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-lg font-semibold">Kamalakar</h1>
                      <p className="text-sm">DesignTec CEO</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="border-dash-long w-full mt-10 rounded-lg">
              <Card>
                <CardContent className="px-4">
                  <CardTitle className="text-3xl py-2 mb-5  font-bold  text-foreground">
                   Omegle clone
                  </CardTitle>
                  <CardDescription className="text-sm max-w-[600px] text-gray-700 py-2   text-foreground">
                    
                    "Yasovardhan is a MERN stack developer who I hired to debug my Omegle clone project. He understood my problem clearly and assist to build a high-quality application. Yasovardhan was communicative and always available to address my concerns."
                  </CardDescription>
                  <div className="flex justify-between items-center mt-5">
                    <Image
                      src={Checkout}
                      alt="checkout"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-lg font-semibold">Eric</h1>
                      <p className="text-sm">buyer, Fiverr</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper>
          {/* Random  quration generator */}
          <QuoteGenerator/>
        </MaxWidthWrapper>

    </main>
  );
}
