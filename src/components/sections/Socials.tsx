import React from 'react'
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Socials() {
  return (
    <section id='socialmedia' className=' w-full flex flex-col  gap-8 items-center justify-center py-16'>
   
        <div className=' flex flex-col items-center justify-center gap-12'>
            <h1 className=" ~text-xl/3xl font-bold text-center">
                OUR <span className=' yellow'>SOCIAL MEDIA</span> CHANNEL
            </h1>

            <div className=' w-fit flex flex-wrap items-center justify-center border-collapse'>

                <a href="" className=' py-6 px-20 text-yellow-400 border border-zinc-700 bg-zinc-900 group'>
                <FaSquareFacebook size={40}className=' group-hover:scale-125 transition-all duration-200'/>
                </a>
                <a href="" className=' py-6 px-20 text-yellow-400 border border-zinc-700 bg-zinc-900 group'>
                <FaTelegram size={40}className=' group-hover:scale-125 transition-all duration-200'/>
                </a>
                <a href="" className=' py-6 px-20 text-yellow-400 border border-zinc-700 bg-zinc-900 group'>
                <AiFillInstagram size={40} className=' group-hover:scale-125 transition-all duration-200'/>
                </a>
                <a href="" className=' py-6 px-20 text-yellow-400 border border-zinc-700 bg-zinc-900 group'>
                <FaDiscord size={40} className=' group-hover:scale-125 transition-all duration-200'/>
                </a>
                <a href="" className=' py-6 px-20 text-yellow-400 border border-zinc-700 bg-zinc-900 group'>
                <FaSquareXTwitter size={40} className=' group-hover:scale-125 transition-all duration-200'/>
                </a>


            </div>
        </div>
   </section>
  )
}
