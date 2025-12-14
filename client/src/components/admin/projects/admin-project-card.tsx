"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  Edit, 
  Trash2, 
  Github, 
  Globe, 
  Layers, 
  Calendar,
  MoreHorizontal
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Project } from "@/types";
import { GetIcon } from "@/lib/get-icons";

// --- Interfaces (As requested) ---



interface AdminProjectCardProps {
  project: Project; 
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  index?: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "development": return "bg-blue-100 text-blue-700 border-blue-200";
    case "completed": return "bg-green-100 text-green-700 border-green-200";
    case "planning": return "bg-purple-100 text-purple-700 border-purple-200";
    case "paused": return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "deprecated": return "bg-red-100 text-red-700 border-red-200";
    case "maintained": return "bg-emerald-50 text-emerald-600 border-emerald-200";
    case "archived": return "bg-gray-100 text-gray-600 border-gray-200";
    default: return "bg-gray-50 text-gray-600 border-gray-200";
  }
};




export default function AdminProjectCard({
  project,
  onEdit,
  onDelete,
  index = 0,
}: AdminProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { 
    id, title, description, imageSrc, currentStatus, 
    futureStatus, technologies, repo, demo, updatedAt 
  } = project;

  // --- GSAP Animation ---
  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.1, // Stagger effect based on list index
      ease: "power3.out",
    });
  }, { scope: cardRef });

  return (
    <div ref={cardRef} className="h-full">
      <Card className="group relative h-full flex flex-col overflow-hidden border-2 border-orange-100/50 bg-orange-200/20 transition-all duration-300 hover:border-orange-300 hover:shadow-[0_8px_30px_rgb(251,146,60,0.15)] rounded-3xl">
        
        {/* --- Header: Image & Overlay Controls --- */}
        <div className="relative h-48 w-full overflow-hidden bg-orange-50">
          {/* Image */}
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 "
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-orange-200">
              <Layers size={48} />
            </div>
          )}

          {/* Glassmorphism Action Bar (Always visible for Admins) */}
          <div className="absolute top-3 right-3 flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    onClick={() => onEdit(id)}
                    className="h-8 w-8 rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur-md hover:bg-orange-500 hover:text-white border border-gray-200"
                  >
                    <Edit size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Project</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    onClick={() => onDelete(id)}
                    className="h-8 w-8 rounded-full bg-white/90 text-red-500 shadow-sm backdrop-blur-md hover:bg-red-500 hover:text-white border border-gray-200"
                  >
                    <Trash2 size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Floating Status Badges */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            <Badge variant="outline" className={`${getStatusColor(currentStatus)} backdrop-blur-md bg-opacity-90 shadow-sm`}>
              {currentStatus}
            </Badge>
            {futureStatus !== 'none' && (
               <Badge variant="outline" className={`${getStatusColor(futureStatus)} backdrop-blur-md bg-opacity-90 shadow-sm`}>
               {futureStatus}
             </Badge>
            )}
          </div>
        </div>

        {/* --- Content Body --- */}
        <CardContent className="flex flex-col flex-grow p-5 pt-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
              {title}
            </h3>
            {/* Last Updated Date - Handy for Admins */}
            <div className="flex items-center text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
              <Calendar size={10} className="mr-1" />
              {/* If you have date-fns: format(new Date(updatedAt), 'MMM dd') */}
              <span>Updated</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Technologies Stack */}
          <div className="mt-auto">
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Stack</p>
            <div className="flex items-center gap-2 pl-1">
              {technologies.slice(0, 5).map((tech, i) => (
                <TooltipProvider key={i}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-white shadow-sm hover:z-10 hover:scale-110 transition-all cursor-default flex items-center justify-center">
                         <GetIcon name={tech.icon} className="w" />      
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      {tech.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
              
              {technologies.length > 5 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-orange-100 text-[10px] font-bold text-orange-600 shadow-sm">
                  +{technologies.length - 5}
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {/* --- Footer: Links --- */}
        <CardFooter className="border-t border-gray-100 bg-gray-50/50 p-3 px-5 flex justify-between items-center">
          <div className="flex gap-3">
            {repo && (
              <a href={repo} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
                <Github size={16} />
              </a>
            )}
            {demo && (
              <a href={demo} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Globe size={16} />
              </a>
            )}
          </div>
          <div className="text-[10px] text-gray-400 font-mono">
            ID: {id.slice(0, 4)}...
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
