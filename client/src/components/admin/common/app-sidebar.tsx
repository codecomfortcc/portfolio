"use client";

import type * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { GoProjectRoadmap } from "react-icons/go";
import {
  MessagesSquare,
  Home,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useScroll } from "@/hooks/use-scroll";

const data = {
  main: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: GoProjectRoadmap,
    },
    {
      title: "Messages",
      url: "/admin/messages",
      icon: MessagesSquare,
    },
 
  ],
  secondary: [
  
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const secondaryItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const { state, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const {logout} = useAuth();
  const {isPastThreshold,direction} = useScroll({
    threshold: 10,
  });
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from([...menuItemsRef.current, ...secondaryItemsRef.current], {
        opacity: 0,
        x: 30,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.1,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleItemHover = (ref: HTMLElement | null) => {
    if (ref) {
      gsap.to(ref.querySelector(".icon-container"), {
        scale: 1.1,
        duration: 0.2,
        ease: "power1.out",
      });
    }
  };

  const handleItemLeave = (ref: HTMLElement | null) => {
    if (ref) {
      gsap.to(ref.querySelector(".icon-container"), {
        scale: 1,
        duration: 0.2,
        ease: "power1.out",
      });
    }
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      side="right"
      collapsible="icon"
      {...props}
      className={cn("border-l  transition-all duration-300 border-neutral-200 bg-orange-200",isPastThreshold && direction === "down" ? "pt-2" : "pt-10")}
    >
      <SidebarHeader
        ref={headerRef}
        className="border-b border-neutral-200 p-4 bg-orange-200 "
        suppressHydrationWarning
      >
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <span className="text-sm font-semibold text-neutral-900">Menu</span>
          )}
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 rounded-lg hover:bg-orange-200 flex items-center justify-center transition-colors ml-auto"
          >
            {isCollapsed ? (
              <ChevronLeft className="w-4 h-4 text-neutral-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            )}
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2 bg-orange-200" suppressHydrationWarning>
        <SidebarMenu>
          {data.main.map((item, index) => (
            <SidebarMenuItem
              key={item.title}
              ref={(el) => {
                menuItemsRef.current[index] = el;
              }}
              onMouseEnter={(e) => handleItemHover(e.currentTarget)}
              onMouseLeave={(e) => handleItemLeave(e.currentTarget)}
              className={cn("hover:bg-orange-100  transition-colors rounded-lg", pathname === item.url ? "bg-orange-100/70" : "")}
            >
              <SidebarMenuButton
                asChild
                className="hover:bg-orange-200 transition-colors rounded-lg"
                tooltip={item.title}
              >
                <Link href={item.url} className="flex items-center gap-3 py-2.5">
                
                    <item.icon className="w-4 h-4 text-neutral-700" />
              
                  {!isCollapsed && (
                    <span className="text-sm font-medium text-neutral-700">
                      {item.title}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

 
      </SidebarContent>
      <SidebarFooter className="bg-orange-200">
       <SidebarMenu>
            {data.secondary.map((item, index) => (
              <SidebarMenuItem
                key={item.title}
                ref={(el) => {
                  secondaryItemsRef.current[index] = el;
                }}
                onMouseEnter={(e) => handleItemHover(e.currentTarget)}
                onMouseLeave={(e) => handleItemLeave(e.currentTarget)}
              >
                <SidebarMenuButton
                  asChild
                  className="hover:bg-orange-200 transition-colors rounded-lg"
                  tooltip={item.title}
                >
                  <Link href={item.url} className="flex items-center gap-3 p-2.5">
                   
                      <item.icon className="w-4 h-4 text-neutral-700" />
                    
                    {!isCollapsed && (
                      <span className="text-sm font-medium text-neutral-700">
                        {item.title}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
