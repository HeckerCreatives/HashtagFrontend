"use client"
import UserLayout from "@/components/layout/Userlayout"
import Faq from "./Faq"





export default function page() {

  return (

    <UserLayout>
        <div className=" bg-slate-900 w-full h-full flex flex-col items-center p-8">
            <Faq/>
        </div>
      
    </UserLayout>
  )
}
