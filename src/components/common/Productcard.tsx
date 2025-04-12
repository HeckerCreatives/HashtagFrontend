'use client'
import React, { useEffect, useState } from 'react'
import { Slider } from "@/components/ui/slider"
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Spinner from './Spinner'
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



type Props = {
    name: string
    percentage: string
    duration: string
    min: number
    max: number
    img: string
    size: string
    b1t1: string

}

export default function Productcard( prop: Props) {
    const [slider, setSlider] = useState(0)
    const [val, setVal] = useState(0);
    const type = prop.name === 'Micro Hash' && 'micro_hash' || prop.name === 'Mega Hash' && 'mega_hash' || prop.name === 'Giga Hash' && 'giga_hash'
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [dialog, setDialog] = useState(false)
    const [isOpen, setIsopen] = useState('')
    const [skip, setSkip] = useState(true)


    const buyHashbot = async () => {
        setDialog(false)
        setLoading(true)
        router.push('?state=true')
        try {
            const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/inventory/buyminer`,{
                type: type, // quick_miner, switf_lane, rapid_lane
                priceminer: val,
                skip: skip
            },{
                withCredentials: true,
                headers:{
                    'Content-Type':'Application/json'
                }
            })

            const response = await toast.promise(request, {
                loading: `Purchasing ${prop.name}...`,
                success: `You succesfully purchased ${prop.name}`,
                error: `Error while purchasing ${prop.name}`,
            });
            if(response.data.message === 'success'){
                setLoading(false)
                router.push('?state=false')

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

        const getState = async () => {
         const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/maintenance/geteventmaintenance?type=b1t1`,{
             withCredentials: true
         })
 
         setIsopen(response.data.data.value)
        }
        getState()
     },[])

      
     const getState = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/miner/getuserminer?type=${type}`,{
            withCredentials: true
        })
        setSkip(response.data.data)
    }



  return (

    <div className=' w-full flex items-end justify-end h-[430px] max-w-[470px] mt-16'>
        <div className=' relative w-full flex flex-col bg-zinc-900 rounded-sm p-6 h-auto'>
            <div className=' relative w-full grid grid-cols-2 h-auto gap-4'>
                

                <div className=' w-full flex flex-col gap-1'>
                    <p className=' text-sm font-semibold text-white'>{prop.name}</p>
                    <p className=' text-xs text-yellow-500'>{prop.percentage}% Profit</p>
                    <p className=' text-xs text-yellow-500'>{prop.duration} days duration</p>

                </div>

                <div className=' w-full relative h-[100px]'>
                    <img src={prop.img} alt="" width={prop.size} className=' absolute bottom-0' />

                </div>
            </div>

            <div className=' w-full flex flex-col gap-2 mt-4'>

                <div className=' w-full p-2 bg-zinc-800 rounded-sm flex flex-wrap gap-1 items-center'>
                    <label htmlFor="" className=' text-xs text-zinc-400 w-[100px]'>Input amount:</label>
                    <Input type="number" maxLength={8} min={prop.min} max={prop.max} defaultValue={prop.min} value={val} onChange={(e) => setVal(e.target.valueAsNumber)}  placeholder='Input ammount here' className=' text-sm p-2 rounded-md '/>
                </div>

                <div className=' w-full p-2 bg-zinc-800 rounded-sm flex flex-wrap gap-1 items-center'>
                    <label htmlFor="" className=' text-xs text-zinc-400'>Minimum: </label>
                    <p className=' text-sm text-zinc-400'>Php {(prop.min).toLocaleString()}</p>

                </div>

                <div className=' w-full p-2 bg-zinc-800 rounded-sm flex flex-wrap gap-1 items-center'>
                    <label htmlFor="" className=' text-xs text-zinc-400'>Maximum: </label>
                    <p className=' text-sm text-zinc-400'>Php {(prop.max).toLocaleString()}</p>

                </div>
               

                <div className=' w-full flex md:flex-row flex-col gap-6 md:items-center justify-between mt-2'>
                    <p className=' text-sm font-semibold'>Selected price : <span className=' text-orange-300'>Php {val.toLocaleString()}</span></p>
                    

                    <Dialog open={dialog} onOpenChange={setDialog}>
                    <DialogTrigger onClick={getState}  disabled={loading} className=' w-fit px-6 py-2 text-sm font-semibold text-white bg-yellow-600 rounded-sm flex items-center gap-2'>
                       
                        {loading === true && (
                        <Spinner/>
                        )}
                        Order now
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Are you sure you’d like to proceed with ordering <span className=' text-yellow-500'>{prop.name}</span>? For</DialogTitle>
                        <DialogDescription>
                            
                        </DialogDescription>
                        </DialogHeader>
                        {skip === true && (
                            <>
                            <p className=' text-xs text-red-500'>Note: Just a friendly reminder bypassing the previous hashbot could lead to a 50% reduction in your potential profit.</p>

                            <div className=' w-full flex flex-col'>
                                <p className=' text-sm text-yellow-500  '><span className=' line-through'>{prop.percentage}% Profit</span>  {(prop.percentage as any) / 2}% Profit</p>
                                <p className=' text-sm text-yellow-500'>{prop.duration} days duration</p>
                                <p className=' text-sm text-white'>Selected Price: <span className=' text-yellow-500'>P {val.toLocaleString()}</span></p>

                                <div className=' w-full flex items-end justify-end gap-4'>
                                    <Button onClick={buyHashbot} className=' btn-gradient'>Continue</Button>

                                </div>
                            </div>
                            
                            </>
                        )}

                        {skip === false && (
                            <div className=' w-full flex flex-col'>
                                <p className=' text-sm text-yellow-500'>{prop.percentage}% Profit</p>
                                <p className=' text-sm text-yellow-500'>{prop.duration} days duration</p>
                                <p className=' text-sm text-white'>Selected Price: <span className=' text-yellow-500'>P {val.toLocaleString()}</span></p>

                                <div className=' w-full flex items-end justify-end gap-4'>
                                    <Button onClick={buyHashbot} className=' btn-gradient'>Continue</Button>

                                </div>
                            </div>
                        )}
                        
                    </DialogContent>
                    </Dialog>


                </div>

                <div className=' h-[25px] mt-2'>
                {prop.b1t1 === '1' && (
                <p className=' text-[.6rem] bg-green-600 px-3 py-1 w-fit rounded-full'>Note: This Hasbot is Buy 1 take 1.</p>
                )}
                </div>
               

            </div>


        
        </div>
    </div>
    
  )
}
