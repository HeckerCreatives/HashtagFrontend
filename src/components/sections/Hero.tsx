'use client'
import { motion } from 'motion/react'
import React from 'react'

export default function Hero() {
  return (
   <section className=' relative z-20 w-full max-w-[1440px] h-auto gap-4 flex flex-col items-center justify-center md:py-12 py-20'>
    
    {/* <div className=' w-full flex items-center justify-center '>
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
    </div> */}

    {/* <div className=' w-full flex flex-col items-center justify-center h-auto ~mt-28/40'>
      <h2 className=' ~text-xl/3xl font-bold text-yellow-500 -translate-y-2'># World Class Trading Site</h2>
      <div className=' w-fit relative flex items-center justify-between h-[80px]'>
        <img src="/assets/Circle Frame_left.png" alt="frame" width={300} className=' absolute left-0 -translate-x-24'/>
        <h1 className=' ~text-2xl/4xl font-bold'>Where every Hash Bot holds the power to Profit</h1>
        <img src="/assets/Circle Frame_right.png" alt="frame" width={300} className=' absolute right-0 translate-x-24'/>

      </div>

      <h2 className=' text-[3rem] font-bold text-yellow-500'>TRADE & EARN</h2>

    </div> */}

    <motion.img 
     initial={{ opacity: 0, y: 20 }} 
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8, ease: "easeOut" }} 
     viewport={{ once: false, amount: 0.2 }}
    src="/assets/herotitle.svg" alt="" className=' w-[90%] md:w-[70%] ~mt-16/40'/>

    <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: .3}} 
    viewport={{ once: false, amount: 0.2 }}
    className=' relative w-[85%] h-auto flex items-center justify-center ~mt-16/52'>
      <img src="/assets/Frame.png" alt="frame" />

      <div className=' absolute flex items-center justify-between w-full h-full'>
        <div className=' w-full h-full relative'>
        <img src="/assets/Robot1.png" alt="robot" width={450} height={450} className=' absolute bottom-1 left-0 -translate-x-8'/>

        </div>
        <div className=' w-full h-full flex items-center justify-center'>
        <img src="/assets/logo.png" alt="robot" width={220} height={220} className=' ~w-16/60' />

        </div>

        <div className=' w-full h-full relative'>
        <img src="/assets/Robot2.png" alt="robot" width={500} height={500} className=' h-full max-h-[500px] absolute bottom-1 right-0 translate-x-8'/>

        </div>
      </div>
    </motion.div>

    <h2 className=' ~text-xs/2xl font-bold -translate-y-6'><span className=' text-yellow-500'>HASH</span>BOT</h2>
   
   </section>
  )
}
