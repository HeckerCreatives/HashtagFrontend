'use client'
import { Links, privacyPolicy, termsAndConditions } from '@/app/data'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Footer() {
  const [activeTab, setActiveTab] = useState("terms")

  return (
    <footer className=' relative w-full flex  items-center justify-center bg-zinc-950 border-t-2 border-yellow-500 '>

      <div className=' hidden lg:block footerclip w-[30%] h-full bg-zinc-900 absolute left-0 z-0'>

      </div>
        <div className=' relative z-10 w-full  max-w-[1440px] flex flex-col gap-8 md:flex-row items-center justify-between py-4'>
            <a href="/">
            <img src="/assets/Logo.png" alt="logo" width={100} height={100}/></a>


            <p className=" text-sm text-zinc-400">© 2025 All Rights Reserved Hashtag.</p>

            {/* <div className='flex items-center gap-4 text-sm'>
                <a href="">Terms & Conditions</a>
                <a href="">Privacy Policy</a>
    
            </div> */}

            <Dialog>
            <DialogTrigger>
              <div className=' flex text-xs items-center gap-4 mt-4 text-zinc-200'>
                <p onClick={() => setActiveTab('terms')} className=' hover:text-yellow-500 cursor-pointer'>Terms & Conditions</p>
                <p onClick={() => setActiveTab('privacy')} className=' hover:text-yellow-500 cursor-pointer'>Privacy Policy</p>

              </div>
            </DialogTrigger>
            <DialogContent className=' bg-zinc-900 text-white w-[95%] md:w-full max-h-[90%] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle>Hashtag Legal Information</DialogTitle>
                <DialogDescription>
                  Please review our Terms & Conditions and Privacy Policy
                </DialogDescription>
              </DialogHeader>
              <div className="w-full max-w-4xl mx-auto text-sm">
              
             
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 bg-zinc-700">
                      <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                      <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                    </TabsList>
                    <TabsContent value="terms">
                      <Accordion type="single" collapsible className="w-full">
                        {termsAndConditions.map((item, index) => (
                          <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{item.title}</AccordionTrigger>
                            <AccordionContent className=' text-zinc-200 whitespace-pre-wrap'>{item.content}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </TabsContent>
                    <TabsContent value="privacy">
                      <Accordion type="single" collapsible className="w-full">
                        {privacyPolicy.map((item, index) => (
                          <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{item.title}</AccordionTrigger>
                            <AccordionContent className=' text-zinc-200 whitespace-pre-wrap'>{item.content}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </TabsContent>
                  </Tabs>
               
              </div>
            </DialogContent>
          </Dialog>
        </div>
           
    </footer>
  )
}
