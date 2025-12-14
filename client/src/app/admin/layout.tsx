"use client";
import { AppSidebar } from "@/components/admin/common/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/providers/auth-provider";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-orange-100/70 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) return null;
  return (
    <div className="flex h-screen bg-[#fff2e2]">
      <SidebarProvider>
        <SidebarInset className="bg-[#fff2e2]">{children}</SidebarInset>
        <AppSidebar />
      </SidebarProvider>
    </div>
  );
}
