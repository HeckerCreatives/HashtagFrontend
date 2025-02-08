import React from 'react'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import Card from './Card'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-col items-center p-8">
            <Card/>
        </div>
    </SuperAdminLayout>
  )
}
