import AdminLayout from '@/components/layout/AdminLayout'
import React from 'react'
import History from './History'

export default function page () {
  return (
    <AdminLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-col items-center p-4 md:p-8">
            <div className=' w-full flex items-center justify-center p-4 rounded-sm'>
                <History/>
            </div>
        </div>
    </AdminLayout>
)}
