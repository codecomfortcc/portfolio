import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import Image, { StaticImageData } from 'next/image';
import React from 'react'
interface TrafficLightsProps{
  logo?: string | StaticImageData ;
  alt?: string;
  title: string;
  currentStatus: "development" | "completed" | "planning" | "paused" | "deprecated";
  futureStatus: "maintained" | "unmaintained" | "community" | "archived" | "none";
  className?: string;
  onClick?: () => void;
}
export const CurrentStatusColors = {
  development: "bg-emerald-500",
  completed: "bg-blue-500",
  planning: "bg-amber-500",
  paused: "bg-red-500",
  deprecated: "bg-gray-500",
};

export const FutureStatusColors = {
  maintained: "bg-emerald-500",
  unmaintained: "bg-red-500",
  community: "bg-blue-500",
  archived: "bg-gray-500",
  none: "bg-white",
};
const TrafficLights = ({
  logo,
  alt,
  title,
  currentStatus,
  futureStatus,
}:TrafficLightsProps) => {
  return (
    <div className="absolute transform-gpu w-24 h-8 flex justify-around items-center left-3 ">
          {logo && (
            <Image
              src={logo}
              alt={alt ?? title}
              fill
              className="object-cover -z-10 will-change-transform"
            />
          )}
          {!logo && (
            <div className="flex items-center justify-center w-5 h-5  rounded-full bg-primary" />
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-blue-500",
                  CurrentStatusColors[currentStatus]
                )}
              />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-orange-100 px-2 shadow-md backdrop-blur-lg max-w-[130px]"
              sideOffset={10}
              alignOffset={20}
            >
              <p className="">Current status</p>
              <p className="text-primary font-bold">{currentStatus}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-blue-500",
                  FutureStatusColors[futureStatus]
                )}
              />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-orange-100 px-2 shadow-md backdrop-blur-lg max-w-[130px]"
              sideOffset={10}
            >
              <p className="">Future status</p>
              <p className="text-primary font-bold">{futureStatus}</p>
            </TooltipContent>
          </Tooltip>
        </div>
  )
}

export default TrafficLights
