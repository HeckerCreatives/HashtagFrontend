import Myhashbotcard from '@/components/common/Myhashbotcard'
import Pagination from '@/components/common/Pagination'
import Productcard from '@/components/common/Productcard'
import Spinner from '@/components/common/Spinner'
import { Item } from '@radix-ui/react-dropdown-menu'
import axios, { AxiosError } from 'axios'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'



type Inventory ={
  buyprice: number
duration: number
earnings: number
minerid: string
profit: number
purchasedate: string
remainingtime: number
type: string
}

export default function Rigs() {
   const params = useSearchParams()
  const state = params.get('state')

  const micro = '/assets/micro op2.png'
  const mega = '/assets/mega opt2.png'
  const giga = '/assets/giga opt2.png'

  const [list, setList] = useState<Inventory[]>([])
  const [totalpage, setTotalPage] = useState(0)
  const [currentpage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  

  
  useEffect(() => {
    setLoading(true)
    const getInventory = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getinventory?page=${currentpage}&limit=6`,{
          withCredentials: true
          })
        setList(res.data.data.miners)
        setTotalPage(res.data.data.totalPages)
        
        setLoading(false)
        
      } catch (error) {
      }
     
    }
    getInventory()
  },[state, currentpage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


  return (

    <div className=' w-full flex flex-col gap-8 items-center justify-center mt-12'>
      {Object.values(list).length === 0 ? (
        <div className=' w-full flex items-center justify-center h-[200px]'>
          <p className=' text-sm text-zinc-400'>No Inventory</p>

        </div>
      ): (
        <>
        {loading ? (
          <div className=' w-full h-[500px] flex items-center justify-center'>
            <Spinner/>
          </div>
        ): (
          <div className=' w-full max-w-[1440px] grid lg:grid-cols-2 xl:grid-cols-3 gap-4'>

            {Object.values(list).map((item, index) => (
              <Myhashbotcard id={item.minerid} key={index} name={`${item.type === 'micro_hash' && 'Micro Hash' || item.type === 'mega_hash' && 'Mega Hash' || item.type === 'giga_hash' && 'Giga Hash'}`} percentage={`${item.profit * 100}`} duration={item.duration} img={`${item.type === 'micro_hash' && micro || item.type === 'mega_hash' && mega || item.type === 'giga_hash' && giga}`} size={'150'} earnings={item.earnings} timeleft={item.remainingtime} purchase={new Date(item.purchasedate).toLocaleString()} max={item.buyprice} buyprice={item.buyprice} b1t1={''}/>

            ))}

        </div>
        )}
        
        </>
        
      )}

      {Object.values(list).length !== 0 && (
       <Pagination onPageChange={handlePageChange} total={totalpage} currentPage={currentpage}/>

      )}
    </div>
   
  )
}
