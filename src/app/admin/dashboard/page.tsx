import React from 'react'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import AdminLayout from '@/components/layout/AdminLayout'
import Cards from './Cards'
import { Chart } from './Charts'


export default function page() {
  return (
    <AdminLayout>
        <div className=" bg-zinc-950 w-full h-auto flex flex-col items-center p-8">
           <Cards/>
           <Chart/>
        </div>
    </AdminLayout>
  )
}
