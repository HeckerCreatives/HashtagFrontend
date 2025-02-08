'use client'
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Spinner from './Spinner';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


type Props = {
    id: string
    name: string
    duration: number
   
    img: string
    size: string
    max: number
    min: number,
    profit: number,
    isBuyonetakeone: string

}

export default function HashbotCard( prop: Props) {
    const router = useRouter()
    const [slider, setSlider] = useState(0)
    const [duration, setDuration] = useState(0)
    const [profit, setProfit] = useState(0)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [b1t1, setB1t1] = useState(false)
    const [isChecked, setIsChecked] = useState(false);
    

    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(false)

    const editComplan = async () => {
        setLoading(true)
        try {
          const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/miner/editminer`,{
            min: min,
            max: max,
            profit: profit / 100,
            isBuyonetakeone: b1t1 ? '1' : '0',
            minerid: prop.id,
            duration: duration
          },{
            withCredentials: true
          })
          setDialog(false)

          const response = await toast.promise(request, {
              loading: 'Updating miner....',
              success: `Successfully updated`,
              error: 'Error while updating miner',
          });

          if(response.data.message === 'success'){
            window.location.reload()
            setLoading(false)
          }


        } catch (error) {
            setLoading(false)

            if (axios.isAxiosError(error)) {
                        const axiosError = error as AxiosError<{ message: string, data: string }>;
                        if (axiosError.response && axiosError.response.status === 401) {
                            toast.error(`${axiosError.response.data.data}`)
                            router.push('/')
                        }

                        if (axiosError.response && axiosError.response.status === 400) {
                            toast.error(`${axiosError.response.data.data}`) 
                        }

                        if (axiosError.response && axiosError.response.status === 402) {
                            toast.error(`${axiosError.response.data.data}`)                 
                        }

                        if (axiosError.response && axiosError.response.status === 403) {
                            toast.error(`${axiosError.response.data.data}`)              
                        }

                        if (axiosError.response && axiosError.response.status === 404) {
                            toast.error(`${axiosError.response.data.data}`)             
                        }
            } 
          
        }
    }

    useEffect(() => {
      if(prop){
        setProfit(prop.profit)
        setDuration(prop.duration)
        setMin(prop.min)
        setMax(prop.max)
        setB1t1(prop.isBuyonetakeone === '0' ? false : true)
      }
    },[prop])

  return (

    <div className=' relative w-full max-w-[350px] flex max-h-auto '>
        <div className=' relative w-full  flex flex-col bg-zinc-800 rounded-sm p-6 h-auto'>
            <div className=' relative w-full grid grid-cols-1 gap-4 h-auto'>
                <div className=' w-full relative flex items-center justify-center'>
                    {/* <img src={prop.img} alt="" height={50} className='' /> */}

                </div>

                <div className=' w-full flex flex-col gap-1'>
                    <p className=' text-sm font-semibold text-yellow-500'>{prop.name}</p>

                    <div className=' bg-zinc-900 rounded-sm p-2 flex items-center justify-between'>
                      <label htmlFor="" className=' text-xs'>Buy one take one ({b1t1 ? 'on' : 'off'})</label>
                      <Switch checked={b1t1} onCheckedChange={setB1t1}/>
                    </div>
                   
                    <label htmlFor="" className=' mt-2 text-xs'>Profit ({prop.profit}%)</label>
                    <Input value={profit} onChange={(e) => setProfit(e.target.valueAsNumber)}  placeholder='Duration' type="number" className=' p-3  rounded-sm text-xs'/>
                    <label htmlFor="" className=' mt-2 text-xs'>Duration (days)</label>
                    <Input value={duration} onChange={(e) => setDuration(e.target.valueAsNumber)}  placeholder='Duration' type="number" className=' p-3  rounded-sm text-xs'/>

                    <label htmlFor="" className=' mt-2 text-xs'>Min</label>
                    <Input value={min} onChange={(e) => setMin(e.target.valueAsNumber)}  placeholder='Duration' type="number" className=' p-3  rounded-sm text-xs'/>

                    <label htmlFor="" className=' mt-2 text-xs'>Max</label>
                    <Input value={max} onChange={(e) => setMax(e.target.valueAsNumber)}  placeholder='Duration' type="number" className=' p-3  rounded-sm text-xs'/>

                    <Button onClick={editComplan} disabled={loading} className=' bg-yellow-600 text-white w-fit mt-2 flex items-center justify-center gap-2'>
                    {loading === true && ( <div className='spinner'></div>)}
                        Save</Button>
                </div>
            </div>

            
        </div>
    </div>
    
  )
}
