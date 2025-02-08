import { Links } from '@/app/data'
import React from 'react'

export default function Footer() {
  return (
    <footer className=' w-full flex  items-center justify-center bg-zinc-900 '>
        <div className=' w-full  max-w-[1440px] flex flex-col gap-8 md:flex-row items-center justify-between py-6'>
            <a href="/">
            <img src="/assets/Logo.png" alt="logo" width={100} height={100}/></a>


            <p className=" text-sm text-zinc-400">© 2025 All Rights Reserved Hashtag.</p>

            <div className='flex items-center gap-4 text-sm'>
                <a href="">Terms & Conditions</a>
                <a href="">Privacy Policy</a>
    
            </div>
        </div>
           
    </footer>
  )
}
