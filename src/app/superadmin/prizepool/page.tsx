import React from 'react'
import Prizepool from './Prizepool'
import SuperadminLayout from '@/components/layout/SuperadminLayout'

export default function page() {
  return (
    <SuperadminLayout>
        <div className=" w-full h-full flex flex-col items-center p-8">
            <Prizepool/>
        </div>
    </SuperadminLayout>
  )
}
