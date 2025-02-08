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
      
      <div className=" max-w-[1440px] w-full h-full px-4 flex flex-col gap-8">
        <Navigation/>
      </div>

      <div className=" relative w-full h-auto flex items-center justify-center"
       style={{backgroundImage:"url(/assets/techno.jpg)", backgroundSize:'cover', backgroundPosition:'center'}}
      >
        <div className=" w-full h-full bg-zinc-950/50 absolute">

        </div>
        <Hero/>
      </div>
      <div className=" max-w-[1440px] w-full h-full px-4 flex flex-col gap-8 mb-8">
        <Hashbot/>
        <FAQ/>
        <Socials/>
      </div>

      <Footer/>


    </main>
  );
}
