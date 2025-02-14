import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import Hashbot from "@/components/sections/Hashbot";
import Hero from "@/components/sections/Hero";
import Navigation from "@/components/sections/Navigation";
import Socials from "@/components/sections/Socials";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" h-full w-full flex flex-col justify-center items-center overflow-x-hidden ">

      <div className=" w-full h-auto flex flex-col items-center justify-center relative">
         <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute z-0 top-0 left-0 w-full h-full object-cover"
          >
            <source src="/assets/Home BGLoop.mp4" type="video/mp4" />
          </video>

          <div className=" w-full h-full absolute bg-zinc-950/80 z-10">

          </div>
          <div className=" relative z-20 w-full h-[80px] flex items-center justify-center border-b-2 border-yellow-500 bg-zinc-950/90 py-2">
            <Navigation/>

          </div>

        <div className=" relative max-w-[1440px] w-full h-full px-4 flex flex-col gap-8">
          
          <Hero/>

        </div>
      </div>
      
      

      <div className=" relative w-full h-auto flex items-center justify-center"
       style={{backgroundImage:"url(/assets/techno.jpg)", backgroundSize:'cover', backgroundPosition:'center'}}
      >
        
        <div className=" w-full h-full bg-zinc-950/50 absolute">

        </div>
      </div>
      <div className=" max-w-[1440px] w-full h-full px-4 flex flex-col gap-8 mb-8">
        <Hashbot/>
        <FAQ/>
      </div>

      <Socials/>
      <Footer/>


    </main>
  );
}
