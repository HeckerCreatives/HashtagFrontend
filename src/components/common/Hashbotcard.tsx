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
    isActive: string

}

export default function HashbotCard( prop: Props) {
    const router = useRouter()
    const [slider, setSlider] = useState(0)
    const [duration, setDuration] = useState(0)
    const [profit, setProfit] = useState(0)
    const [min, setMin] = useState<number | null>(null);
    const [max, setMax] = useState<number | null>(null);
    const [b1t1, setB1t1] = useState(false)
    const [store, setStore] = useState(false);
    

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
            duration: duration,
            isActive: store ? '1' : '0'
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
        setStore(prop.isActive === '0' ? false : true)
      }
    },[prop])

    const botImg = (data: string) => {
      if(data === 'Micro Hash'){
        return '/assets/micro op2.png'
      } else  if(data === 'Mega Hash'){
        return '/assets/mega opt2.png'
      } else  if(data === 'Giga Hash'){
        return '/assets/giga opt2.png'
      }else  if(data === 'Tera Hash'){
        return '/bot/Tera.png'
      }else  if(data === 'Ulti Hash'){
        return '/bot/Ulti.png'
      }else  if(data === 'Hash Care'){
        return '/bot/Care.png'
      }
    }

  return (

    <div className=' relative w-full flex max-h-auto '>
        <div className=' relative w-full  flex flex-col bg-zinc-800 rounded-sm p-6 h-auto'>
            <div className=' relative w-full grid grid-cols-1 gap-4 h-auto'>
                <div className=' w-full relative flex items-center justify-center'>
                    <img src={botImg(prop.name)} alt="" className=' h-[200px]' />

                </div>

                <div className=' w-full flex flex-col gap-1'>
                    <p className=' text-sm font-semibold text-yellow-500'>{prop.name}</p>

                     <div className=' bg-zinc-900 rounded-sm p-2 flex items-center justify-between'>
                      <label htmlFor="" className=' text-xs'>Available on Store ({store ? 'on' : 'off'})</label>
                      <Switch checked={store} onCheckedChange={setStore}/>
                    </div>

                    <div className=' bg-zinc-900 rounded-sm p-2 flex items-center justify-between'>
                      <label htmlFor="" className=' text-xs'>Buy one take one ({b1t1 ? 'on' : 'off'})</label>
                      <Switch checked={b1t1} onCheckedChange={setB1t1}/>
                    </div>
                   
                    <label htmlFor="" className=' mt-2 text-xs'>Profit ({prop.profit}%)</label>
                    <Input value={profit} onChange={(e) => setProfit(e.target.valueAsNumber)}  placeholder='Duration' type="number" className=' p-3  rounded-sm text-xs'/>
                    <label htmlFor="" className=' mt-2 text-xs'>Duration (days)</label>
                    <Input value={duration} onChange={(e) => setDuration(e.target.valueAsNumber)}  placeholder='Duration' type="number" className=' p-3  rounded-sm text-xs'/>

                    <label htmlFor="min" className="mt-2 text-xs">Min</label>
                      <Input
                        id="min"
                        value={min !== null ? min.toLocaleString() : ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/,/g, ""); // Remove commas before parsing
                          setMin(value ? Number(value) : null); // Set to null if empty
                        }}
                        placeholder="Duration"
                        type="text" // Use text to allow formatted display
                        className="p-3 rounded-sm text-xs"
                      />

                      <label htmlFor="max" className="mt-2 text-xs">Max</label>
                      <Input
                        id="max"
                        value={max !== null ? max.toLocaleString() : ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/,/g, ""); // Remove commas before parsing
                          setMax(value ? Number(value) : null); // Set to null if empty
                        }}
                        placeholder="Duration"
                        type="text" // Use text to allow formatted display
                        className="p-3 rounded-sm text-xs"
                      />


                    <Button onClick={editComplan} disabled={loading} className=' bg-yellow-600 text-white w-fit mt-2 flex items-center justify-center gap-2'>
                    {loading === true && ( <div className='spinner'></div>)}
                        Save</Button>
                </div>
            </div>

            
        </div>
    </div>
    
  )
}
