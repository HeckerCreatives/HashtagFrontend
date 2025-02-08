import React from 'react'

export default function Hero() {
  return (
   <section className=' relative z-20 w-full max-w-[1440px] h-auto grid grid-cols-1 lg:grid-cols-2  gap-4 items-center justify-center md:py-12'>
    <div className=' w-full flex items-center justify-center '>
    <img src="/assets/Home.png" alt="" width={700} height={700} className=' w-[500px]' />
    </div>
    <div className=' flex flex-col gap-4 lg:gap-6 px-4'>
      <h1 className="~text-3xl/6xl font-bold text-[#F5B748]">
        TRADE & EARN
      </h1>
      <p className=' ~text-sm/xl text-zinc-200'>Where every Hash Bot holds the power to Profit</p>
      <a href='/auth/login' className=' ~text-sm/lg w-fit px-6 py-2 rounded-full bg-[#F5B748] text-black font-semibold'>Log in</a>
    </div>
   
   </section>
  )
}
