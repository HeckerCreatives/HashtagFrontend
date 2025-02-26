"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import {
  Menu,
  LogOut,
  Copy
} from "lucide-react"

import { usePathname, useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Breadcrumb from '../common/Breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { success } from '../common/Toast'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { user } from '@/types/routes'




export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const path = usePathname()
  const params = useSearchParams()

  const page = path.includes('/user/dashboard') && '' || path.includes('/user/network') && 'Network' || path.includes('/user/payout') && 'Payout' || path.includes('/user/buyhashbot') && 'Buy Hash Bot' || path.includes('/user/myhashbot') && 'My Hash Bot' || path.includes('/user/faq') && 'FAQ'

  const [username, setUsername] = useState('')
  const [id, setId] = useState('')
  const router = useRouter()
  const [referralstatus, setReferralStatus] = useState(false)


  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/getuserdata`,{
        withCredentials:true
        })
        setUsername(response.data.data.username)
        setId(response.data.data.referralid)
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
    getUserData()
  },[])

  useEffect(() => {
    const getReferralStatus = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/analytics/getreferrallinkstatus`,{
        withCredentials:true
        })
        setReferralStatus(response.data.data.status)
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
    getReferralStatus()
  },[])

  const copyReferral = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_REFERRAL}/auth/register?uid=${id}`)
    success('Referral link copied')
  }

  const logout = async () => {
    const request = axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/logout`,{
      withCredentials: true
    })

    const response = await toast.promise(request, {
      loading: 'Logging out....',
      success: `Logout successfully`,
      error: 'Error while logging out',
    });

    if(response.data.message === 'success'){
      router.push('/auth/login')
    }
  }


  return (
      <div className=" min-h-screen w-full flex flex-col overflow-hidden">
       
        <div className=" relative h-screen flex flex-col items-center overflow-y-auto">
          <header className=" max-w-[1740px] w-full sticky top-0 z-50 flex h-14 border-b-[1px] border-zinc-900 bg-zinc-950 items-center justify-between gap-4 bg-secondary p-4 lg:h-[74px] lg:px-6">
            <div className=' flex items-center gap-4 h-[74px]'>
              <Sheet>
                <SheetTrigger asChild className=' lg:hidden block'>
                <button className=' p-1 bg-zinc-900 rounded-sm text-yellow-400'><Menu size={15}/></button>
                </SheetTrigger>
                <SheetContent side="left" className=" flex flex-col bg-zinc-950 border-none"
                //  style={{backgroundImage: "url(/assets/BG.png)"}}
                >
                  
                  <div className=' flex items-center gap-2 text-white p-4'>
                    <img src="/assets/Logo.png" alt="" width={100} />
                  </div>
                  <nav className=" flex flex-col gap-4 px-2 text-sm font-medium lg:px-4">

                   {user.map((item, index) => (
                    <Link
                    key={index}
                      href={item.route}
                      className={` ${path.includes(item.route) ? ' bg-gradient' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-sm px-3  py-2 hover:bg-gradient-to-r from-yellow-800 to-yellow-500`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}

                  {referralstatus === true && (
                    <button onClick={() => copyReferral()} className=' text-xs w-fit text-white bg-zinc-800 p-2 rounded-sm flex items-center gap-1'><Copy size={15}/>Copy referral</button>
                  )}

                  </nav>
                
                </SheetContent>
              </Sheet>

                <div className=' relative z-10 hidden lg:flex items-center justify-center '>
                    <img src="/assets/Logo.png" alt="" width={60} />
                </div>
              <Breadcrumb dashboard={'/user/dashboard'} page={page}/>
              

            </div>
            
            {/* <Menu className="h-5 w-5 text-zinc-100 lg:block hidden" /> */}

            <div className=' flex items-center gap-2'>
              {referralstatus === true && (
                <button onClick={() => copyReferral()} className=' hidden text-xs w-fit text-white bg-zinc-800 p-2 rounded-sm lg:flex items-center gap-1'><Copy size={15}/>Copy referral</button>

              )}


              <DropdownMenu>
              <DropdownMenuTrigger className=' active:border-none focus:border-none'>
                <div className=' flex items-center gap-2'>
                  <div className=' flex flex-col'>
                    <p className=' text-xs text-white'>{username}</p>
                  </div>
                  <div className=' p-1 bg-zinc-800 rounded-full'>
                    <img src="/assets/Logo.png" alt="" width={25}/>
                  </div>

                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className=' cursor-pointer flex items-center gap-2'><LogOut size={15}/>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            </div>

            

            

            
          </header>
          <div className=" bg-zinc-950 z-50 sticky top-[74px] max-w-[1740px] w-full hidden lg:block py-2 border-b-[1px] border-zinc-800">
           <nav className=" flex items-center gap-4 px-2 text-sm font-medium lg:px-4 py-2">

            {user.map((item, index) => (
              <Link
              key={index}
                href={item.route}
                className={` ${path.includes(item.route) ? ' bg-gradient' : 'text-zinc-100'}  text-sm flex items-center gap-1 rounded-sm px-3  py-2 hover:bg-gradient-to-r from-yellow-800 to-yellow-500`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}


            </nav>
          </div>
          <main className=" w-full relative flex flex-1 flex-col items-center gap-4 ">
              {children}
          </main>
        </div>
      </div>
  )
}
