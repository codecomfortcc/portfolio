"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer"; 
import { Loader2, RefreshCcw, WifiOff } from "lucide-react";
import { useInfiniteProjectsQuery } from "@/services/queries";
import AnimatedProjectCard from "@/components/projects/animated-project-card";
import { Button } from "@/components/ui/button";
import PixelBoard from "@/components/projects/pixelboard";
import {gsap} from "gsap";

export default function ProjectGrid() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteProjectsQuery(6);

  const { ref: loadMoreRef, inView } = useInView();
  const animatedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const animateItem = (el: HTMLDivElement | null, id: string) => {
    if (el && !animatedIds.current.has(id)) {
      animatedIds.current.add(id);
      gsap.fromTo(
        el,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",

          delay: Math.random() * 0.2, 
        }
      );
    }
  };

  // 1. Loading State (Initial)
  if (status === "pending") {
    return (
      <div className="w-full flex flex-col justify-center items-center py-20 gap-4">
        <PixelBoard
          text="LOADING"
          cellSize={4}
          gap={2}
          color="#7c3aed"
          bg="transparent"
        />
        <p className="text-gray-500 animate-pulse">Fetching projects...</p>
      </div>
    );
  }

  // 2. Error State
  if (status === "error") {
    return (
      <div className="w-full flex flex-col justify-center items-center py-20 gap-6 text-center">
        <div className="bg-red-50 p-6 rounded-2xl border-2 border-dashed border-red-200">
          <WifiOff className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Connection Failed
          </h3>
          <p className="text-gray-600 max-w-md mb-6">
            We couldn't reach the server. Please check your internet connection.
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="gap-2 border-red-200 hover:bg-red-100 hover:text-red-700"
          >
            <RefreshCcw className="w-4 h-4" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  // 3. Empty State
  if (data?.pages[0].length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-20">
        <PixelBoard
          text="EMPTY"
          cellSize={16}
          gap={2}
          color="#7c3aed"
          bg="transparent"
        />
        <p className="text-gray-500 mt-4">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.map((project: any) => (
              <div 
                key={project.id} 
                ref={(el) => animateItem(el, project.id)}
                className="will-change-transform" 
              >
                <AnimatedProjectCard
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  // Handle fallback safely
                  imageSrc={project.imageSrc || "/placeholder.png"} 
                  currentStatus={project.currentStatus}
                  futureStatus={project.futureStatus}
                  repo={project.repo}
                  demo={project.demo}
                  logo={project.logo}
                  technologies={project.technologies || []}
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Infinite Scroll Trigger / Loader */}
      <div ref={loadMoreRef} className="w-full py-4 flex justify-center min-h-[60px]">
        {isFetchingNextPage ? (
          <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-5 py-2.5 rounded-full shadow-sm border border-indigo-100">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">Loading more projects...</span>
          </div>
        ) : hasNextPage ? (
          <span className="text-gray-400 text-sm opacity-50">Scroll for more</span>
        ) : (
          <div className="flex flex-col items-center gap-2 text-black">
            <div className="w-1.5 h-1.5 bg-black-300 rounded-full" />
            <span className="text-[10px] uppercase tracking-widest font-semibold">End of List</span>
          </div>
        )}
      </div>
    </div>
  );
}
