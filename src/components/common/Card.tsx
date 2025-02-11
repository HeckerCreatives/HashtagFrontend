import { Wallet } from 'lucide-react'
import React from 'react'

type Props ={
    icon: React.ReactElement
    iconbg: string
    title: string
    amount: string
    subtitle: string
    text: string
    loading: boolean
}

export default function Card( prop: Props) {
  return (
    <div className=' w-[336px] flex flex-col justify-between flex-grow-1 h-[150px] bg-zinc-900 p-3'>
            <div className=' w-full grid grid-cols-[1fr_70px]  rounded-sm'>
               
                <div className=' w-full flex flex-col gap-2 items-start text-zinc-100 py-2'>
                    <p className=' text-xs'>{prop.title}</p>
                    {prop.loading === true ? (
                        <p className=' w-[80px] h-[25px] rounded-sm bg-zinc-800 animate-pulse'></p>
                    ): (
                        <>
                        <p className=' text-lg text-yellow-400'>₱ {prop.amount.slice(0,15)}</p>
                        <p className=' text-lg text-yellow-400'>{prop.amount.slice(15,30)}</p>
                            
                        </>

                    )}
                </div>

                <div className={`p-2  rounded-sm `}>
                    {/* {prop.icon} */}
                    <img src="/wallet.png" alt="wallet" width={60} height={60} className=' '/>
                </div>
            </div>

            <div className=' w-full flex items-center justify-between text-[.6rem] border-t-[1px] border-zinc-700'>
            <p className=' mt-2 text-yellow-400'>{prop.subtitle}</p>
            <p className=' mt-2 text-yellow-400'>{prop.text}</p>

            </div>
        </div>
  )
}
