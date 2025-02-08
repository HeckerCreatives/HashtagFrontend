import React from 'react'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import SalesTable from './Table'
import Cards from './Cards'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-col items-center p-8">
           
            <SalesTable/>
        </div>
    </SuperAdminLayout>
  )
}
