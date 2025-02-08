import Maintenancecard from '@/components/common/Maintenancecard'
import { HandCoins, MonitorCog, Wallet } from 'lucide-react'
import React from 'react'

export default function Card() {
  return (
    <div className=' max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
        <Maintenancecard icon={<HandCoins size={40}/>} name={'Maintenance Payout'} value={0}/>
        <Maintenancecard icon={<Wallet size={40}/>} name={'Maintenance Deposit'} value={0}/>
        <Maintenancecard icon={<MonitorCog size={40}/>} name={'Full Maintenance'} value={0}/>

    </div>
  )
}
