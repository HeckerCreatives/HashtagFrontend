import React from 'react'
import Cards from './Cards'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import { Chart } from './Chart'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-col items-center p-8">
            <Cards/>
            <Chart/>
        </div>
    </SuperAdminLayout>
  )
}
