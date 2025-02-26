'use client'
import Productcard from '@/components/common/Productcard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Miner = {
  duration: number
id: string
isBuyonetakeone: string
max: number
min: number
name: string
profit: number
}

export default function Product() {
  const [list, setList] = useState<Miner[]>([])

  useEffect(() => {

    const getState = async () => {
     const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/miner/getminer`,{
         withCredentials: true
     })
     setList(response.data.data)
    }
    getState()
 },[])

 const micro = list.find((item) => item.name === 'Micro Hash')
 const mega = list.find((item) => item.name === 'Mega Hash')
 const giga = list.find((item) => item.name === 'Giga Hash')



  return (
    <div className=' w-full max-w-[1740px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12'>
        <Productcard name={micro?.name || 'Micro Hash'} percentage={`${(micro?.profit || 0) * 100}`} duration={`${micro?.duration}`} min={micro?.min || 0} max={micro?.max || 0} img={'/assets/micro op2.png'} size={'160'} b1t1={micro?.isBuyonetakeone || ''}/>
        <Productcard name={mega?.name || 'Mega Hash'} percentage={`${(mega?.profit || 0) * 100}`} duration={`${mega?.duration}`} min={mega?.min || 0} max={mega?.max || 0} img={'/assets/mega opt2.png'} size={'160'} b1t1={mega?.isBuyonetakeone || ''}/>
        <Productcard name={giga?.name || 'Giga Hash'} percentage={`${(giga?.profit || 0) * 100}`} duration={`${giga?.duration}`} min={giga?.min || 0} max={giga?.max || 0} img={'/assets/giga opt2.png'} size={'160'} b1t1={giga?.isBuyonetakeone || ''}/>
        
    </div>
  )
}
