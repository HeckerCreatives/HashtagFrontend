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
isActive: string
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

 const filteredList = list.filter((item) => item.isActive === '1')

 console.log(filteredList)

 const micro = filteredList.find((item) => item.name === 'Micro Hash')
 const mega = filteredList.find((item) => item.name === 'Mega Hash')
 const giga = filteredList.find((item) => item.name === 'Giga Hash')
 const tera = filteredList.find((item) => item.name === 'Tera Hash')
 const ulti = filteredList.find((item) => item.name === 'Ulti Hash')
 const care = filteredList.find((item) => item.name === 'Hash Care')



  return (
    <div className=' w-full max-w-[1920px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12'>

      {filteredList.length === 0 && (
         <div className=' w-full flex items-center justify-center p-16 col-span-4'>
        <p className=' text-sm text-zinc-400'>No hash bot available!</p>

      </div>
      )}

     
        {micro && (
      <Productcard
        name={micro.name}
        percentage={`${micro.profit * 100}`}
        duration={`${micro.duration}`}
        min={micro.min}
        max={micro.max}
        img={'/assets/micro op2.png'}
        size={'160'}
        b1t1={micro.isBuyonetakeone || ''}
      />
    )}
    {mega && (
      <Productcard
        name={mega.name}
        percentage={`${mega.profit * 100}`}
        duration={`${mega.duration}`}
        min={mega.min}
        max={mega.max}
        img={'/assets/mega opt2.png'}
        size={'160'}
        b1t1={mega.isBuyonetakeone || ''}
      />
    )}
    {giga && (
      <Productcard
        name={giga.name}
        percentage={`${giga.profit * 100}`}
        duration={`${giga.duration}`}
        min={giga.min}
        max={giga.max}
        img={'/assets/giga opt2.png'}
        size={'160'}
        b1t1={giga.isBuyonetakeone || ''}
      />
    )}
    {tera && (
      <Productcard
        name={tera.name}
        percentage={`${tera.profit * 100}`}
        duration={`${tera.duration}`}
        min={tera.min}
        max={tera.max}
        img={'/bot/Tera.png'}
        size={'160'}
        b1t1={tera.isBuyonetakeone || ''}
      />
    )}
    {ulti && (
      <Productcard
        name={ulti.name}
        percentage={`${ulti.profit * 100}`}
        duration={`${ulti.duration}`}
        min={ulti.min}
        max={ulti.max}
        img={'/bot/Ulti.png'}
        size={'160'}
        b1t1={ulti.isBuyonetakeone || ''}
      />
    )}
    {care && (
      <Productcard
        name={care.name}
        percentage={`${care.profit * 100}`}
        duration={`${care.duration}`}
        min={care.min}
        max={care.max}
        img={'/bot/Care.png'}
        size={'160'}
        b1t1={care.isBuyonetakeone || ''}
      />
    )}
        
    </div>
  )
}
