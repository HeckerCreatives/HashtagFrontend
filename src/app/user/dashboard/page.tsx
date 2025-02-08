"use client"

import Breadcrumbdb from "@/components/common/Breadcrumb"
import UserLayout from "@/components/layout/Userlayout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Cards from "./Cards"
import DashboardTable from "./Table"



export default function page() {

  return (

    <UserLayout>
        <div className=" bg-zinc-950 w-full h-full flex flex-col items-center p-8">

            <Cards/>
            <DashboardTable/>
        </div>
      
    </UserLayout>
  )
}
