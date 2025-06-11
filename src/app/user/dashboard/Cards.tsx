
import Card from '@/components/common/Card'
import axios, { AxiosError } from 'axios'
import { Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


type Wallets = {
    data : {
        "creditwallet": number
        "minecoinwallet": number
        "commissionwallet": number
        "unilevelwallet": number,
        "directwallet": number
    }
    
}

type TotalEarnings = {
    data:{
        mining: number
        referral: number
        unilevel: number
    }

}

type Unclaimed = {
    data: {
        unclaimedearnings: number

    }
}

interface Statistics {
  hashbot:number,
  referral:number,
  unilevel:number
}

export default function Cards() {


    const [wallets, setWallets] = useState<Wallets>()
    const [earnings, setEarnings] = useState<TotalEarnings>()
    const [totalearnings, setTotalearnings] = useState(0)
    const [withdrawables, setWithdrawables] = useState(0)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [unclaimed, setUnclaimed] = useState(0)
    const unclaimedValue = unclaimed.toLocaleString()
    const [stats, setStats] = useState<Statistics>()


    useEffect(() => {
      const getWallets = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallethistory/getwalletstatistics`,{
          withCredentials:true
          })
          
          setStats(response.data.data)
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
             
              }    
            } 
        }
      }
      getWallets()
  },[])
  

  useEffect(() => {
    setLoading(true)
    const getRequestHistory = async () => {
      try {
        const wallet = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallets/userwallets`,{
        withCredentials: true
        })
      
        setWallets(wallet.data)
        setWithdrawables(wallet.data.data.commissionwallet + wallet.data.data.minecoinwallet)
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
    getRequestHistory()
  },[])

  useEffect(() => {
    setLoading(true)

    const getRequestHistory = async () => {
     
      const earning = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallethistory/getwallettotalearnings`,{
        withCredentials: true
      })
     
      setEarnings(earning.data)
      setTotalearnings(earning.data.data.mining + earning.data.data.referral + earning.data.data.unilevel)
      setLoading(false)

    }
    getRequestHistory()
  },[])

  useEffect(() => {
    setLoading(true)

    const getRequestHistory = async () => {
     
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getremainingunclaimedminer`,{
        withCredentials: true
      })

      setUnclaimed(response.data.data.unclaimed)
  
      setLoading(false)

    }
    getRequestHistory()
  },[])



  return (
    <div className=' max-w-[1920px] h-auto w-full flex flex-wrap gap-8 mt-6'>

        <Card icon={<Wallet size={30} />} iconbg={' bg-orange-500'} title={'Top Up Balance'} amount={`${wallets?.data.creditwallet.toLocaleString()}`} subtitle={'Use to purchase hash bot set up'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-green-500'} title={'Total Withdrawables'} amount={`${((wallets?.data.commissionwallet || 0) + (wallets?.data.minecoinwallet || 0)).toLocaleString()}`} subtitle={'The sum of commission wallet & hash bot wallet'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-red-500'} title={'Hash Bot Wallet'} amount={`${wallets?.data.minecoinwallet.toLocaleString()}`} subtitle={'Total income from hash bot'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-blue-500'} title={'Unclaimed Hash Bot Earnings'} amount={`${unclaimed.toLocaleString()}`} subtitle={'Unclaimed Hash Bot Earnings'} text={`₱ ${unclaimed.toLocaleString()}`} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-pink-500'} title={'Referral Total Earnings'} amount={`${stats?.referral.toLocaleString()}`} subtitle={'Total accumulated commission from direct referral'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-purple-500'} title={'Unilevel Total Earnings'} amount={`${stats?.unilevel.toLocaleString()}`} subtitle={'Total accumulated commission from lvl 2 to lvl 13'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-cyan-500'} title={'Commission Wallet'} amount={`${((wallets?.data.directwallet || 0) + (wallets?.data.unilevelwallet || 0)).toLocaleString()}`} subtitle={'Withdrawable value from direct referral & unilevel'} text={''} loading={loading}/>
        <Card icon={<Wallet size={30} />} iconbg={' bg-cyan-500'} title={'Total Earnings'} amount={`${((stats?.unilevel || 0) + (stats?.referral || 0) + (unclaimed || 0)).toLocaleString()}`} subtitle={'The sum of referral commission, unilevel & hash bot total earning'} text={''} loading={loading}/>

    </div>
  )
}
