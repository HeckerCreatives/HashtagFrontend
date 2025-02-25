import React from 'react'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import Changepassword from './Changepassword'
import Socialmedias from './Socialmedia'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-wrap max-w-[1440px] gap-4 p-8">
            <Changepassword/>
            <Socialmedias/>
        </div>
    </SuperAdminLayout>
  )
}
