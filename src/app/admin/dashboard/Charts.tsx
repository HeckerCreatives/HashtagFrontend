"use client"

import { Barcharts } from "./Barchart"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import SalesTable from "./Sales"
import { LineCharts } from "./Linechart"



export const description = "A line chart with a label"

export function Chart() {
  const router = useRouter()
  const [graph, setGraph] = useState('payin')

  useEffect(() => {
    router.push(`?state=${graph}`)
  },[graph])

  
  return (
    <div className=" flex flex-col gap-4 w-full max-w-[1440px]  mt-16">
      <div className=" w-full">
      <Select value={graph} onValueChange={setGraph}>
        <SelectTrigger className=" w-[200px] bg-zinc-800">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className=" bg-zinc-800">
          <SelectItem value="payin">Payin</SelectItem>
          <SelectItem value="comission">Commission</SelectItem>
          <SelectItem value="minerpurchased">Hash Bot Purchased</SelectItem>
          <SelectItem value="minerpayout">Hash Bot Payout</SelectItem>
          <SelectItem value="unilevelpayout">Unilevel Payout</SelectItem>
        </SelectContent>
      </Select>

      </div>
      <div className=" w-full max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-8">
        <LineCharts/>
        <SalesTable/>
      </div>
    </div>

    
    
  )
}
