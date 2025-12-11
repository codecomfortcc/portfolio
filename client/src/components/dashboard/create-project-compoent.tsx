import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

const CreateProject = () => {
  return (
    <Button className="flex group py-0 gap-0 overflow-hidden px-0 transition-all duration-200 ease-in-out justify-between mt-5 w-full">
    <span className="px-3 h-full group-hover:bg-violet-700 flex-1 flex items-center justify-center transition-all duration-200 ease-in-out">
      Create New Post
    </span>{" "}
    <span className="h-full px-3 group-hover:bg-violet-800 flex items-center justify-center transition-all duration-200 ease-in-out">
      {" "}
      <Plus />
    </span>
  </Button>
  )
}

export default CreateProject
