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
import Spinner from '@/components/common/Spinner'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import Pagination from '@/components/common/Pagination'
import Countdown from 'react-countdown'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Miner = {
    minerid:string
    type: string
    buyprice: number
    profit: number
    duration: number
    earnings: number
    remainingtime: number
    purchasedate: string

}

export default function Inventory() {
    const params = useSearchParams()
    const id = params.get('uid')
    const [list, setList] = useState<Miner[]>([])
    const [loading, setLoading] = useState(false)
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [matureLoading, setMatureLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getplayerinventoryforsuperadmin?playerid=${id}&page=${currentpage}&limit=10`,
                    {
                        withCredentials: true
                    }
                )
                setList(response.data.data.inventory)
                setTotalpage(response.data.data.totalPages)
              setLoading(false)

                
                
            } catch (error) {
                
                
            }
        
        }

        getWallets()
     
     },[currentpage])


    const handlePageChange = (page: number) => {
        setCurrentpage(page)
    }

    const matureBot = async (botid: string) => {
      try{

        setMatureLoading(true)

        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/inventory/maxplayerinventorysuperadmin`,
          {
            botid: botid
          },
          {
              withCredentials: true,
          }
        )
        setLoading(true)
        const getWallets = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getplayerinventoryforsuperadmin?playerid=${id}&page=${currentpage}&limit=10`,
                    {
                        withCredentials: true
                    }
                )
                setList(response.data.data.inventory)
                setTotalpage(response.data.data.totalPages)
              setLoading(false)

                
                
            } catch (error) {
                
                
            }
        
        }

        getWallets()

        setModalOpen(false)
        setMatureLoading(false)
      }
      catch(err){

      }
    }
    
  return (
    <div className=' w-full flex flex-col gap-8 items-center bg-zinc-900 min-h-[500px] p-4'>
        <Table className=''>
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
                <TableHead className=' text-center'>Purchase Date</TableHead>
                <TableHead className=' text-center'>Price</TableHead>
                <TableHead className=' text-center'>Duration</TableHead>
                <TableHead className=' text-center'>Earnings</TableHead>
                <TableHead className=' text-center'>Profit</TableHead>
                <TableHead className=' text-center'>Remaining Time</TableHead>
                <TableHead className=' text-center'>Type</TableHead>
                <TableHead className=' text-center'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(list).map((item, index) => (
                <TableRow key={index}>
                  <TableCell className=' text-center'>{new Date(item.purchasedate).toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.buyprice}</TableCell>
                  <TableCell className=' text-center'>{item.duration}</TableCell>
                  <TableCell className=' text-center'>₱ {Math.floor(item.earnings * 100) / 100}</TableCell>
                  <TableCell className=' text-center'>₱ {item.profit}</TableCell>
                  <TableCell className=' text-center'>
                  <Countdown
                    className=' mt-2'
                    date={Date.now() + (item.remainingtime * 1000)} 
                    renderer={({ days, hours, minutes, seconds }) => (
                      <span className=' text-xs'>
                        Time left: {days} days : {hours} hours : {minutes} minutes : {seconds} seconds
                      </span>
                    )}
                  />
                  </TableCell>
                  <TableCell className=' text-center'>{item.type == "micro_hash" ? "Micro Hash" : item.type == "mega_hash" ? "Mega Hash" : item.type == "giga_hash" ? "Giga Hash" : ""}</TableCell>
                  <TableCell className=' text-center'>
                  <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogTrigger disabled={matureLoading || item.remainingtime <= 0}>
                        <Button onClick={() => setModalOpen(true)} className="inline-flex items-center" disabled={matureLoading || item.remainingtime <= 0}>
                        {matureLoading ? (
                            <Spinner />
                          ) : (
                            item.remainingtime <= 0 ? (
                              <p>Already matured</p>
                            ) : (
                              <p>Mature</p>
                            )
                          )}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure, you want to mature this hash bot?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently mature this hash bot!
                        </DialogDescription>
                      </DialogHeader>
                      <Button className="inline-flex items-center" onClick={() => 
                          matureBot(item.minerid)
                      } disabled={matureLoading}>
                      {matureLoading ? (
                          <Spinner />
                        ) : (
                          <p>Mature</p>
                        )}
                      </Button>
                    </DialogContent>
                  </Dialog>
                  </TableCell>
                </TableRow>
              ))}
                
            </TableBody>
            </Table>

             {list.length !== 0 && (
            <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>

            )}

    </div>
  )
}
