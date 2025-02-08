'use client'
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
import { ArrowLeft, ArrowRight, EllipsisVertical, Eye, EyeOff, OctagonAlert, RectangleEllipsis, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Pagination from '@/components/common/Pagination'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/common/Spinner'

type User = {
  createdAt: string
id: string
phonenumber: string
status: string
username: string
}


export default function UserTable() {
  const [shownew, setShownew] = useState('password')
  const [showconfirm, setShowconfirm] = useState('password')
  const router = useRouter()
  const [list, setList] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

   useEffect(() => {
    setLoading(true)
    const getCount = async () => {
      try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/getuserlistadmin?usersearch&status=${status === 'all' ? '' : status}&page=${currentpage}&limit=10`,{
          withCredentials:true
          })
          setList(response.data.data.userlist)
          setTotalpage(response.data.data.totalPages)
          setLoading(false)
   

        
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`)
              router.push('/')  
              }    
            } 
        }
    }
    getCount()
  },[currentpage, status])

  useEffect(() => {
    setLoading(true)
    const getuser = setTimeout ( async() => {
      try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/getuserlistadmin?usersearch=${search}&status&page=${currentpage}&limit=10`,{
          withCredentials:true
          })
          setList(response.data.data.userlist)
          setTotalpage(response.data.data.totalPages)
          setLoading(false)
          setCurrentpage(0)
   

        
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`)
              router.push('/')  
              }    
            } 
        }
    }, 500)

    return () => {
      clearTimeout(getuser)
    }
    
  },[search])

   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  return (
    <div className=' relative w-full flex flex-col items-center max-w-[1440px] min-h-[500px] h-auto mt-12 bg-zinc-900 p-6'>
        <div className=' flex md:flex-row flex-col gap-4 items-center justify-between sticky top-0 w-[98%] bg-gradient-to-r from-yellow-700 to-yellow-500 p-2 rounded-sm -translate-y-12'>
            <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[200px] bg-zinc-900">
                <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              
            </SelectContent>
            </Select>

            <div className=' flex flex-wrap items-center justify-center gap-2'>
              {/* <button className=' px-8 p-2 bg-red-600 rounded-sm text-white text-xs'>Ban</button> */}
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search Username' className=' p-2 rounded-sm text-xs bg-zinc-900 border-none' />
                {/* <button className=' p-2 bg-green-700 rounded-sm'><Search size={15}/></button> */}
            </div>


        </div>
        <Table className=''>
         {list.length === 0 &&  
          <TableCaption className=' text-xs'>No data</TableCaption>
          }

          {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
        <TableHeader className=' border-slate-700'>
            <TableRow>
            <TableHead className=' text-center' >Date Joined</TableHead>
            <TableHead className=' text-center'>Username</TableHead>
            <TableHead className=' text-center'>Phone no.</TableHead>
            <TableHead className=' text-center' >Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
           {loading === false && (
            <>
            {list.map(( item, index) => (
              <TableRow key={index}>
              
              <TableCell className="font-medium text-center">{new Date(item.createdAt).toDateString()}</TableCell>
              <TableCell className="font-medium text-center">{item.username}</TableCell>
              <TableCell className="font-medium text-center">{item.phonenumber}</TableCell>
              <TableCell className={`font-medium text-center ${item.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{item.status}</TableCell>
             
              </TableRow>
            ))}
            </>
          )}

        </TableBody>
        </Table>
        {list.length !== 0 && (
          <div className=' mt-12'>
            <Pagination onPageChange={handlePageChange} total={totalpage} currentPage={currentpage}/>
          </div>
        )}

  

    </div>
  )
}
