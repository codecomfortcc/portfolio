import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound } from 'next/navigation'
import React from 'react'

const DashoboardPage = async() => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
  
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL
  
    if (!user || user.email !== ADMIN_EMAIL) {
      return notFound()
    }
  
  return (
    <div>
      
    </div>
  )
}

export default DashoboardPage
