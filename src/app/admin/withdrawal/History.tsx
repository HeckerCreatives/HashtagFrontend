import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ComissionHsitory from './ComissionHsitory'
import RigMinerHistory from './RigminerHistory'
import ComissionHistory from './ComissionHsitory'


export default function History() {
  return (
    <div className='relative w-full flex flex-col max-w-[1440px]'>
        <Tabs defaultValue="comission" className="w-full h-full">
        <TabsList>
            <TabsTrigger value="comission">Commission</TabsTrigger>
            <TabsTrigger value="hashbot">Hash Bot</TabsTrigger>
        </TabsList>
        <TabsContent value="comission">
            <ComissionHistory/>
        </TabsContent>
        <TabsContent value="hashbot">
            <RigMinerHistory/>
        </TabsContent>
        </Tabs>

    </div>
  )
}
