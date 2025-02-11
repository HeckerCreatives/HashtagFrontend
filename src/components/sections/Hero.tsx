'use client'
import { motion } from 'motion/react'
import React from 'react'

export default function Hero() {
  return (
   <section className=' relative z-20 w-full max-w-[1440px] h-auto grid grid-cols-1 lg:grid-cols-2  gap-4 items-center justify-center md:py-12'>
    <div className=' w-full flex items-center justify-center '>
    <motion.img src="/assets/Home.png" alt="" width={700} height={700} className=' w-[500px]' 
    
    initial={{ opacity: 0, y: 20 }} 
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, ease: "easeOut" }} 
       viewport={{ once: false, amount: 0.2 }}/>
    </div>
    <div className=' flex flex-col gap-4 lg:gap-6 px-4'>
      <motion.h1 className="~text-3xl/6xl font-bold text-[#F5B748]"
       initial={{ opacity: 0, y: 20 }} 
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, ease: "easeOut" }} 
       viewport={{ once: false, amount: 0.2 }}
      >
        TRADE & EARN
      </motion.h1>
      <motion.p className=' ~text-sm/xl text-zinc-200'
       initial={{ opacity: 0, y: 20 }} 
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, ease: "easeOut", delay: .2 }} 
       viewport={{ once: false, amount: 0.2 }}
      >Where every Hash Bot holds the power to Profit</motion.p>
      <motion.a href='/auth/login' className=' ~text-sm/lg w-fit px-6 py-2 rounded-full bg-[#F5B748] text-black font-semibold'
       initial={{ opacity: 0, y: 20 }} 
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, ease: "easeOut",delay: .4 }} 
       viewport={{ once: false, amount: 0.2 }}
      >Log in</motion.a>
    </div>
   
   </section>
  )
}
