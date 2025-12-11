// Save this as components/SkillTrack.tsx
"use client"
import React, { useLayoutEffect, useRef } from 'react';
import { IconType } from 'react-icons';
import { gsap } from 'gsap';

// Define the type for a skill
type Skill = {
  name: string;
  icon: IconType;
  color: string; // We'll use this for the icon hover color
};

type SkillTrackProps = {
  title: string;
  skills: Skill[];
  /** Speed in seconds for a full loop. Higher is slower. */
  speed?: number;
  /** Scroll direction */
  direction?: 'left' | 'right';
};

// --- Skill Pill Sub-component ---
const SkillPill = ({ name, icon: Icon, color }: Skill) => (
  <div className="skill-pill flex items-center shrink-0 space-x-2.5 bg-gray-800 px-5 py-2 rounded-full whitespace-nowrap transition-all duration-300 hover:scale-105 hover:bg-gray-700 cursor-pointer shadow-md">
    <Icon
      className={`text-2xl text-gray-400 transition-colors duration-300 ${color}`}
    />
    <span className="text-white text-md font-medium">{name}</span>
  </div>
);

// --- Main Track Component ---
export const SkillTrack = ({
  title,
  skills,
  speed = 30,
  direction = 'left',
}: SkillTrackProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const directionMultiplier = direction === 'left' ? -1 : 1;

  useLayoutEffect(() => {
    if (!trackRef.current) return;

    // GSAP seamless loop
    const ctx = gsap.context(() => {
      // We set the initial position
      gsap.set(trackRef.current, {
        xPercent: direction === 'left' ? 0 : -50,
      });

      // The animation
      gsap.to(trackRef.current, {
        xPercent: direction === 'left' ? -50 : 0,
        duration: speed,
        ease: 'none',
        repeat: -1, // Infinite loop
      });
    }, trackRef);

    return () => ctx.revert();
  }, [skills, speed, direction]);

  return (
    <div className="skill-track-wrapper py-6">
      <h3 className="text-2xl font-semibold text-purple-400 mb-5 text-left ml-4">
        {title}
      </h3>
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Fades for a polished look */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#111111] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#111111] to-transparent" />
        {/* Note: Change [#111111] to your page's exact background color */}

        <div
          ref={trackRef}
          className="flex w-max space-x-6 pr-6" // pr-6 adds spacing for the loop
        >
          {/* We render the list TWICE for the seamless loop */}
          {[...skills, ...skills].map((skill, index) => (
            <SkillPill
              key={`${skill.name}-${index}`}
              name={skill.name}
              icon={skill.icon}
              color={skill.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
