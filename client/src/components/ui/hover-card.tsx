import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardTitle } from "./card";

import React from 'react'
import Image, { StaticImageData } from "next/image";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import Link from "next/link";
import { Button, buttonVariants } from "./button";



export interface HoverCardProps {
  info: {
    title: string
    description: string
    image: StaticImageData | string
    id : string
    repo : string
  },
 
  className?: string

  variant ?: string
}
const HoverCard = ({info,className}:HoverCardProps) => {
  return (

    <CardContainer className="w-full">
    <CardBody className={cn("bg-orange-200 group/card w-full sm:w-[30rem] h-full rounded-xl p-6 border ",className)}>

      <CardItem translateZ="100" className="w-full mt-1">
        <Image
          src={info.image}
          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          alt="thumbnail"

        />
      </CardItem>
      <CardItem
        translateZ="50"
        className="text-xl mt-3 px-2 font-bold text-neutral-600 "
      >
        <p> {info.title}</p>
       <span className='font-normal text-base '> {info.description}</span>
      </CardItem>
 

      <div className="flex justify-between items-center mt-10">
        <CardItem
          translateZ={20}
          as={Link}
          href={info.repo}
          target="__blank"
          className="px-4 py-2 rounded-xl text-xs font-normal "
        >
          GitHub Repo →
        </CardItem>

        <CardItem
          translateZ={20}
          as="button"
        >
         <Link href={info.id} className={buttonVariants({variant:'default'})}>
        View Project
         </Link>
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>

  )
}

export default HoverCard
