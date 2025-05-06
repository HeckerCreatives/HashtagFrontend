import { Pen, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { handleApiError } from '@/lib/errorHandler'
import { useSearchParams } from 'next/navigation'
  

type Props ={
    icon: React.ReactElement
    iconbg: string
    title: string
    amount: number
    subtitle: string
    text: string
    loading: boolean
    editable: boolean
    type: string
}

export default function ViewCard( prop: Props) {
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(false)
     const params = useSearchParams()
        const id = params.get('uid')

    useEffect(() => {
        setAmount(prop.amount)
    },[prop])

    const editWallet = async () => {
        setLoading(true)
    
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/wallets/editplayerwalletforadmin`,{
                playerid: id,
              wallettype: prop.type,
              amount: amount
            },
                {
                    withCredentials: true
                }
            )
    
            if(response.data.message === 'success'){
              toast.success('Success')
              setLoading(false)
              window.location.reload()
           
    
            } 
    
            
            
        } catch (error) {
          setLoading(false)
    
            handleApiError(error)
            
        }
    
    }
  return (
    <div className=' w-[336px] flex flex-col justify-between flex-grow-1 h-[150px] bg-zinc-900 p-3'>
            <div className=' w-full grid grid-cols-[1fr_70px]  rounded-sm'>
               
            <div className=' w-full flex flex-col gap-2 text-zinc-100 py-2'>
                    <p className=' text-xs'>{prop.title}</p>
                    {prop.loading === true ? (
                        <p className=' w-[80px] h-[25px] rounded-sm bg-slate-600 animate-pulse'></p>
                    ): (
                        <>
                        <div className=' flex items-center gap-4'>
                            {prop.editable && (
                            <Dialog>
                            <DialogTrigger>
                            <button className=' bg-yellow-500 p-1 text-black rounded-sm cursor-pointer'><Pen size={ 12}/></button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure to edit <span className=' text-yellow-500'>{prop.title}</span>?</DialogTitle>
                                <DialogDescription>
                                   
                                </DialogDescription>
                                </DialogHeader>

                                <div className=' w-full'>
                                    <label htmlFor="">Amount</label>
                                    <Input
                                      type="text"
                                      className="text-white mt-1"
                                      value={amount.toLocaleString()}
                                      onChange={(e) => {
                                        const rawValue = e.target.value.replace(/,/g, '');
                                        const numValue = Number(rawValue);

                                        if (rawValue === '') {
                                          setAmount(0);
                                        } else if (!isNaN(numValue) && numValue >= 0) {
                                          setAmount(numValue);
                                        }
                                      }}
                                    />

                                    <Button disabled={loading} onClick={editWallet} className='clip-btn px-12 w-fit mt-4'>
                                    {loading === true && ( <div className='spinner'></div>)}
                                        Save</Button>

                                </div>
                            </DialogContent>
                            </Dialog>


                            )}
                            <p className=' text-lg text-yellow-200'>₱ {amount.toLocaleString()}</p>

                        </div>
                        {/* <p className=' text-lg text-yellow-200'>{prop.amount.slice(15,30)}</p> */}
                            
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
