import React from 'react'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import List from './List'
import Cards from './Cards'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-col gap-8 items-center p-4 md:p-8">
          <Cards/>
           <List/>
        </div>
    </SuperAdminLayout>
  )
}
