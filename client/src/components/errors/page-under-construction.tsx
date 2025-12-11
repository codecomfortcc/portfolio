import React from 'react'
import UnderConstruction from '@/assets/underconstruction.svg'
import Image from 'next/image'
const  PageUnderConstruction= () => {
  return (
<div className="grow  h-full">
    <div className="w-full relative h-full p-3 flex  items-center flex-col">
      <Image
        src={UnderConstruction}
        alt="Under Construction"
        className="w-3/4 h-3/4"
      />
      <h1 className="font-bold text-center text-primary bottom-1  flex flex-col text-6xl">
        <span>OOPS!</span>
        <span className="text-4xl text-gray-600"> under construction</span>
      </h1>
    </div>
  </div>
  )
}

export default PageUnderConstruction
