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
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Spinner from '@/components/common/Spinner'
import { levels } from '@/types/data'
import { Button } from '@/components/ui/button'


type Unilevel = {
      createdAt: string
level: number
totalAmount: number
username: string
_id: string

}


export default function MyConnectionTable() {

    const [unilevel, setUnilevel] = useState<Unilevel[]>([])
    const [level, setLevel] = useState('0')
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [search, setSearch] = useState('')
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)
    const getRequestHistory = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/unilevel/userunilevel?level=${level}&page=${currentpage}&limit=10&search=${search}`,{
          withCredentials: true
        })
        setLoading(false)
        const dataAtLevel = response?.data?.data?.[0];
       

         if(dataAtLevel){
           setUnilevel(dataAtLevel.data)
           setTotalpage(dataAtLevel.totalPages)
         }else {
           setUnilevel([])
         }
       

      } catch (error) {
       
      }
     
    }
    getRequestHistory()
  },[currentpage, level])

   useEffect(() => {
    setLoading(true)
    const getRequestHistory = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/unilevel/userunilevel?level=${level}&page=&limit=10&search=${search}`,{
          withCredentials: true
        })
        setLoading(false)
        setCurrentpage(0)
        const dataAtLevel = response?.data?.data?.[level];

        if(dataAtLevel){
          setUnilevel(dataAtLevel.data)
          setTotalpage(dataAtLevel.totalPages)
        }else {
          setUnilevel([])
        }
       
      } catch (error) {
       
      }
     
    }
    getRequestHistory()
  },[search])

  useEffect(() => {
    setCurrentpage(0)
  },[level])

  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  


  return (
    <div className=' relative w-full max-w-[1440px] flex md:flex-row gap-4 h-full mt-6'>

      <div className=' w-fit hidden md:flex flex-col gap-2'>
        {levels.map((item, index) => (
            <button 
            onClick={() => setLevel(item.value)}
                key={index} 
                className={`${level === item.value ? 'bg-yellow-600': ' bg-zinc-800'} px-4 py-2 rounded-md w-[100px] text-sm`}
            >
                {item.name}
            </button>
        ))}

      </div>

      <div className=' w-full flex flex-col bg-zinc-900 p-4'>
        {/* <div className=' flex md:flex-row flex-col gap-2 items-center justify-between absolute z-20 top-0 w-[98%] bg-gradient-to-r from-green-700 to-green-500 p-2 rounded-sm -translate-y-4'>
            <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-[200px] bg-zinc-900">
                <SelectValue placeholder="Select Levels" />
            </SelectTrigger>
            <SelectContent>
                {levels.map((item, index) => (
                <SelectItem key={index} value={item.value}>{item.name}</SelectItem>
                ))}
                
            </SelectContent>
            </Select>

            <div className=' flex items-center gap-2'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search Username' className=' p-2 rounded-sm text-xs bg-zinc-900 border-none' />
                <button className=' p-2 bg-green-700 rounded-sm'><Search size={15}/></button>
            </div>


        </div> */}

        <div className=' w-full flex flex-wrap items-end justify-end gap-4'>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-[200px] md:hidden bg-zinc-900">
                <SelectValue placeholder="Select Levels" />
            </SelectTrigger>
            <SelectContent>
                {levels.map((item, index) => (
                <SelectItem key={index} value={item.value}>{item.name}</SelectItem>
                ))}
                
            </SelectContent>
            </Select>
          <div className=' flex items-center gap-2'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search Username' className=' p-2 rounded-sm text-xs bg-zinc-800 border-none' />
                <button className=' p-2 bg-yellow-600 rounded-sm'><Search size={15}/></button>
            </div>
        </div>

        

        <Table className=' mt-4'>
          {unilevel.length === 0 &&  
          <TableCaption className=' text-xs'>No data</TableCaption>
          }

          {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
        <TableHeader className=' border-slate-700'>
            <TableRow>
            <TableHead className=' text-center'>Date</TableHead>
            <TableHead className=' text-center'>Username</TableHead>
            <TableHead className=' text-center'>Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {unilevel.map((item, index) => (
            <TableRow key={ index}>
            <TableCell className=' text-center'>{new Date(item.createdAt).toDateString()}</TableCell>
            <TableCell className=' text-center'>{item.username}</TableCell>
            <TableCell className=' text-center'>₱ {item.totalAmount}</TableCell>
            
            </TableRow>
          ))}
            
        </TableBody>
        </Table>

        <div className=' w-full flex items-center justify-center mt-8'>
        {unilevel.length !== 0 && (
          <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
        )}
        </div>

       
      </div>
       


    </div>
  )
}
