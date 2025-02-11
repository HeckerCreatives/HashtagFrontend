'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { bots } from '@/app/data'
import { type CarouselApi } from "@/components/ui/carousel"
  



export default function Hashbot() {

    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
   
    React.useEffect(() => {
      if (!api) {
        return
      }
   
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
   
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])


  return (
    <section id='hashbot' className=' w-full flex flex-col  gap-4 items-center justify-center py-20'>
    
      <h2 className="~text-xl/3xl font-bold text-yellow-500">
       Our Hash Bot
      </h2>

        <Carousel className='  w-full overflow-visible'
       
       
          setApi={setApi}
        >
        <CarouselContent className=' h-auto md:h-[450px] lg:h-[550px] overflow-visible '>
            <CarouselItem className=' flex items-end justify-end overflow-visible'>
            <div className=' w-full h-[470px] flex flex-col md:flex-row gap-6 bg-zinc-900 p-4 md:p-10'>

                <div className=' relative w-full md:w-[800px] bg-zinc-800 md:bg-none flex items-center justify-center p-2'>
                    <img src={bots[0].img} alt="hashbot" width={900} height={900}  className=' w-[100px] md:absolute md:w-full bottom-0'/>
                </div>

                <div className=' flex flex-col gap-1'>
                    <p className=' ~text-lg/2xl font-semibold text-yellow-400'>{bots[0].name}</p>
                    <p className=' ~text-xs/lg text-zinc-400'>{bots[0].description}</p>

                    <p className=' ~text-sm/xl font-semibold mt-4'>Profit</p>

                    <p className=' text-zinc-300 ~text-xs/lg'>Top Up: <span className=' text-yellow-400'>Php {bots[0].topup.toLocaleString()}</span></p>
                    <p className=' text-zinc-300 ~text-xs/lg'>Minimum: <span className=' text-yellow-400'>Php {bots[0].min.toLocaleString()}</span></p>
                    <p className=' text-zinc-300 ~text-xs/lg'>Maximum: <span className=' text-yellow-400'>Php {bots[0].max.toLocaleString()}</span></p>
                    <p className=' text-zinc-300 ~text-xs/lg'>ROI: In just {bots[0].duration} days </p>
                    <p className=' text-zinc-300 ~text-xs/lg'>Total income of: {bots[0].profit}%</p>
                </div>

                </div>
            </CarouselItem>

            <CarouselItem className=' flex items-end justify-end overflow-visible'>
            <div className='  h-[470px] w-full flex flex-col md:flex-row gap-6 bg-zinc-900 p-4 md:p-10'>

                <div className=' relative w-full md:w-[800px] bg-zinc-800 md:bg-none flex items-center justify-center p-2'>
                    <img src={bots[1].img} alt="hashbot" width={900} height={900}  className=' w-[100px] md:absolute md:w-full bottom-0'/>
                </div>

                <div className=' flex flex-col gap-1'>
                    <p className=' ~text-lg/2xl font-semibold text-yellow-400'>{bots[1].name}</p>
                    <p className=' ~text-xs/lg text-zinc-400'>{bots[1].description}</p>

                    <p className=' ~text-sm/xl font-semibold mt-4'>Profit</p>

                    <p className=' text-zinc-300 ~text-xs/lg'>Top Up: <span className=' text-yellow-400'>Php {bots[1].topup.toLocaleString()}</span></p>
                    <p className=' text-zinc-300 ~text-xs/lg'>Minimum: <span className=' text-yellow-400'>Php {bots[1].min.toLocaleString()}</span></p>
                    <p className=' text-zinc-300 ~text-xs/lg'>Maximum: <span className=' text-yellow-400'>Php {bots[1].max.toLocaleString()}</span></p>
                    <p className=' text-zinc-300 ~text-xs/lg'>ROI: In just {bots[1].duration} days </p>
                    <p className=' text-zinc-300 ~text-xs/lg'>Total income of:{bots[1].profit}%</p>
                </div>

                </div>
            </CarouselItem>


            <CarouselItem className=' flex items-end justify-end overflow-visible'>
            <div className='  h-[470px] w-full flex flex-col md:flex-row gap-6 bg-zinc-900 p-4 md:p-10'>

                <div className=' relative w-full md:w-[800px] bg-zinc-800 md:bg-none flex items-center justify-center p-2'>
                    <img src={bots[2].img} alt="hashbot" width={900} height={900}  className=' w-[100px] md:absolute md:w-full bottom-0'/>
                </div>

                <div className=' flex flex-col gap-1'>
                    <p className=' ~text-lg/2xl font-semibold text-yellow-400'>{bots[2].name}</p>
                    <p className=' ~text-xs/lg text-zinc-400'>{bots[2].description}</p>

                    <p className=' ~text-sm/xl font-semibold mt-4'>Profit</p>

                    <p className=' text-zinc-300 ~text-xs/lg'>Top Up: <span className=' text-yellow-400'>Php {bots[2].topup.toLocaleString()}</span></p>
                    <p className=' text-zinc-300 ~text-xs/lg'>Minimum: <span className=' text-yellow-400'>Php {bots[2].min.toLocaleString()}</span></p>
                    <p className=' text-zinc-300 ~text-xs/lg'>Maximum: <span className=' text-yellow-400'>Php {bots[2].max.toLocaleString()}</span></p>
                    <p className=' text-zinc-300 ~text-xs/lg'>ROI: In just {bots[2].duration} days </p>
                    <p className=' text-zinc-300 ~text-xs/lg'>Total income of: 20% {bots[2].profit}</p>
                </div>

                </div>
            </CarouselItem>

          

        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
        </Carousel>

        <div className=' flex items-center justify-center gap-2 mt-12'>
            {bots.map((item, index) => (
                <button key={index} onClick={() => api && api.scrollTo(index)} className={`${index + 1 === current ? 'w-10 h-4 bg-yellow-500' : 'w-4 h-4 bg-zinc-500'} rounded-full transition-all duration-300`}></button>
            ))}

        </div>

   
   </section>
  )
}
