'use client'
import React, { useEffect, useState } from 'react'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import { Switch } from '@/components/ui/switch'
import axios, { AxiosError } from 'axios'
import { Turtle } from 'lucide-react'
import { Value } from '@radix-ui/react-select'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import HashbotCard from '@/components/common/Hashbotcard'

type Miner = {
    duration: number
  id: string
  isBuyonetakeone: string
  max: number
  min: number
  name: string
  profit: number
  }


export default function page() {
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const params = useSearchParams()
    const refresh = params.get('state')

    const handleSwitchChange: React.Dispatch<React.SetStateAction<boolean>> = (event) => {
        setIsChecked(event);
        onOff(event)
      };

    useEffect(() => {

       const getState = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/maintenance/geteventmaintenance?type=b1t1`,{
            withCredentials: true
        })

        setIsChecked(response.data.data.value === "0" ? false : true)

       }
       getState()
    },[refresh])

  
    const onOff = async (newState: any) => {
            setLoading(true)
            router.push('?state=true')
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/maintenance/changemaintenance`,{
                    type: 'b1t1',
                    value: newState === true ? '1' : '0'
                },{
                    withCredentials:true,
                    headers:{
                    'Content-Type': 'application/json',
                    }
                })
    
                if( response.data.message === 'success'){
                    toast.success(`Buy one take one is now ${isChecked === true ? 'off' : 'on'}`) 
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

    const [list, setList] = useState<Miner[]>([])

    useEffect(() => {

        const getState = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/miner/getminer`,{
            withCredentials: true
        })
        setList(response.data.data)
        }
        getState()
    },[])

    const micro = list.find((item) => item.name === 'Micro Hash')
    const mega = list.find((item) => item.name === 'Mega Hash')
    const giga = list.find((item) => item.name === 'Giga Hash')

   
  return (
    <SuperAdminLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-col items-center gap-12 p-8">
           

           <div className=' w-full max-w-[1740px] flex items-center flex-wrap gap-4'>
            <HashbotCard id={micro?.id || ''} name={'Micro Hash'} profit={(micro?.profit || 0) * 100} duration={micro?.duration || 0} img={'/assets/micro op2.png'} size={'140'} max={micro?.max || 0} min={micro?.min || 0} isBuyonetakeone={micro?.isBuyonetakeone || ''}/>
            <HashbotCard id={mega?.id || ''} name={'Mega Hash'} profit={(mega?.profit || 0) * 100} duration={mega?.duration || 0} img={'/assets/mega opt2.png'} size={'120'} max={mega?.max || 0} min={mega?.min || 0} isBuyonetakeone={mega?.isBuyonetakeone || ''}/>
            <HashbotCard id={giga?.id || ''} name={'Giga Hash'} profit={(giga?.profit || 0) * 100} duration={giga?.duration || 0} img={'/assets/giga opt2.png'} size={'110'} max={giga?.max || 0} min={giga?.min || 0} isBuyonetakeone={giga?.isBuyonetakeone || ''}/>
           </div>
        </div>
    </SuperAdminLayout>
  )
}
