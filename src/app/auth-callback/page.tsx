'use client'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { getAuthStatus } from './actions'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
const AuthCallback = () => {
  const router = useRouter()
  const { data } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  })
  if(data?.success){
    router.push('/')
  }
    return (
      <div className='w-full -mt-16 min-h-screen bg-orange-100/70 flex justify-center items-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
          <h3 className='font-semibold text-xl'>Logging you in...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    )
      
}

export default AuthCallback
