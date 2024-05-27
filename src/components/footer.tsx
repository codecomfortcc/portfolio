import React from 'react'
import { Separator } from './ui/separator'

const Footer = () => {
  return (
    <footer className='bg-orange-100/70 '>
      <Separator className='bg-gray-400 mb-4 ' />
      <p className='text-center py-3 pb-5'>&copy; Code Comfort 2024 | All Rights Reserved</p>
    </footer>
  )
}

export default Footer
