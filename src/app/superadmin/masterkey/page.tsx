import React from 'react'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import Form from './Form'
import MasterkeyHistory from './History'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-col gap-12 items-center p-8">
            <Form/>
            <MasterkeyHistory/>
        </div>
    </SuperAdminLayout>
  )
}
