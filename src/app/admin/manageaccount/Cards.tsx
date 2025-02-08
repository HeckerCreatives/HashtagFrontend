'use client'
import Card from '@/components/common/Card'
import ManageCard from '@/components/common/Managecard'
import axios, { AxiosError } from 'axios'
import { Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


type Count = {
  activeusers: number
banusers: number
totalusers: number
}

export default function Cards() {
  const [count, setCount] = useState<Count>()
  const router = useRouter()


  useEffect(() => {
    const getCount = async () => {
      try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/getusercountadmin`,{
          withCredentials:true
          })
          setCount(response.data.data)
   

        
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`)
              router.push('/')  
              }    
            } 
        }
    }
    getCount()
  },[])


  
  return (
    <div className=' max-w-[1240px] h-auto w-full grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8 mt-6'>


        <ManageCard icon={<Wallet size={30} />} iconbg={' bg-orange-500'} title={'Total Active Users'} amount={`${count?.totalusers}`} subtitle={'Current total active users'} text={''}/>
        <ManageCard icon={<Wallet size={30} />} iconbg={' bg-green-500'} title={'Active Users'} amount={`${count?.activeusers}`} subtitle={'Current active users'} text={''}/>
        <ManageCard icon={<Wallet size={30} />} iconbg={' bg-red-500'} title={'Banned Users'} amount={`${count?.banusers}`} subtitle={'Current Banned users'} text={''}/>
        
    </div>
  )
}
