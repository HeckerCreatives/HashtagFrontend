'use client'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { faq, faqs } from '@/app/data'
import { motion } from 'motion/react'

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

export default function FAQ() {
  return (
    <section id='faq' className=' w-full h-auto grid grid-cols-1 lg:grid-cols-2  gap-8 items-center justify-center py-12'>
   
    <div className=' flex flex-col gap-6'>
      <motion.h1 className=" ~text-xl/3xl font-bold"
       initial={{ opacity: 0, y: 20 }} 
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, ease: "easeOut" }} 
       viewport={{ once: false, amount: 0.2 }}
      >
        HAVE ANY <span className=' yellow'>QUESTIONS?</span>
      </motion.h1>

      <motion.div className=' w-full flex flex-col gap-4'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      >
      {faqs.map((item, index) => (
        <motion.div key={index}
        variants={itemVariants}
        >
           <Accordion key={index} type="single" collapsible>
          <AccordionItem value="item-1">
              <AccordionTrigger className=' ~text-sm/lg bg-zinc-900 px-4'>{item.question}</AccordionTrigger>
              <AccordionContent className=' whitespace-pre-wrap ~text-xs/sm text-zinc-300 p-4 bg-zinc-900'>
              {item.answer}
              </AccordionContent>
          </AccordionItem>
          </Accordion>
        </motion.div>
       
      ))}
      </motion.div>
      
     
    </div>

    <div className=' w-full '>
        <motion.img src="/assets/FAQ.png" alt="" width={900} height={900} className=' w-[700px]' 
         animate={{ y: [0, -10, 0] }}
         transition={{
           repeat: Infinity, 
           duration: 2, 
           ease: "easeInOut",
         }}
        />
    </div>
   
   </section>
  )
}
