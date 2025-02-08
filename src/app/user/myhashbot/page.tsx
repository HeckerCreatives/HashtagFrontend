"use client"
import UserLayout from "@/components/layout/Userlayout"
import ClaimHistoryTable from "./Table"
import Rigs from "./Rigs"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


export default function page() {



  return (

    <UserLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-col items-center p-8">
         
          <Rigs/>
          <ClaimHistoryTable/>
        </div>
      
    </UserLayout>
  )
}
