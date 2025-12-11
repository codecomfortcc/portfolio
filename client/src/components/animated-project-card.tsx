"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import { gsap } from "gsap";

import TechnologyScroller from "./technology-scroller";
import AnimatedCardButtons from "./animated-card-buttons";
import TrafficLights from "./trafic-lights";
import { IconBaseProps } from 'react-icons';
export interface MiniProjectCardV2Props {
  title: string;
  description: string;
  logo?: string | StaticImageData;
  currentStatus:
    | "development"
    | "completed"
    | "planning"
    | "paused"
    | "deprecated";
  futureStatus:
    | "maintained"
    | "unmaintained"
    | "community"
    | "archived"
    | "none";
  imageSrc: string | StaticImageData;
  alt?: string;
  repo: string;
  demo?: string;
  accent?: string;
  bg?: string;
  technologies: TechnologiesProps[];
  className?: string;
  onClick?: () => void;
}

export interface TechnologiesProps {
  name: string;
  icon: string | StaticImageData | React.ReactNode;  
}

export default function AnimatedCard({
  title,
  description,
  imageSrc,
  alt,
  repo,
  demo,
  accent = "#7c3aed",
  logo,
  currentStatus,
  futureStatus,
  className,
  onClick,
  technologies,
}: MiniProjectCardV2Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hoverTlRef = useRef<gsap.core.Timeline | null>(null);
  const trafficLightsRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = rootRef.current!;
    const trafficLightsContainer = trafficLightsRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const titleEl = q("h3");
    const descEl = q("p");
    const links = q("a");
  
    const hoverTl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power3.out" },
    });
    hoverTl.to(
      root,
      {
        scale: 1.03,
        boxShadow: "0 25px 70px rgba(20,8,40,0.45)",
      },
      0
    );
    hoverTl.to(
      trafficLightsContainer,
      {

      },
      0
    );
    hoverTl.to(
      titleEl,
      {
        y: -4,
        color: accent,
      },
      0
    );
    hoverTl.to(
      descEl,
      {
        y: -3,
      },
      0.05
    );

    hoverTl.to(
      links,
      {
        y: -6,
        stagger: 0.07,
      },
      0.1
    );

    hoverTl.to(
      trafficLightsContainer,
      {
        z: -10,
      },
      0
    );


    hoverTlRef.current = hoverTl;

    const onEnter = () => hoverTl.play();
    const onLeave = () => hoverTl.reverse();

    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);
    root.addEventListener("focusin", onEnter);
    root.addEventListener("focusout", onLeave);

    root.addEventListener("touchstart", onEnter, { passive: true });
    root.addEventListener("touchend", onLeave);
    root.addEventListener("touchcancel", onLeave);

    return () => {
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("focusin", onEnter);
      root.removeEventListener("focusout", onLeave);
      root.removeEventListener("touchstart", onEnter as any);
      root.removeEventListener("touchend", onLeave);
      root.removeEventListener("touchcancel", onLeave);

      hoverTl.kill();
    };
  }, [accent]);

  /* ---------------------------
     Keyboard & activation
     --------------------------- */
  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.();
      }
    },
    [onClick]
  );

  return (
    <article
      ref={rootRef}
      tabIndex={0}
      role={onClick ? "button" : "article"}
      aria-label={title}
      onKeyDown={handleKey}
      onClick={() => onClick?.()}
      className={`group relative w-full p-[2px] rounded-2xl overflow-hidden transform-gpu will-change-transform border-dash-long ${
        className ?? ""
      }`}
      style={{
        borderRadius: 18,
      }}
    >
      <div className="relative  w-full overflow-hidden top-section h-10  ">
        <div ref={trafficLightsRef} className="bend-border  relative border-dash-traffic p-[2px] "></div>
        <Image
          src={imageSrc}
          alt={alt ?? title}
          fill
          className="object-cover -z-10 will-change-transform "
        />
        <TrafficLights
          logo={logo}
          alt={alt ?? title}
          title={title}
          currentStatus={currentStatus}
          futureStatus={futureStatus}
        />
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-1 ">
        <TechnologyScroller
          technologies={technologies}
          title={title}
          description={description}
        />
        <AnimatedCardButtons repo={repo} demo={demo} />
      </div>
    </article>
  );
}
