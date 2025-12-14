"use client";

import React, { useState, useEffect, useRef } from "react";
import GitHubCalendar from "react-github-calendar";
import { gsap } from "gsap";
import PixelBoard from "@/components/projects/pixelboard";
import ProjectGrid from "@/components/projects/project-grid"; 

const ProjectPage = () => {
  const [total, setTotal] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const [blockSize, setBlockSize] = useState(12);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLParagraphElement>(null);
 useEffect(() => {
    // Only runs on the client
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth < 320) {
        setBlockSize(10);
      } else if (window.innerWidth < 480) {
        setBlockSize(12);
      } else if (window.innerWidth < 640) {
        setBlockSize(14);
      } else if (window.innerWidth < 720) {
        setBlockSize(16);
      } else if (window.innerWidth < 1080) {
        setBlockSize(18);
      } else if (window.innerWidth < 1280) {
        setBlockSize(20);
      } else if (window.innerWidth < 1536) {
        setBlockSize(22);
      } else {
        setBlockSize(24);
      }
    };

    // Initialize width
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // paste into your component (keep your calendarRef, blockSize, width, etc.)
  useEffect(() => {
    if (!calendarRef.current) return;

    // Try to find the actual scrollable element produced by react-github-calendar
    const findScrollableElement = (): HTMLElement | null => {
      // 1) the container with the known class
      const byClass = calendarRef.current?.querySelector<HTMLElement>(
        ".react-activity-calendar"
      );
      if (byClass) {
        // Sometimes the wrapper contains an inner div that handles overflow. prefer the inner if it scrolls
        const innerDiv = byClass.querySelector<HTMLElement>("div");
        if (innerDiv && innerDiv.scrollWidth > innerDiv.clientWidth)
          return innerDiv;
        if (byClass.scrollWidth > byClass.clientWidth) return byClass;
      }

      // 2) sometimes the svg is inside a wrapper - scrollable element might be parent of svg
      const svg = calendarRef.current?.querySelector<SVGSVGElement>("svg");
      if (svg && svg.parentElement) {
        const p = svg.parentElement as HTMLElement;
        if (p.scrollWidth > p.clientWidth) return p;
        // walk up a bit in case parent is not the scroll container
        let el: HTMLElement | null = p;
        for (let i = 0; i < 3 && el; i++) {
          el = el.parentElement;
          if (el && el.scrollWidth > el.clientWidth) return el;
        }
      }

      // 3) fallback to first element that can scroll inside the wrapper
      const all = calendarRef.current?.querySelectorAll<HTMLElement>("*");
      if (!all) return null;
      for (const e of Array.from(all)) {
        if (e.scrollWidth > e.clientWidth) return e;
      }

      return null;
    };

    const scrollToEnd = (el: HTMLElement) => {
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      const dir = getComputedStyle(el).direction;
      if (dir === "rtl") {
        // Try several approaches to handle cross-browser RTL differences
        try {
          el.scrollTo({ left: el.scrollWidth, behavior: "auto" });
        } catch {}
        try {
          el.scrollLeft = el.scrollWidth;
        } catch {}
        try {
          el.scrollLeft = -maxScroll;
        } catch {}
      } else {
        // normal LTR: go to maxScroll
        try {
          el.scrollTo({ left: maxScroll, behavior: "auto" });
        } catch {}
        try {
          el.scrollLeft = maxScroll;
        } catch {}
      }
    };

    // Primary robust approach: use ResizeObserver on the calendar wrapper / svg parent so we trigger when the SVG layout appears.
    let ro: ResizeObserver | null = null;
    const attemptObserve = () => {
      // observe the most appropriate element for layout changes
      const candidate = calendarRef.current;
      if (!candidate) return;
      ro = new ResizeObserver(() => {
        const sc = findScrollableElement();
        if (sc) {
          scrollToEnd(sc);
        }
      });
      try {
        ro.observe(candidate);
      } catch (err) {
        // ignore observe errors
      }
    };

    attemptObserve();

    // Secondary safety: retry loop + RAF for environments where ResizeObserver isn't enough.
    let attempts = 0;
    const maxAttempts = 20;
    const interval = 60;
    const id = window.setInterval(() => {
      attempts += 1;
      const sc = findScrollableElement();
      if (sc) {
        scrollToEnd(sc);
        clearInterval(id);
      } else if (attempts >= maxAttempts) {
        clearInterval(id);
      }
    }, interval);

    // one immediate RAF try
    requestAnimationFrame(() => {
      const sc = findScrollableElement();
      if (sc) scrollToEnd(sc);
    });

    // final fallback: after a small timeout ensure we still try
    const fallbackTimeout = window.setTimeout(() => {
      const sc = findScrollableElement();
      if (sc) scrollToEnd(sc);
    }, interval * maxAttempts + 100);

    return () => {
      clearInterval(id);
      clearTimeout(fallbackTimeout);
      if (ro && calendarRef.current) {
        try {
          ro.disconnect();
        } catch {}
      }
      ro = null;
    };
  }, [blockSize, width, total]);

  const theme = {
    light: ["#ffffff", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
    dark: ["transparent", "#d89cff", "#b377ff", "#8d51f4", "#672bce"],
  };

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/codecomfortcc?y=last`
        );
        const data = await response.json();
        if (data && data.total && data.total.lastYear) {
          setTotal(data.total.lastYear);
        }
      } catch (error) {
        console.error("Failed to fetch contributions", error);
      }
    };

    fetchContributions();
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main card/content area
      gsap.from(mainCardRef.current, {
        opacity: 0,
        y: 50,

        scale: 0.98,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.2,
      });

      // Animate existing elements
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.from(calendarRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.0,
      });

      gsap.from(countRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 1.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // GSAP animation for the count-up
  useEffect(() => {
    if (total > 0 && countRef.current) {
      // Start the animation from a delayed point for better effect
      const startValue = Math.max(0, total - 500);
      gsap.to(countRef.current, {
        textContent: total,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        // Use a temporary object to animate the number
        onUpdate: function () {
          if (countRef.current) {
            // We are animating countRef.current.textContent directly
          }
        },
        delay: 1.4, // Delay this animation until after the fade-in
      });

      // Also animate the "contributions..." text
      gsap.fromTo(
        countRef.current,
        { textContent: startValue },
        {
          textContent: total,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          onUpdate: function () {
            if (countRef.current) {
              const value = Math.ceil(Number(this.targets()[0].textContent));
              countRef.current.textContent = `${value} contributions this year`;
            }
          },
          delay: 1.4, // Start after intro animations
        }
      );
    } else if (countRef.current) {
      // Ensure initial text is set if total is 0 or fetch is pending
      countRef.current.textContent = `0 contributions this year`;
    }
  }, [total]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center bg-orange-100/70 p-4 sm:p-6 text-[#1a1a1a] overflow-x-hidden w-full"
    >
      {/* 1. GitHub Activity Section */}
      <div
        ref={mainCardRef}
        className="relative z-10 w-full max-w-5xl p-6 sm:p-10 border-dash-long border-gray-700/30 mx-auto my-8 bg-white/50 backdrop-blur-sm rounded-[32px] shadow-sm"
      >
        <div className="flex flex-col items-center">
          <h1
            ref={titleRef}
            className="text-3xl sm:text-5xl md:text-6xl font-black font-recursive text-primary text-center mb-8 tracking-tight"
          >
            GitHub Activity
          </h1>
          
          <div
            ref={calendarRef}
            className="mb-8 w-full flex justify-center items-center overflow-hidden"
          >
             {width === null ? (
                <div className="h-40 flex items-center justify-center">
                   <PixelBoard text="LOADING" cellSize={10} gap={1} color="#7034d7" bg="transparent" />
                </div>
             ) : (
                <GitHubCalendar
                    username="codecomfortcc"
                    colorScheme="dark"
                    blockSize={blockSize}
                    blockRadius={100} // Fully rounded
                    theme={theme}
                    hideTotalCount
                    style={{
                        padding: "20px",
                        overflow: "hidden" // Keeps it contained
                    }}
                />
             )}
          </div>

          <div>
            <p
              ref={countRef}
              className="text-center text-xl sm:text-2xl font-bold text-primary tracking-tight"
            >
               0 contributions this year
            </p>
          </div>
        </div>
      </div>

      {/* 2. Projects Grid Section */}
      <div className="w-full max-w-6xl px-2 sm:px-4 pb-20 mt-4">
         <div className="flex items-center gap-4 mb-10 pl-2">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">All Projects</h2>
            <div className="h-px flex-1 bg-gray-400/50 border-t border-dashed border-gray-600/50"></div>
         </div>
         
         {/* 👇 The Infinite Scroll Grid */}
         <ProjectGrid />
      </div>
    </div>
  );
};

export default ProjectPage;
