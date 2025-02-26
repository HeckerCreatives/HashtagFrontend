'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Facebook, Instagram, Pen, Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import AddSocials from '@/components/forms/AddSocial'
import EditSocials from '@/components/forms/EditSocials'
import DeleteSocials from '@/components/forms/DeleteSocials'
import { Input } from '@/components/ui/input'
import { FaTelegram, FaX, FaXTwitter } from 'react-icons/fa6'



interface List {
  _id: string,
  link: string,
  title: string,
}

export default function Socialmedias() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [list, setList] = useState<List[]>([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (id: string, value: string) => {
    setList((prevLinks) =>
      prevLinks.map((item) =>
        item._id === id ? { ...item, link: value } : item
      )
    );
  };

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/sociallinks/getsociallinks`,{
        withCredentials:true
        })

        setLoading(false)
        setList(response.data.data)
        
      } catch (error) {
        setLoading(false)
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
            
            }    
          } 
      }
    }
    getData()
},[ ])

const edit = async (id:string , title: string, link:string) => {
  setLoading(true);
  if(link.includes('https://')){
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/sociallinks/editsociallink`, {
          id: id,
          title: title,
          link: link
      }, {
          withCredentials: true,
          headers: {
              'Content-Type': 'Application/json'
          }
      });

      const response = await toast.promise(request, {
          loading: `Updating social media...`,
          success: `Updated successfully. `,
          error: `Error while updating social media.`,
      });
      if (response.data.message === 'success') {
          setLoading(false);
          window.location.reload()

      }
  } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`);
              router.push('/');
          }

          if (axiosError.response && axiosError.response.status === 400) {
              toast.error(`${axiosError.response.data.data}`);
          }

          if (axiosError.response && axiosError.response.status === 402) {
              toast.error(`${axiosError.response.data.data}`);
          }

          if (axiosError.response && axiosError.response.status === 403) {
              toast.error(`${axiosError.response.data.data}`);
          }

          if (axiosError.response && axiosError.response.status === 404) {
              toast.error(`${axiosError.response.data.data}`);
          }
      }
  }
  } else {
    toast.error(`Link should start with 'https://'`)
  }
 
};

const icons = (name: string) => {
  if(name === 'facebook'){
    return  <Facebook size={20} />
  } else if(name === 'telegram'){
    return  <FaTelegram size={20} />
  }else if(name === 'instagram'){
    return  <Instagram size={20} />
  } else {
    return   <FaXTwitter size={18} />
  }
}




  return (
    <div className=' flex flex-col  w-full max-w-[400px] h-fit p-6 bg-zinc-900 rounded-md'>
        <p className=' font-semibold'>Social Media</p>

        <div className=' w-full flex flex-col gap-2 mt-4'>
          {list.map((item, index) => (
            <div key={index} className=' flex items-center gap-2'>
              <div className=' bg-yellow-500 p-2 rounded-md'>
              {icons(item.title)}
              </div>
              <Input
                placeholder='Link'
                className='text-sm'
                value={item.link}
                onChange={(e) => handleInputChange(item._id, e.target.value)}
                />
              <button onClick={() => edit(item._id, item.title, item.link)} className=' bg-yellow-600 px-4 py-2 text-xs rounded-md'>Save</button>

          </div>
          ))}
          

        </div>

        {/* <div className=' flex items-center mt-2'>
          <AddSocials id={''} username={''}/>

        </div>

        <Table>
          {list.length === 0 && (
          <TableCaption>No data.</TableCaption>
          )}
        <TableHeader>
            <TableRow>
            <TableHead className="">Link</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Action</TableHead>
            
            </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow key={index}>
            <TableCell className="">{item.link.slice(0,25)}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell className=' flex gap-2'>
              <EditSocials id={item._id} title={item.title} link={item.link}/>
              <DeleteSocials title={item.title} link={item.link} id={item._id}/>

            </TableCell>
            
            </TableRow>
          ))}
            
        </TableBody>
        </Table> */}


    </div>
  )
}
