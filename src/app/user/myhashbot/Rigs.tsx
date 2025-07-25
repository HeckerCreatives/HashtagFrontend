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
name: string
}

export default function Rigs() {
   const params = useSearchParams()
  const state = params.get('state')

  const micro = '/assets/micro op2.png'
  const mega = '/assets/mega opt2.png'
  const giga = '/assets/giga opt2.png'
  const tera = '/bot/Tera.png'
  const ulti = '/bot/Ulti.png'
  const care = '/bot/Care.png'

  const [list, setList] = useState<Inventory[]>([])
  const [totalpage, setTotalPage] = useState(0)
  const [currentpage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  

  
  useEffect(() => {
    setLoading(true)
    const getInventory = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getinventory?page=${currentpage}&limit=8`,{
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
          <div className=' w-full max-w-[1920px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 md:gap-8'>

            {Object.values(list).map((item, index) => (
              <Myhashbotcard id={item.minerid} key={index} name={item.name} percentage={`${item.profit * 100}`} duration={item.duration} img={`${item.type === 'micro_hash' && micro || item.type === 'mega_hash' && mega || item.type === 'giga_hash' && giga || item.type === 'tera_hash' && tera || item.type === 'ulti_hash' && ulti || item.type === 'hash_care' && care} `} size={'150'} earnings={item.earnings} timeleft={item.remainingtime} purchase={new Date(item.purchasedate).toLocaleString()} max={item.buyprice} buyprice={item.buyprice} b1t1={''}/>

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
