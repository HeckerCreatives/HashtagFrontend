'use client'
import Footer from '@/components/sections/Footer'
import Navigation from '@/components/sections/Navigation'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Key, KeyRound, LogIn, Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { Register, registeruser } from '@/validations/schema'


export default function page() {
    const [showpassword, setShowpassword] = useState('password')
    const [showconfirm, setShowconfirm] = useState('password')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const params = useSearchParams()
    const uid = params.get('uid')
    const [getusername, setGetusername] = useState('')

    const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registeruser),
  });

  const onSubmit = async (data: Register) => {
    setLoading(true)
    const { confirm, ...submitData } = data;
    try {
         const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/register`,{
        username: submitData.username,
        password: submitData.password,
        referral: uid,
        phonenumber: submitData.phonenumber
        })

        const response = await toast.promise(request, {
            loading: 'Registering account....',
            success: `Registered successfully`,
            error: 'Error while registering your account out',
        });

        if (response.data.message === 'success'){
            router.push('/auth/login')
            setLoading(false)

        }

        
    } catch (error) {
        setLoading(false)
         if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        toast.error(`${axiosError.response.data.data}`)     
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
    
  };


  useEffect(() => {
    const getUsername = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/getreferralusername?id=${uid}`)
        setGetusername(res.data.data)
    }
    getUsername()
  },[])

  useEffect(() => {
    setValue('referral', getusername);
}, [getusername, setValue]);

  
  return (
    <main className=" h-full w-full flex flex-col justify-center items-center overflow-x-hidden ">
          
       

        <div className=" w-full h-auto flex flex-col items-center justify-center relative">
                           <video 
                              autoPlay 
                              loop 
                              muted 
                              playsInline 
                              className="absolute z-0 top-0 left-0 w-full h-full object-cover"
                            >
                              <source src="/assets/Home BGLoop.mp4" type="video/mp4" />
                            </video>
                  
                            <div className=" w-full h-full absolute bg-zinc-950/80 z-10">
                  
                            </div>
                            <div className=" relative z-20 w-full h-[80px] flex items-center justify-center border-b-2 border-yellow-500 bg-zinc-950/90 py-2">
                              <Navigation/>
                  
                            </div>
                  
                          <div className=" relative max-w-[1440px] w-full h-full px-4 flex flex-col gap-8">
                            
                          <div className=' relative p-4 h-[85vh] w-full flex items-center justify-center'>
          
            <div className=' relative z-20 w-full max-w-[800px] h-auto bg-zinc-900 grid grid-cols-1 md:grid-cols-2 p-10 place-items-center shadow-md'>

                <form onSubmit={handleSubmit(onSubmit)} className=' w-full max-w-[360px] flex flex-col gap-1 items-center justify-center '>
                    <img src="/assets/Logo.png" alt="logo" width={130} height={130}/>   
                    <div className=' w-full flex items-center gap-2'>
                        <div className=' w-9 aspect-square bg-yellow-400 rounded-full text-black flex items-center justify-center'>
                            <User size={20}/>
                        </div>
                        <Input placeholder='Username' className=' w-full rounded-full' {...register('username')}/>
                        
                    </div>
                    {errors.username && <p className=' text-[.6em] text-red-400'>{errors.username.message}</p>}


                    <div className=' w-full flex items-center gap-2'>
                        <div className=' w-9 aspect-square bg-yellow-400 rounded-full text-black flex items-center justify-center'>
                            <Phone size={20}/>
                        </div>
                        <Input placeholder='Phone' className=' w-full rounded-full' {...register('phonenumber')}/>
                        
                    </div>
                    {errors.phonenumber && <p className=' text-[.6em] text-red-400'>{errors.phonenumber.message}</p>}


                    <div className=' relative w-full flex items-center gap-2'>
                        <div className=' w-9 aspect-square bg-yellow-400 rounded-full text-black flex items-center justify-center'>
                            <KeyRound size={20}/>
                        </div>
                        <Input type={showpassword} placeholder='Password' className=' w-full rounded-full' {...register('password')}/>
                        <p className=' cursor-pointer absolute right-4 top-3 text-yellow-400'>{showpassword === 'password' ? <EyeOff size={20} onClick={()=> setShowpassword('text')}/> : <Eye size={20} onClick={()=> setShowpassword('password')}/>}</p>

                    </div>
                    {errors.password && <p className=' text-[.6em] text-red-400'>{errors.password.message}</p>}


                    <div className=' relative w-full flex items-center gap-2'>
                        <div className=' w-9 aspect-square bg-yellow-400 rounded-full text-black flex items-center justify-center'>
                            <KeyRound size={20}/>
                        </div>
                        <Input type={showconfirm} placeholder='Confirm Password' className=' w-full rounded-full' {...register('confirm')}/>
                        <p className=' cursor-pointer absolute right-4 top-3 text-yellow-400'>{showconfirm === 'password' ? <EyeOff size={20} onClick={()=> setShowconfirm('text')}/> : <Eye size={20} onClick={()=> setShowconfirm('password')}/>}</p>

                        
                    </div>
                    {errors.confirm && <p className=' text-[.6em] text-red-400'>{errors.confirm.message}</p>}


                    <div className=' w-full flex items-center gap-2'>
                        <div className=' w-9 aspect-square bg-yellow-400 rounded-full text-black flex items-center justify-center'>
                            <User size={20}/>
                        </div>
                        <Input value={getusername} disabled placeholder='Referral' className=' w-full rounded-full' {...register('referral')}/>
                        
                    </div>
                    {errors.referral && <p className=' text-[.6em] text-red-400'>{errors.referral.message}</p>}


                    <div className=' w-full flex items-center gap-2 mt-4'>
                        <div className=' w-9 aspect-square bg-yellow-400 rounded-full text-black flex items-center justify-center'>
                            <LogIn size={20}/>
                        </div>
                        <Button className=' w-full rounded-full'>Login</Button>
                    </div>

                   {/* <p className=' text-xs text-center mt-8'>Already have an account?<a href="/auth/login" className=' text-yellow-400'>Log in</a></p> */}

                </form>

                <div className=' hidden md:flex items-center justify-center'>
                    <img src="/assets/LOGIN.png" alt="logo" width={900} height={900}/>   

                </div>

            </div>

            

         </div>
                  
                          </div>
        </div>
    
         
    
          <Footer/>
    
    
    </main>
  )
}
