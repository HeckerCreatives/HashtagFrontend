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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Pagination from '@/components/common/Pagination'
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import Spinner from '@/components/common/Spinner'
import toast from 'react-hot-toast'

type Info = {
  amount: number
  createdAt: string
  minertype: string
}

export default function PurchaseHistoryTable() {
  const params = useSearchParams()
  const state = params.get('state')

  const [list, setList] = useState<Info[]>([])
  const [totalpage, setTotalPage] = useState(0)
  const [currentpage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const getBuyHistory = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getbuyhistory?limit=10&page=${currentpage}`,{
          withCredentials: true
          })
        setList(res.data.data.history)
        setTotalPage(res.data.data.totalpages)
        setLoading(false)
        
      } catch (error) {
        // if (axios.isAxiosError(error)) {
        //         const axiosError = error as AxiosError<{ message: string, data: string }>;
        //             if (axiosError.response && axiosError.response.status === 401) {
        //             toast.error(`${axiosError.response.data.data}`)
        //             router.push('/')  
        //             }    
        //         } 
      }
     
    }
    getBuyHistory()
  },[state, currentpage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


  return (
    <div className=' relative w-full flex flex-col items-center gap-8 max-w-[1920px] min-h-[500px] h-auto mt-12 bg-zinc-900 p-6'>
            <p className=' w-full text-start text-sm text-white font-semibold'>Purchase History</p>
        
        <Table className=' mt-8'>
          {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
          {list.length === 0 && (
          <TableCaption className=' text-xs'>No data</TableCaption>
          )}
        <TableHeader className=' border-slate-700'>
            <TableRow>
            <TableHead className=' text-center'>Purchased Date</TableHead>
            <TableHead className=' text-center'>Amount</TableHead>
            <TableHead className=' text-center'>Type</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {loading === false && (
            <>
            {list.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{new Date(item.createdAt).toDateString()}</TableCell>
                <TableCell className=' text-center'>₱ {item.amount.toLocaleString()}</TableCell>
                <TableCell className=' text-center'>{item.minertype === 'micro_hash' && 'Micro Hash' || item.minertype === 'mega_hash' && 'Mega Hash' || item.minertype === 'giga_hash' && 'Giga Hash'}</TableCell>
              </TableRow>
            ))}
            </>
          )}
          
            
        </TableBody>
        </Table>

        {/* <div className=' flex items-center gap-1 text-xs'>
            <button className=' bg-green-500 text-white p-2 rounded-sm'><ArrowLeft size={15}/></button>

            <p className=' p-2 bg-slate-700 aspect-square w-8 h-8 text-center rounded-sm'>0</p>
            <button className=' bg-green-500 text-white p-2 rounded-sm'><ArrowRight size={15}/></button>
        </div> */}

        {list.length !== 0 && (
          <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
        )}


    </div>
  )
}
