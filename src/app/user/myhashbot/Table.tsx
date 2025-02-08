import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import Pagination from '@/components/common/Pagination'
import axios from 'axios'
import { list } from 'postcss'

type Claim = {
  amount: number
createdAt: string
minertype: string

}


export default function ClaimHistoryTable() {

   const [history, setHistory] = useState<Claim[]>([])

  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)

  useEffect(() => {
    const getRequestHistory = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getclaimhistory?page=${currentpage}&limit=10`,{
        withCredentials: true
      })

      setHistory(response.data.data.history)
      setTotalpage(response.data.data.totalpages)

    }
    getRequestHistory()
  },[currentpage])

  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }


  
  return (
    <div className=' relative w-full flex flex-col items-center gap-8 max-w-[1440px] min-h-[500px] h-auto mt-12 bg-zinc-900 p-6'>
            <p className=' w-full text-start text-sm text-white font-semibold'>Claim History</p>
        
        <Table className=' mt-8'>
          {history.length === 0 &&
          <TableCaption className=' text-xs'>No data</TableCaption>
          }
        <TableHeader className=' border-slate-700'>
            <TableRow>
            <TableHead className=' text-center'>Date</TableHead>
            <TableHead className=' text-center'>Price</TableHead>
            <TableHead className=' text-center'>Type</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item, index) => (
            <TableRow key={index}>
              <TableCell className=' text-center'>{new Date(item.createdAt).toDateString()}</TableCell>
              <TableCell className=' text-center'>₱ {item.amount.toLocaleString()}</TableCell>
              <TableCell className=' text-center'>{item.minertype === 'micro_hash' && 'Micro Hash' || item.minertype === 'mega_hash' && 'Mega Hash' || item.minertype === 'giga_hash' && 'Giga Hash'}</TableCell>
            </TableRow>
          ))}
            
        </TableBody>
        </Table>

        {/* <div className=' flex items-center gap-1 text-xs'>
            <button className=' bg-green-500 text-white p-2 rounded-sm'><ArrowLeft size={15}/></button>

            <p className=' p-2 bg-slate-700 aspect-square w-8 h-8 text-center rounded-sm'>0</p>
            <button className=' bg-green-500 text-white p-2 rounded-sm'><ArrowRight size={15}/></button>
        </div> */}
        {history.length !== 0 && (
          <Pagination onPageChange={handlePageChange} total={totalpage} currentPage={currentpage}/>

        ) }

    </div>
  )
}
