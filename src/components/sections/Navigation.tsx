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
    <nav  id='home' className=' w-full flex items-center justify-between h-auto py-4 '>
        <a href="/">
        <img src="/assets/Logo.png" alt="logo" width={80} height={80}/></a>

        <div className=' hidden lg:flex items-center gap-4 text-sm'>
            {Links.map((item, index) =>(
                <a key={index} href={item.route} className=' hover:text-yellow-500 transition-all duration-200'>{item.name}</a>
            ))}

        </div>

        
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

          </div>
        </SheetContent>
      </Sheet>

    </nav>
  )
}
