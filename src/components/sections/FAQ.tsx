import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { faq } from '@/app/data'
  

export default function FAQ() {
  return (
    <section id='faq' className=' w-full h-auto grid grid-cols-1 lg:grid-cols-2  gap-8 items-center justify-center py-12'>
   
    <div className=' flex flex-col gap-6'>
      <h1 className=" ~text-xl/3xl font-bold">
        HAVE ANY <span className=' yellow'>QUESTIONS?</span>
      </h1>

      <div className=' w-full flex flex-col gap-4'>
      {faq.map((item, index) => (
        <Accordion key={index} type="single" collapsible>
        <AccordionItem value="item-1">
            <AccordionTrigger className=' ~text-sm/lg bg-zinc-900 px-4'>{item.question}</AccordionTrigger>
            <AccordionContent className=' ~text-xs/sm text-zinc-300 p-4 bg-zinc-900'>
            {item.answer}
            </AccordionContent>
        </AccordionItem>
        </Accordion>
      ))}
      </div>
      
     
    </div>

    <div className=' w-full '>
        <img src="/assets/FAQ.png" alt="" width={900} height={900} className=' w-[700px]' />
    </div>
   
   </section>
  )
}
