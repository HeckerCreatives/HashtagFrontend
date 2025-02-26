import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Comission from './Comission'
import ComissionHsitory from './Comissionhistory'
import Comissionhistory from './Comissionhistory'
import ComissionList from './Comission'
import Hashbotlist from './Hashbotlist'
import Hashbothistory from './Hashbothistory'


export default function List() {
  return (
    <div className=' max-w-[1740px] w-full bg-zinc-900 p-2 md:p-6'>
        <Tabs defaultValue="comission" className=" w-full">
        <TabsList>
            <TabsTrigger value="comission">Commission</TabsTrigger>
            <TabsTrigger value="hashbot">Hash Bot</TabsTrigger>
        </TabsList>
        <TabsContent value="comission" className=' w-full'>
            <ComissionList/>
            <Comissionhistory/>
        </TabsContent>
        <TabsContent value="hashbot">
            <Hashbotlist/>
            <Hashbothistory/>
        </TabsContent>
        </Tabs>


    </div>
  )
}
