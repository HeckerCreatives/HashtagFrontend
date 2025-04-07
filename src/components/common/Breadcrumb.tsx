"use client"
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  page: any
  dashboard: string
}

export default function Breadcrumbdb(prop: Props) {
    const path = usePathname()

  return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className=' hover:text-yellow-500'>
                <a href={prop.dashboard} className=' text-zinc-100 md:text-xs text-[.6rem]'>Dashboard</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={path} className=' text-[.6rem] md:text-xs text-zinc-100 hover:text-green-500'>{prop.page}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
  )
}
