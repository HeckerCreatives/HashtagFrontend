import AdminLayout from '@/components/layout/AdminLayout'
import React from 'react'
import Changepassword from './Changepassword'

export default function page () {
  return (
    <AdminLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-col items-center p-8">
            <div className=' w-full max-w-[1440px] flex-col '>
                <Changepassword/>

            </div>
        </div>
    </AdminLayout>
)}
