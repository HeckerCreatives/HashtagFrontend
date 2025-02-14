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
import { BorderTrail } from '../ui/border-trail'
import { motion } from 'motion/react'
import { TextRoll } from '../ui/text-roll'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between child animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

  



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
    
    {/* <motion.h2
      className="text-xl md:text-3xl font-bold text-yellow-500"
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }} 
      viewport={{ once: false, amount: 0.2 }}
    >
      <span className="text-white">Our</span> Hash Bot
    </motion.h2> */}

        <Carousel className='  w-full overflow-visible'
       
       
          setApi={setApi}
        >
        <CarouselContent className=' h-auto md:h-[450px] lg:h-[570px] overflow-visible '>

          {bots.map(( item, index) => (
            <CarouselItem key={index} className=' flex items-end justify-end overflow-visible'>
            <div className=' relative w-full h-[470px] flex flex-col md:flex-row gap-6 bg-zinc-900 p-4 md:p-10'>
            <BorderTrail
                className=''
                size={150}
              />

                <div className=' relative w-full md:w-[800px] bg-zinc-800 md:bg-none flex items-center justify-center p-2'>
                <motion.img
                  src={item.img}
                  alt="hashbot"
                  width={900}
                  height={900}
                  className="w-[100px] md:absolute md:w-full bottom-0"
                  animate={{ y: [0, -10, 0] }} // Bouncing effect
                  transition={{
                    repeat: Infinity, // Infinite loop
                    duration: 2, // Slower bounce
                    ease: "easeInOut",
                  }}
                />
                </div>

                <motion.div
                    className="flex flex-col gap-1"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible" // Triggers animation when in view
                    viewport={{ once: false, amount: 0.2 }}
                  >
                    <motion.p
                      className="text-lg md:text-2xl font-semibold text-yellow-400"
                      variants={itemVariants}
                    >
                      {item.name}

                      {/* <TextRoll className='text-2xl'
                      
                      transition={{repeat: Infinity, duration: 4, delay: 1,}}
                      
                      >
                      </TextRoll> */}
                    
                    </motion.p>
                    <motion.p className="text-xs md:text-lg text-zinc-400" variants={itemVariants}>
                      {item.description}
                    </motion.p>

                    <motion.p className="text-sm md:text-xl font-semibold mt-4" variants={itemVariants}>
                      Profit
                    </motion.p>

                    <motion.p className="text-zinc-300 text-xs md:text-lg" variants={itemVariants}>
                      Top Up: <span className="text-yellow-400">₱ {item.topup.toLocaleString()}</span>
                    </motion.p>
                    <motion.p className="text-zinc-300 text-xs md:text-lg" variants={itemVariants}>
                      Minimum: <span className="text-yellow-400">₱ {item.min.toLocaleString()}</span>
                    </motion.p>
                    <motion.p className="text-zinc-300 text-xs md:text-lg" variants={itemVariants}>
                      Maximum: <span className="text-yellow-400">₱ {item.max.toLocaleString()}</span>
                    </motion.p>
                    <motion.p className="text-zinc-300 text-xs md:text-lg" variants={itemVariants}>
                      ROI: In just {item.duration} days
                    </motion.p>
                    <motion.p className="text-zinc-300 text-xs md:text-lg" variants={itemVariants}>
                      Total income of: {item.profit}%
                    </motion.p>
                  </motion.div>

                </div>
            </CarouselItem>
          ))}
          
          

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
