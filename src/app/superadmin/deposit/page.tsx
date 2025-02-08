import React from 'react'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import UserTable from './Table'
import Deposit from './Deposit'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" bg-zinc-950 w-full h-full flex items-start justify-center p-8">
          <div className=' max-w-[1440px] w-full flex lg:flex-row flex-col gap-8 '>
          <Deposit/>
          <UserTable/>
          </div>
            
        </div>
    </SuperAdminLayout>
  )
}
