import React from 'react'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import AdminLayout from '@/components/layout/AdminLayout'
import Cards from './Cards'
import UserTable from './Table'



export default function page() {
  return (
    <AdminLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-col items-center p-4 md:p-8">
            <div className=' w-full flex flex-col items-center justify-center p-4 rounded-sm'>
                <Cards/>
                <UserTable/>
            </div>
        </div>
    </AdminLayout>
  )
}
