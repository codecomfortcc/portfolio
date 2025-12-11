
import Chatbot from "@/components/resume/chatbot";
import ResumeViewer from "@/components/resume/pdf-viewer";
import React from "react";
import { montserrat } from "@/app/layout";
const Page = () => {
  return (

    <div className="flex flex-col-reverse md:flex-row w-full h-[calc(100vh-3.0rem-1px)] bg-orange-100/70 ">
      
      {/* Chatbot Container
        Mobile: Takes bottom 50% (h-1/2), Order 2
        Desktop: Takes right 50% (md:w-1/2), Order 2
      */}
      <div className="flex flex-col p-2 md:p-4 w-full h-1/2 md:w-1/2 md:h-full md:order-2">
        <Chatbot />
      </div>

      {/* PdfViewer Container
        Mobile: Takes top 50% (h-1/2), Order 1
        Desktop: Takes left 50% (md:w-1/2), Order 1
      */}
      <div className={`w-full h-1/2 md:w-1/2 md:h-full md:order-1 overflow-y-auto ${montserrat.className}`}>
        <ResumeViewer />
      </div>

    </div>
  );
};

export default Page;
