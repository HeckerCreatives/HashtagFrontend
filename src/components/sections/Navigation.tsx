import { Links } from '@/app/data'
import { Menu } from 'lucide-react'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export default function Navigation() {
  return (
    <nav  id='home' className=' relative z-50 w-full max-w-[1440px]  flex items-center justify-between h-auto py-1 px-2 '>


        <a href="/" className=' flex items-center gap-2'>
        <img src="/assets/Logo.png" alt="logo" width={75} height={75}/> <span className=' text-xl font-bold'><span className=' text-yellow-500'>HASH</span>TAG</span></a>

        <div className=' hidden lg:flex items-center gap-6 text-sm'>
            {Links.map((item, index) =>(
                <a key={index} href={item.route} className=' hover:text-yellow-500 transition-all duration-200'>{item.name}</a>
            ))}

        </div>

        <a href='/auth/login' className=" lg:block hidden mt-4 px-10 py-2 bg-yellow-500 text-black relative clip-path font-semibold">
              Sign in
            </a>


        
        <Sheet>
        <SheetTrigger className=' block lg:hidden'>
         <Menu size={25}/>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className=' flex items-center justify-center'>
                <img src="/assets/logo.png" alt="logo" width={100} height={100}/>
            </SheetTitle>
            <SheetDescription>
              
            </SheetDescription>
          </SheetHeader>

          
          <div className=' flex flex-col items-center gap-4 text-sm mt-6'>
              {Links.map((item, index) =>(
                  <a key={index} href={item.route} className=' hover:text-yellow-500 transition-all duration-200'>{item.name}</a>
              ))}

            <a href='/auth/login' className=" mt-4 px-10 py-2 bg-yellow-500 text-black relative clip-path font-semibold">
              Sign in
            </a>


          </div>
        </SheetContent>
      </Sheet>

    </nav>
  )
}
