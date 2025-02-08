'use client'
import Spinner from '@/components/common/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function Form() {
  const [key, setKey] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const createKey = async () => {
    setLoading(true)
    if(key !== '') {
      try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/globalpass/createglobalpassword`,{
          secretkey: key
          },{
              withCredentials:true,
              headers:{
              'Content-Type': 'application/json',
              }
          })
  
          const response = await toast.promise(request, {
              loading: 'Creating key....',
              success: `Successfully created`,
              error: 'Error while creating key',
          });
    
          if( response.data.message === 'success'){
              setLoading(false)
              setKey('')
              router.push('?state=true')
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
    } else {
      setLoading(false)
      toast.error(`Please enter a master key`) 
      
    }
   
  }


  return (
    <div className=' w-full max-w-[1440px] flex'>
        <div className=' flex flex-col gap-1 bg-zinc-900 max-w-[500px] w-full h-auto p-6 lg:p-10 rounded-md'>
            <label htmlFor="" className=' text-xs text-zinc-400'>Master key</label>
            <Input value={key} onChange={(e) => setKey(e.target.value)} type="text" placeholder='Enter master key' className=' text-sm p-2 rounded-md ' />
            <div className=' w-full flex ite justify-end mt-6'>
                <Button onClick={createKey} className=' bg-yellow-600 text-white flex items-center justify-center gap-2'>
                {loading === true && (
                    <Spinner/>
                    )}
                  Save</Button>
            </div>
        </div>
    </div>
   
  )
}
