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
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Pagination from '@/components/common/Pagination'
import axios from 'axios'
import Spinner from '@/components/common/Spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



type Miner = {
  amount: number
createdAt: string
fromusername: string
minername: string
type: string
username: string
}

type Credit = {
  amount: number
createdAt: string
fromusername: string
type: string
username: string
 minername: string
}

type TabData = {
  commissionwallet: Miner[];
  creditwallet: Credit[];
  minecoinwallet: Miner[];
  directcommissionwallet: Miner[];
};



type TabKeys = keyof TabData;

export default function DashboardTable() {

  const [tab, setTab] = useState('commissionwallet')


  const [list, setList] = useState<Credit[]>([])
  const [comission, setComission] = useState<Credit[]>([])
  const [mine, setMine] = useState<Credit[]>([])
  const [ directcommission, setDirectcomission] = useState<Credit[]>([])
  const [totalpage, setTotalPage] = useState(0)
  const [currentpage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if(tab === 'creditwallet'){
      const getHistory = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallethistory/userwallethistory?type=creditwallet&page=${currentpage}&limit=10`,{
        withCredentials: true
        })
      setList(res.data.data.history)
      setTotalPage(res.data.data.pages)
      setLoading(false)
      }
      getHistory()
    }
    
  },[ currentpage, tab])

  useEffect(() => {
    setLoading(true)
    if(tab === 'minecoinwallet'){
      const getBuyHistory = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallethistory/userwallethistory?type=minecoinwallet&page=${currentpage}&limit=10`,{
        withCredentials: true
        })
      setMine(res.data.data.history)
      setTotalPage(res.data.data.pages)
      setLoading(false)
      }
      getBuyHistory()
    }
    
  },[ currentpage, tab])

  useEffect(() => {
    setLoading(true)
    if(tab === 'commissionwallet'){
       const getHistory = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallethistory/userwallethistory?type=commissionwallet&page=${currentpage}&limit=10`,{
      withCredentials: true
      })
     setComission(res.data.data.history)
     setTotalPage(res.data.data.pages)
     setLoading(false)
    }
    getHistory()
    }
   
  },[ currentpage, tab])

  useEffect(() => {
    setLoading(true)
    if(tab === 'directcommissionwallet'){
      const getHistory = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallethistory/userwallethistory?type=directcommissionwallet&page=${currentpage}&limit=10`,{
      withCredentials: true
      })
     setDirectcomission(res.data.data.history)
     setTotalPage(res.data.data.pages)
     setLoading(false)
    }
    getHistory()
    }
    
  },[ currentpage,tab])



  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  
  return (
    <div className=' relative w-full flex flex-col items-center gap-8 max-w-[1920px] min-h-[500px] h-auto mt-12 bg-zinc-900 p-6'>
        {/* <div className=' absolute top-0 w-[98%] bg-gradient-to-r from-green-700 to-green-500 p-2 rounded-sm -translate-y-4'>
            <Select value={tab} onValueChange={setTab}>
            <SelectTrigger className="w-[200px] bg-zinc-900">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="commissionwallet">Comission Wallet History</SelectItem>
                <SelectItem value="directcommissionwallet">Direct Comission Wallet History</SelectItem>
                <SelectItem value="minecoinwallet">Miner Wallet History</SelectItem>
                <SelectItem value="creditwallet">Credit Wallet History</SelectItem>
            </SelectContent>
            </Select>


        </div> */}

        <div className=' w-full flex items-start'>
          <Tabs value={tab} onValueChange={setTab} defaultValue="commissionwallet" className=" lg:flex hidden">
            <TabsList>
              <TabsTrigger value="commissionwallet">Commission Wallet History</TabsTrigger>
              <TabsTrigger value="directcommissionwallet">Direct Commission Wallet History</TabsTrigger>
              <TabsTrigger value="minecoinwallet">Hash Bot Wallet History</TabsTrigger>
              <TabsTrigger value="creditwallet">Credit Wallet History</TabsTrigger>
            </TabsList>
           
          </Tabs>

          <Select value={tab} onValueChange={setTab}>
            <SelectTrigger className="w-[200px] bg-zinc-900 flex lg:hidden">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="commissionwallet">Commission Wallet History</SelectItem>
                <SelectItem value="directcommissionwallet">Direct Commission Wallet History</SelectItem>
                <SelectItem value="minecoinwallet">Hash Bot Wallet History</SelectItem>
                <SelectItem value="creditwallet">Credit Wallet History</SelectItem>
            </SelectContent>
            </Select>
        </div>

        


        { tab === 'commissionwallet' && (
          <>
           <Table className=' mt-4'>
            {comission.length === 0 && (
              <TableCaption className=' text-xs'>No data</TableCaption>
            )}
             {loading === true && (
              <TableCaption className=' '>
                <Spinner/>
              </TableCaption>
            )}
            <TableHeader className=' border-slate-700'>
                <TableRow>
                <TableHead className=' text-center'>Date</TableHead>
                <TableHead className=' text-center'>Amount</TableHead>
                <TableHead className=' text-center'>From</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {comission.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className=' text-center'>{new Date(item.createdAt).toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.amount.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>{item.fromusername}</TableCell>
                </TableRow>
              ))}
                
            </TableBody>
            </Table>

             {comission.length !== 0 && (
            < Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>

            )}


         
          </>
         
        )}

        { tab === 'directcommissionwallet' && (
          <>
           <Table className=' mt-8'>
            {directcommission.length === 0 && (
              <TableCaption className=' text-xs'>No data</TableCaption>
            )}
             {loading === true && (
              <TableCaption className=' '>
                <Spinner/>
              </TableCaption>
            )}
            <TableHeader className=' border-slate-700'>
            
                <TableRow>
                <TableHead className=' text-center'>Date</TableHead>
                <TableHead className=' text-center'>Amount</TableHead>
                <TableHead className=' text-center'>From</TableHead>
                </TableRow>
            
            </TableHeader>
            <TableBody>
                {directcommission.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className=' text-center'>{new Date(item.createdAt).toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.amount.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>{item.fromusername}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
             {directcommission.length !== 0 && (
            < Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>

            )}
          </>
         
        )}

        { tab === 'minecoinwallet' && (
          <>
           <Table className=' mt-8'>
            {mine.length === 0 && (
              <TableCaption className=' text-xs'>No data</TableCaption>
            )}
             {loading === true && (
              <TableCaption className=' '>
                <Spinner/>
              </TableCaption>
            )}
            <TableHeader className=' border-slate-700'>
                <TableRow>
                <TableHead className=' text-center'>Date</TableHead>
                <TableHead className=' text-center'>Amount</TableHead>
                <TableHead className=' text-center'>Hash Bot Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
               {mine.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className=' text-center'>{new Date(item.createdAt).toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.amount.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>{item.minername}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>

             {mine.length !== 0 && (
            < Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>

            )}

          </>
         
        )}

        { tab === 'creditwallet' && (
          <>
           <Table className=' mt-8'>
            {list.length === 0 && (
              <TableCaption className=' text-xs'>No data</TableCaption>
            )}
             {loading === true && (
              <TableCaption className=' '>
                <Spinner/>
              </TableCaption>
            )}
            <TableHeader className=' border-slate-700'>
                <TableRow>
                <TableHead className=' text-center'>Date</TableHead>
                <TableHead className=' text-center'>Amount</TableHead>
                <TableHead className=' text-center'>From</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className=' text-center'>{new Date(item.createdAt).toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.amount.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>{item.fromusername}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
           

            {list.length !== 0 && (
            <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>

            )}
          </>
         
        )}


        

    </div>
  )
}
