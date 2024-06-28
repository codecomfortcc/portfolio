"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface NameFillProps {
  name: string;
  color?: string;
  size?: number;
  baseColor?: string;
}

const NameFill = ({ name, color, size = 110, baseColor }: NameFillProps) => {
  gsap.registerPlugin(ScrollTrigger);

  const nameRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[]; // Filter out nulls and cast

    const reveal = gsap.fromTo(
      letters,
      { color: baseColor ||'#666666',
      opacity:0.5,
       },
      {
      color: color || "#7936ec",
      duration: 1,
      opacity:1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: nameRef.current,
        start: 'top 90%',
        end: 'top 20%',
        scrub: 0.5,
      },
      }
    );

    return () => {
      if (reveal.scrollTrigger) reveal.scrollTrigger.kill();
    };
  }, [name, color, baseColor]);
  const words = name.split(/\s+/);

  return (
    <div className="w-full mt-10 py-10">
      <h1
        ref={nameRef}
        className={`text-center font-bold antialiased lg:text-[110px] md:text-8xl text-6xl ${baseColor}`}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split('').map((letter, letterIndex) => {
              const index = wordIndex * word.length + letterIndex;
              return (
                <span
                  key={index}
                  ref={(el) => {
                    letterRefs.current[index] = el;
                  }}
                  className="inline-block"
                >
                  {letter}
                </span>
              );
            })}
            {wordIndex < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default NameFill;
