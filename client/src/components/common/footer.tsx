"use client"
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { usePathname } from 'next/navigation'
const Footer = () => {
  const pathname = usePathname();

  if (pathname === '/resume') {
    return null;
  }
  return (
    <footer className='bg-orange-100/70 '>
      <Separator className='bg-gray-400 mb-4 ' />
      <p className='text-center py-3 pb-5'>&copy; Code Comfort {new Date().getFullYear()}| All Rights Reserved</p>
    </footer>
  )
}

export default Footer
