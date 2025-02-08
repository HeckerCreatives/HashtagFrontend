"use client"
import UserLayout from "@/components/layout/Userlayout"
import Payout from "./Payout"
import PayoutTable from "./Table"


export default function page() {

  return (

    <UserLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-col items-center p-4">
            <Payout/>
            <PayoutTable/>
        </div>
      
    </UserLayout>
  )
}
