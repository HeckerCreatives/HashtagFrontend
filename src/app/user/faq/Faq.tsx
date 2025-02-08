import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function Faq() {
  return (
    <div className=' w-full max-w-[1440px] bg-slate-800 h-full flex flex-col items-center'>

        <div className=' w-full max-w-[1040px] flex flex-col gap-2 items-center justify-center p-6'>

            <img src="/full.png" alt="" className=' w-[250px] md:w-[350px]' />
            <p className=' text-lg text-slate-300 text-center mb-10'>Speedmine is a trading system that allows players to purchase a rig miner, which helps them trade assets quickly. It uses smart algorithms to maximize profits in a competitive market.</p>
            <Accordion type="single" collapsible className=' w-full'>
            <AccordionItem value="item-1">
                <AccordionTrigger className=' w-full'>What is Speedmine?</AccordionTrigger>
                <AccordionContent>
                    Speedmine is a trading system where players buy a rig miner, enabling them to trade assets quickly and efficiently by using advanced algorithms to optimize profits in a competitive market
                </AccordionContent>
            </AccordionItem>
            </Accordion>



            <Accordion type="single" collapsible className=' w-full'>
            <AccordionItem value="item-1">
                <AccordionTrigger className=' w-full'>How can i earn money in Speedmine?</AccordionTrigger>
                <AccordionContent>
                    You can earn by purchasing one of the available offers. After the package duration ends, you can claim the corresponding profits based on the investment period and the profit percentage offered by each package. 
                </AccordionContent>
            </AccordionItem>
            </Accordion>



            <Accordion type="single" collapsible className=' w-full'>
            <AccordionItem value="item-1">
                <AccordionTrigger className=' w-full'>How do i withdraw my earnings? </AccordionTrigger>
                <AccordionContent>
                    You can withdraw your earnings using Gcash and GoTyme. To do this, go to the withdrawal section and enter the required details. You need to have at least P500 in your Commission or Rig miner to withdraw. Make sure your balance meets this minimum before you try to withdraw. Double-check all the information you provide to avoid any delays. Once everything is set up correctly, you can easily request a withdrawal through these payment methods. Keep your details accurate to ensure smooth withdrawals.
                </AccordionContent>
            </AccordionItem>
            </Accordion>



            <Accordion type="single" collapsible className=' w-full'>
            <AccordionItem value="item-1">
                <AccordionTrigger className=' w-full'>How do i create an account?</AccordionTrigger>
                <AccordionContent>
                   To create an account on Speedmine, you must first join our official communities on platforms like Discord, Facebook Groups, or other social media channels indicated in the website. Once you are part of the community, reach out to any of the community leaders or admins. These individuals are designated to assist new players in getting started, and you can ask them for a referral link. After receiving the referral link, click on it to be redirected to the Speedmine registration page. There, you will need to fill out the necessary information, including your name, email address, and other required details. Once you have completed the form, submit it to create your account and start your journey in Speedmine.
                </AccordionContent>
            </AccordionItem>
            </Accordion>




            <Accordion type="single" collapsible className=' w-full'>
            <AccordionItem value="item-1">
                <AccordionTrigger className=' w-full'>What types of rig miner can i buy in Speedmine?</AccordionTrigger>
                <AccordionContent>
                    Speedmine offers a wide variety of rig miners, categorized into 3 types Quick lane, Swift Lane and Rapid lane. Each type offers different earnings based on the rig miner you purchase. The Quick Lane provides a 20% profit over a 5 days earning period, with a minimum investment of ₱500 and a maximum of ₱2,000. The Swift Lane offers an 60% profit over 10 days, with investment amounts ranging from ₱2,000 to ₱20,000. Lastly, the Rapid Lane delivers a 150% profit over a 20 days period, with a minimum investment of ₱20,000 and a maximum of ₱2,000,000.
                </AccordionContent>
            </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className=' w-full'>
            <AccordionItem value="item-1">
                <AccordionTrigger className=' w-full'>Can i have multiple accounts? </AccordionTrigger>
                <AccordionContent>
                    Players are allowed to have multiple accounts in Speedmine, but each account must be registered with a unique Gmail address. You can sign up and manage multiple accounts, provided that each is linked to a different Gmail address. This allows you to explore different strategies or keep your progress separate. Just make sure to follow the system rules for each account to prevent any issues
                </AccordionContent>
            </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className=' w-full'>
            <AccordionItem value="item-1">
                <AccordionTrigger className=' w-full'>How can I report a bug or technical problem?</AccordionTrigger>
                <AccordionContent>
                   If you encounter a bug or technical issue, please email us at speedmineph@gmail.com. In your message, include a detailed explanation of the problem. Whenever possible, attach screenshots or any relevant information that could help us identify and resolve the issue more effectively. Providing comprehensive details will enable our support team to address your concern faster and with greater accuracy. Your feedback is vital to improving the system and enhancing the experience for all players.
                </AccordionContent>
            </AccordionItem>
            </Accordion>


            <Accordion type="single" collapsible className=' w-full'>
            <AccordionItem value="item-1">
                <AccordionTrigger className=' w-full'>How can I invite friends to play Speedmine?</AccordionTrigger>
                <AccordionContent>
                   You can invite friends to join Speedmine by sharing your unique referral link found in the system's invitation section. To locate your referral link, navigate to your dashboard and click on the referral link next to your username. After you have your link, share it with friends via social media, email, or messaging apps. When your friends use the referral link to sign up and purchase one of the rig miners, you'll earn rewards based on their profit percentage.
                </AccordionContent>
            </AccordionItem>
            </Accordion>

        </div>

    </div>
  )
}
