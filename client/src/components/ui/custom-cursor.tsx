"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCursor } from "@/providers/cursor-context"; 

export default function GlobalCursor() {
  const { cursorState } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);      // The Moving Wrapper
  const circleRef = useRef<HTMLDivElement>(null);      // The Orange Circle
  const textContainerRef = useRef<HTMLDivElement>(null); // The Text Holder
  
  // Cache target rect for the animation loop
  const targetRect = useRef<DOMRect | null>(null);

  useEffect(() => {
    targetRect.current = cursorState.rect;
  }, [cursorState.rect]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const textContainer = textContainerRef.current;
    if (!cursor || !textContainer) return;

    // 1. Setup GSAP Setters (Performance Optimization)
    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const xTextSet = gsap.quickSetter(textContainer, "x", "px");
    const yTextSet = gsap.quickSetter(textContainer, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      // Move Cursor Wrapper to Mouse
      xSet(e.clientX);
      ySet(e.clientY);

      // Move Text Container to counter-act the cursor movement
      // This locks the text to the original element's position on screen
      if (targetRect.current) {
        const offsetX = targetRect.current.left - e.clientX;
        const offsetY = targetRect.current.top - e.clientY;
        xTextSet(offsetX);
        yTextSet(offsetY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Handle Animations (Expand/Shrink)
  useEffect(() => {
    const circle = circleRef.current;
    const text = textContainerRef.current;
    
    if (cursorState.variant === "spotlight") {
      // Expand Circle
      gsap.to(circle, {
        width: 300,
        height: 300,
        backgroundColor: "#884ceb", // Orange
        mixBlendMode: "normal",
        duration: 0.4,
        ease: "back.out(1.5)",
      });
      // Fade In Text
      gsap.to(text, { opacity: 1, duration: 0.2, delay: 0.1 });
    } else {
      // Shrink Circle
      gsap.to(circle, {
        width: 20,
        height: 20,
        backgroundColor: "black",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "power2.out",
      });
      // Fade Out Text
      gsap.to(text, { opacity: 0, duration: 0.2 });
    }
  }, [cursorState.variant]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
    >
      {/* LAYER 1: The Orange Mask 
          Centered on mouse using translate(-50%, -50%) 
      */}
      <div 
        ref={circleRef}
        className="absolute top-0 left-0 rounded-full overflow-hidden flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{ width: 20, height: 20 }}
      >
         {/* LAYER 2: The Text Container
             We reset the origin to the center (left: 50%, top: 50%) so our math works
         */}
         <div 
           ref={textContainerRef}
           className="absolute opacity-0 will-change-transform"
           style={{
             left: "50%", 
             top: "50%",
             width: cursorState.rect?.width || 0,
             height: cursorState.rect?.height || 0,
           }}
         >
             {/* LAYER 3: The Text Itself */}
             <div className="w-full h-full flex items-center justify-center">
                 {cursorState.variant === "spotlight" && (
                    <div className="text-white font-bold leading-none whitespace-nowrap text-8xl">
                       {cursorState.content}
                    </div>
                 )}
             </div>
         </div>
      </div>
    </div>
  );
}
