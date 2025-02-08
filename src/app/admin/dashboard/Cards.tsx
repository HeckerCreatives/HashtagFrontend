'use client'
import Card from '@/components/common/Card'
import axios, { AxiosError } from 'axios'
import { Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Wallets = {
  companycommission: number
minerprofit: number
payin: number
payoutcommission: number
payoutminer: number
registered: number
totalpayout: number
totalusercommission: number

}

export default function Cards() {
  const router = useRouter()
  const [wallets, setWallets] = useState<Wallets>() 
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    const getWallets = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/staffusers/getadmindashboard`,{
        withCredentials:true
        })
        setWallets(response.data.data)
        setLoading(false)

      
      } catch (error) {
        setLoading(false)

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
            toast.error(`${axiosError.response.data.data}`)
            router.push('/')  
            }    
          } 
      }
    }
    getWallets()
  },[])

  return (
    <div className=' max-w-[1440px] h-auto w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 mt-6'>


         <Card icon={<Wallet size={30} />} iconbg={' bg-orange-500'} title={'Payin'} amount={`${wallets?.payin.toLocaleString()}`} subtitle={'Use to purchase hash bot'} text={''} loading={loading}/>
                <Card icon={<Wallet size={30} />} iconbg={' bg-green-500'} title={'Total Payout'} amount={`${wallets?.totalpayout.toLocaleString()}`} subtitle={'The sum of commission wallet & hash bot wallet'} text={''} loading={loading}/>
                <Card icon={<Wallet size={30} />} iconbg={' bg-red-500'} title={'Hash Bot Total Payout'} amount={`${wallets?.payoutminer.toLocaleString()}`} subtitle={'Total income from hash bot'} text={''} loading={loading}/>
                <Card icon={<Wallet size={30} />} iconbg={' bg-blue-500'} title={'Company Commission'} amount={`${wallets?.companycommission.toLocaleString()}`} subtitle={''} text={''} loading={loading}/>
                <Card icon={<Wallet size={30} />} iconbg={' bg-pink-500'} title={'Total User Commission'} amount={`${wallets?.totalusercommission.toLocaleString()}`} subtitle={'Total accumulated commission from direct refferal'} text={''} loading={loading}/>
                <Card icon={<Wallet size={30} />} iconbg={' bg-purple-500'} title={'Unilevel Total Commission'} amount={`${wallets?.registered.toLocaleString()}`} subtitle={'Total accumulated commission from lvl 2 to lvl 10'} text={''} loading={loading}/>
                <Card icon={<Wallet size={30} />} iconbg={' bg-cyan-500'} title={'Total Payout Commission'} amount={`${wallets?.payoutcommission.toLocaleString()}`} subtitle={'Withdrawable value from direct referral & unilevel'} text={''} loading={loading}/>
                <Card icon={<Wallet size={30} />} iconbg={' bg-cyan-500'} title={'Hash Bot Profit'} amount={`${wallets?.minerprofit.toLocaleString()}`} subtitle={'The sum of referral commission, unilevel & hash bot total earning'} text={''} loading={loading}/>

    </div>
  )
}
