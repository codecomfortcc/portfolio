import { cn } from "@/lib/utils";

const MaxWidthWrapper=({className,children}:{children:React.ReactNode,className?:string})=>(
  <div className={cn('h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20',className)}>
    {children}
  </div>
)
export default MaxWidthWrapper

