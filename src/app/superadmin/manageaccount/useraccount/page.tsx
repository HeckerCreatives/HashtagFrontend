
'use client'
import Card from '@/components/common/Card'
import { Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Cashout from './Cashout'
import Cashin from './Cashin'
import Unilevel from './Unilevel'
import Inventory from './Inventory'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Spinner from '@/components/common/Spinner'
import ViewCard from '@/components/common/ViewCard'
import WalletHistory from './WalletHistory'

type User = {
    banstatus: string
    referral: string
    username: string
    referralid: string

}

type Wallet = {
    userwallets : {
        commissionwallet
        : 
        {amount: number}
        creditwallet
        : 
        {amount: number}
        minecoinwallet
        : 
        {amount: number},
        directwallet
        : 
        {amount: number}
        unilevelwallet
        : 
        {amount: number}

    }
   
}


interface Statistics {
    hashbot:number,
    referral:number,
    unilevel:number
  }

export default function page() {

    const router = useRouter()
    const [ban, setBan] = useState('active')
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(false)
    const params = useSearchParams()
    const id = params.get('uid')
    const [data, setData] = useState<User>()
    const [wallet, setWallet] = useState<Wallet>()
    const state = params.get('state')

    const [stats, setStats] = useState<Statistics>()


    useEffect(() => {
      const getWallets = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallethistory/getwalletstatisticssuperadmin?id=${id}`,{
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

    //user data
    useEffect(() => {
       const getData = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/getuserdetailsbysuperadmin?userid=${id}`,
            {
                withCredentials: true
            }
        )
        setData(response.data.data)
        
       }

       
       getData()
    
    },[id])



    //ban
    const banUser = async () => {
      
        setLoading(true)
          try {
          const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/user/banusers`,{
            userlist: [`${id}`], 
            status: data?.banstatus === 'active' ? 'banned' : 'active'
          },{
            withCredentials:true,
            headers:{
              'Content-Type': 'application/json',
            }
          })
    
          const response = await toast.promise(request, {
            loading: `${ban === 'active' ? 'Unbanning' : 'Banning'} user account ....`,
            success: `Successfully ${ban === 'active' ? 'unbanned' : 'banned'}`,
            error: `Error while ${ban === 'active' ? 'unbanning' : 'banning'} user account`,
          });
    
          if(response.data.message === 'success'){
            setLoading(false)
            window.location.reload()
        
    
          }
    
        } catch (error) {
          setLoading(false)
          if (axios.isAxiosError(error)) {
                        const axiosError = error as AxiosError<{ message: string, data: string }>;
                        if (axiosError.response && axiosError.response.status === 401) {
                            toast.error(`${axiosError.response.data.data}`) 
                            router.push('/')    
                        }
    
                        if (axiosError.response && axiosError.response.status === 400) {
                            toast.error(`${axiosError.response.data.data}`)     
                                
                        }
    
                        if (axiosError.response && axiosError.response.status === 402) {
                            toast.error(`${axiosError.response.data.data}`)          
                                    
                        }
    
                        if (axiosError.response && axiosError.response.status === 403) {
                            toast.error(`${axiosError.response.data.data}`)              
                            
                        }
    
                        if (axiosError.response && axiosError.response.status === 404) {
                            toast.error(`${axiosError.response.data.data}`)             
                        }
          } 
        }
    }

    //wallets
    useEffect(() => {
        const getWallets = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallets/getplayerwalletforadmin?playerid=${id}`,
                    {
                        withCredentials: true
                    }
                )
                setWallet(response.data.data)
                
                
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        toast.error(`${axiosError.response.data.data}`) 
                        router.push('/')    
                    }

                    if (axiosError.response && axiosError.response.status === 400) {
                        toast.error(`${axiosError.response.data.data}`)     
                            
                    }

                    if (axiosError.response && axiosError.response.status === 402) {
                        toast.error(`${axiosError.response.data.data}`)          
                                
                    }

                    if (axiosError.response && axiosError.response.status === 403) {
                        toast.error(`${axiosError.response.data.data}`)              
                        
                    }

                    if (axiosError.response && axiosError.response.status === 404) {
                        toast.error(`${axiosError.response.data.data}`)             
                    }
                } 
                
            }
        
        }

        getWallets()
     
     },[id])

      


  return (
    <div className=' w-full h-screen flex flex-col items-center p-4 py-16 bg-zinc-950 overflow-y-auto'>

        <div className=' max-w-[1520px] w-full flex flex-col gap-6'>

            <div className=' relative w-full h-[150px]  bg-zinc-900 flex items-center justify-between p-8 rounded-md'
            >

                
                <div className=' z-20 flex flex-col gap-4'>
                    <h2 className=' text-2xl font-semibold'>{data?.username}</h2>
                     {data?.referralid !== '' ? (
                        <a target='_blank' href={`/superadmin/manageaccount/useraccount?uid=${data?.referralid}`} className=' text-xs underline cursor-pointer'>Referral: {data?.referral}</a>
                        ) : (
                        <p className=' text-xs'>Referral: {data?.referral}</p>
                        )}
                </div>

                
                <Dialog open={dialog} onOpenChange={setDialog}>
                  <DialogTrigger className=' relative z-20'>
                    {data?.banstatus === 'banned' ? (
                    <button className=' z-20 text-sm bg-blue-600 px-4 py-2 rounded-md'>Unban</button>

                    ): (
                    <button className=' z-20 text-sm bg-red-600 px-4 py-2 rounded-md'>Ban</button>

                    )}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className=' text-red-500'>Are you absolutely sure, you want to ban this user?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently ban the user account.
                        </DialogDescription>
                      </DialogHeader>

                    

                      <button onClick={banUser} className=' px-8 py-2 text-sm font-semibold rounded-sm bg-red-600 mt-4 w-fit flex items-center justify-center gap-2'>
                         {loading === true && (
                          <Spinner/>
                        )}
                        {data?.banstatus === 'ban' ? 'Unban' : 'Ban'}</button>
                  </DialogContent>
              </Dialog>

            </div>

            <div className=' w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-12'>
             

                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Top Up Balance'} amount={wallet?.userwallets.creditwallet.amount || 0} subtitle={'Use to purchase chrono package'} text={''} loading={false} editable={true} type={'creditwallet'}/>
                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Total Withdrawables'} amount={(wallet?.userwallets.commissionwallet.amount || 0) + (wallet?.userwallets.minecoinwallet.amount || 0)} subtitle={'The sum of commission wallet & hash bot wallet'} text={''} loading={false} editable={false} type={'creditwallet'}/>
                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Hash Bot Wallet'} amount={wallet?.userwallets.minecoinwallet.amount || 0} subtitle={'Total income from hash bot'} text={''} loading={false} editable={false} type={'minecoinwallet'}/>
                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Referral Total Earnings'} amount={stats?.referral || 0} subtitle={'Total accumulated commission from direct refferal'} text={''} loading={false} editable={false} type={'directwallet'}/>
                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Unilevel Total Earnings'} amount={stats?.unilevel || 0} subtitle={'Total accumulated commission from lvl 2 to lvl 13'} text={''} loading={false} editable={false} type={'unilevelwallet'}/>
                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Commission Wallet'} amount={(wallet?.userwallets.directwallet.amount || 0) + (wallet?.userwallets.unilevelwallet.amount || 0)} subtitle={'Withdrawable value from direct referral & unilevel'} text={''} loading={false} editable={false} type={'commissionwallet'}/>
               

            </div>

            {/* <div className=' flex flex-wrap items-center justify-center gap-6 mt-12'>
                <Card icon={<Wallet size={30}/>} iconbg={'bg-amber-500'} title={'Credits'} amount={`${wallet?.userwallets.creditwallet.amount.toLocaleString()}`} subtitle={'Total credits'} text={''} loading={false}/>
                <Card icon={<Wallet size={30}/>} iconbg={'bg-amber-500'} title={'Total commission'} amount={`${wallet?.userwallets.commissionwallet.amount.toLocaleString()}`} subtitle={'Total commissions'} text={''} loading={false}/>
                <Card icon={<Wallet size={30}/>} iconbg={'bg-amber-500'} title={'Total hashbot earnings'} amount={`${wallet?.userwallets.minecoinwallet.amount.toLocaleString()}`} subtitle={'Total earings from hashbot'} text={''} loading={false}/>

            </div> */}
        <Tabs defaultValue="tab5" className="w-full mt-12  ">
            <TabsList className=' w-full pl-16 md:pl-0 md:w-fit bg-zinc-800 flex md:text-sm text-[5rem] overflow-x-auto'>
                {/* <TabsTrigger value="tab1">Cashin History</TabsTrigger>
                <TabsTrigger value="tab2">Cashout History</TabsTrigger>
                <TabsTrigger value="tab3">Unilevel</TabsTrigger>
                <TabsTrigger value="tab4">Chrono Package Inventory</TabsTrigger> */}
                <TabsTrigger value="tab5">Invites</TabsTrigger>
                <TabsTrigger value="tab6">Inventory</TabsTrigger>
                <TabsTrigger value="tab7">Wallet History</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1"><Cashin/></TabsContent>
            <TabsContent value="tab2"><Cashout/></TabsContent>
            <TabsContent value="tab3"><Unilevel/></TabsContent>
            <TabsContent value="tab4"><Inventory/></TabsContent>
            <TabsContent value="tab5"><Unilevel/></TabsContent>
            <TabsContent value="tab6"><Inventory/></TabsContent>
            <TabsContent value="tab7"><WalletHistory/></TabsContent>
            </Tabs>


        </div>

    </div>
  )
}
