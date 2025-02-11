'use client'
import React from 'react'
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { motion } from 'motion/react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between child animations
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  

export default function Socials() {
  return (
    <section id='socialmedia' className=' w-full flex flex-col  gap-8 items-center justify-center py-16'>
   
        <div className=' flex flex-col items-center justify-center gap-12'>
            <motion.h1 className=" ~text-xl/3xl font-bold text-center"
             initial={{ opacity: 0, y: 20 }} 
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }} 
             viewport={{ once: false, amount: 0.2 }}
            >
                OUR <span className=' yellow'>SOCIAL MEDIA</span> CHANNEL
            </motion.h1>

            <motion.div className=' w-fit flex flex-wrap items-center justify-center border-collapse'
             variants={containerVariants}
             initial="hidden"
             whileInView="visible" // Triggers animation when in view
             viewport={{ once: false, amount: 0.2 }}
            >

                <motion.a href="" className=' py-6 px-20 text-yellow-400 border border-zinc-700 bg-zinc-900 group'
                variants={itemVariants}
                >
                <FaSquareFacebook size={40}className=' group-hover:scale-125 transition-all duration-200'/>
                </motion.a>
                <motion.a href="" className=' py-6 px-20 text-yellow-400 border border-zinc-700 bg-zinc-900 group'
                variants={itemVariants}
                >
                <FaTelegram size={40}className=' group-hover:scale-125 transition-all duration-200'/>
                </motion.a>
                <motion.a href="" className=' py-6 px-20 text-yellow-400 border border-zinc-700 bg-zinc-900 group'
                variants={itemVariants}
                >
                <AiFillInstagram size={40} className=' group-hover:scale-125 transition-all duration-200'/>
                </motion.a>
                <motion.a href="" className=' py-6 px-20 text-yellow-400 border border-zinc-700 bg-zinc-900 group'
                variants={itemVariants}
                >
                <FaDiscord size={40} className=' group-hover:scale-125 transition-all duration-200'/>
                </motion.a>
                <motion.a href="" className=' py-6 px-20 text-yellow-400 border border-zinc-700 bg-zinc-900 group'
                variants={itemVariants}
                >
                <FaSquareXTwitter size={40} className=' group-hover:scale-125 transition-all duration-200'/>
                </motion.a>


            </motion.div>
        </div>
   </section>
  )
}
