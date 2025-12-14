
import Chatbot from "@/components/resume/chatbot";
import ResumeViewer from "@/components/resume/pdf-viewer";
import { montserrat } from "@/app/layout";
const Page = () => {
  return (

    <div className="flex flex-col-reverse md:flex-row w-full h-[calc(100vh-3.0rem-1px)] bg-orange-100/70 ">
      <div className="flex flex-col p-2 md:p-4 w-full h-1/2 md:w-1/2 md:h-full md:order-2">
        <Chatbot />
      </div>
      <div className={`w-full h-1/2 md:w-1/2 md:h-full md:order-1 overflow-y-auto ${montserrat.className}`}>
        <ResumeViewer />
      </div>

    </div>
  );
};

export default Page;
