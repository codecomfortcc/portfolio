import CreateProject from "@/components/dashboard/create-project-compoent";
import SearchComponent from "@/components/dashboard/search-compoent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const DashoboardPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound();
  }

  return (
    <div className="w-full flex md:flex-row flex-col px-5 py-7 bg-orange-100/70 min-h-screen">
      <aside className='relative'>
      <div className="flex w-full sticky top-[85px]  rounded-lg bg-orange-200 justify-between px-2 py-3 gap-5 cols-span-1">
          <div className="px-2 py-0.5 w-full space-y-4 ">
            <h1 className="text-2xl font-bold text-center mt-5">Dashboard</h1>
            <div className="w-full relative focus-within:text-primary">
              <SearchComponent />
            </div>
            <CreateProject />
          </div>
      
        </div>
      </aside>
      <div className="flex-1 ml-3 w-full h-screen  bg-orange-100 rounded-lg">

  
      </div>
    </div>
  );
};

export default DashoboardPage;
