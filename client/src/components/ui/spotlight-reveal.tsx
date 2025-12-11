"use client";
import { useRef } from "react";
import { useCursor } from "@/providers/cursor-context";
import { cn } from "@/lib/utils";

interface SpotlightTriggerProps {
  children: React.ReactNode; 
  revealText: React.ReactNode; 
  className?: string;
}

export const Reveal = ({ 
  children, 
  revealText, 
  className 
}: SpotlightTriggerProps) => {
  const { setSpotlight, resetCursor } = useCursor();
  const elementRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setSpotlight(revealText, rect);
    }
  };

  return (
    <span
      ref={elementRef}
      className={cn("relative inline-block cursor-none leading-none", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={resetCursor}
    >
      {children}
    </span>
  );
};
