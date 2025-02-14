'use client'
import Footer from '@/components/sections/Footer'
import Navigation from '@/components/sections/Navigation'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Key, KeyRound, LogIn, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import loadingStore from '@/zustand/loading'


export default function page() {
    const [username, setUsername] = useState('')
    const [password, SetPassword] = useState('')
    const [showpassword, setShowpassword] = useState('password')
    const router = useRouter()
    const {loading, setLoading} = loadingStore()


    const login = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/login?username=${username}&password=${password}&ipAddress=${ip}`,
                {
                    withCredentials: true,
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }
            )

        //     const response = await toast.promise(request, {
        //     loading: 'Log in account....',
        //     success: `Successfully loged in`,
        //     error: 'Error while logging your account',
        // });

        if (response.data.data.auth === 'user' ){
            toast.success('Successfully logged in')
            router.push('/user/dashboard')
            setLoading(false)


        } else if(response.data.data.auth === 'superadmin'){
            toast.success('Successfully logged in')
            router.push('/superadmin/dashboard')
            setLoading(false)
        } 
         else if(response.data.data.auth === 'admin'){
             toast.success('Successfully logged in')
             router.push('/admin/dashboard')
             setLoading(false)
         } 
        
        else {
            toast.error(response.data.data)
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
    }

    const [ip, setIp] = useState('');

    useEffect(() => {
      const fetchIP = async () => {
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          setIp(data.ip);
        } catch (error) {
        }
      };

      fetchIP();
    }, []);


  return (
    <main className=" relative h-full w-full flex flex-col justify-center items-center overflow-x-hidden ">

        <div className=" w-full h-auto flex flex-col items-center justify-center relative">
                 <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute z-0 top-0 left-0 w-full h-full object-cover"
                  >
                    <source src="/assets/Home BGloop.mp4" type="video/mp4" />
                  </video>
        
                  <div className=" w-full h-full absolute bg-zinc-950/80 z-10">
        
                  </div>
                  <div className=" relative z-20 w-full h-[80px] flex items-center justify-center border-b-2 border-yellow-500 bg-zinc-950/90 py-2">
                    <Navigation/>
        
                  </div>
        
                <div className=" relative max-w-[1440px] w-full h-full px-4 flex flex-col gap-8">
                  
                <div className=' relative p-4 h-[80vh] w-full flex items-center justify-center'>
                    <div className=' relative z-20 w-full max-w-[800px] h-auto bg-zinc-900 grid grid-cols-1 md:grid-cols-2 p-10 place-items-center shadow-md'>

                        <div className=' w-full max-w-[360px] flex flex-col gap-4 items-center justify-center '>
                            <img src="/assets/Logo.png" alt="logo" width={150} height={150}/>   
                            <div className=' w-full flex items-center gap-2'>
                                <div className=' w-9 aspect-square bg-yellow-400 rounded-full text-black flex items-center justify-center'>
                                    <User size={20}/>
                                </div>
                                <Input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className=' w-full rounded-full'/>
                                
                            </div>

                            <div className=' w-full flex items-center gap-2'>
                                <div className=' w-9 aspect-square bg-yellow-400 rounded-full text-black flex items-center justify-center'>
                                    <KeyRound size={20}/>
                                </div>
                                <div className=' relative w-full text-black'>
                                    <Input type={showpassword} value={password} onChange={(e) => SetPassword(e.target.value)} placeholder='Password' className=' text-white w-full rounded-full'/>
                                    <button className=' absolute right-4 top-3 text-yellow-400'>{showpassword === 'password' ? <EyeOff size={20} onClick={()=> setShowpassword('text')}/> : <Eye size={20} onClick={()=> setShowpassword('password')}/>}</button>
                                    
                                </div>
                            </div>

                            <div className=' w-full flex items-center gap-2 mt-4'>
                                <div className=' w-9 aspect-square bg-yellow-400 rounded-full text-black flex items-center justify-center'>
                                    <LogIn size={20}/>
                                </div>
                                <Button disabled={loading} onClick={login} className=' w-full rounded-full'>
                                    {loading && (
                                    <span className=" spinner"></span>
                                    )}
                                    Login</Button>
                            </div>



                        </div>

                        <div className=' hidden md:flex items-center justify-center'>
                            <img src="/assets/LOGIN.png" alt="logo" width={800} height={800}/>   

                        </div>

                    </div>

            

                </div>
        
                </div>
        </div>

         
        
    
         
    
          <Footer/>
    
    
    </main>
  )
}
