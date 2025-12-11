import React, { useRef } from "react";
import { TechnologiesProps } from "./animated-project-card";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

gsap.registerPlugin(ScrollTrigger);

interface TechnologyScrollerProps {
  technologies: TechnologiesProps[];
  title: string;
  description: string;
}

const TechnologyScroller = ({
  technologies,
  title,
  description,
}: TechnologyScrollerProps) => {
  const plugin = useRef(
    Autoplay({
      stopOnInteraction: false,
      delay: 2000,
    })
  );

  return (
    <div className="min-h-[120px] ">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={(e) => plugin.current?.play()}
         opts={{ loop: true }}
      >
        <CarouselContent>
          <CarouselItem className="w-full">
            <div>
              <h3 className="text-center text-lg md:text-xl font-extrabold text-purple-600 leading-tight transition-colors duration-300 will-change-transform">
                {title}
              </h3>
              <p className="mt-2 text-sm text-black min-h-[54px] will-change-transform">
                {description}
              </p>
            </div>
          </CarouselItem>
          <CarouselItem className="w-full flex  items-center gap-1.5 flex-wrap justify-center">
            {technologies.slice(0, 4).map((tech, idx) => (
              <div
                key={idx}
                className="flex px-3 flex-col  items-center gap-1.5  py-1.5 bg-orange-200/60 border border-dash-long text-xs font-medium shadow-sm"
              >
                <span className="w-8 h-8">
                  {typeof tech.icon === "string" ? (
                    tech.icon.startsWith("http") ? (
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={16}
                        height={16}
                      />
                    ) : (
                      <div className="w-8 h-8 bg-transparent">
                        {tech.icon}
                      </div>
                    )
                  ) : tech.icon &&
                    typeof tech.icon === "object" &&
                    "src" in tech.icon ? (
                    <Image
                      src={tech.icon as StaticImageData}
                      alt={tech.name}
                      width={16}
                      height={16}
                    />
                  ) : (
                    <span className="w-8 h-8 bg-transparent">{tech.icon}</span>
                  )}
                </span>
                <span className="font-bold">{tech.name}</span>
              </div>
            ))}
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TechnologyScroller;
