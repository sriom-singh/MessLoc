import Footer from "@/components/layout/Footer/Footer";
import Hero from "@/components/layout/Header/Hero";
import Navbar from "@/components/layout/Header/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex  flex-col flex-1 justify-between  w-full h-full bg-zinc-50 font-sans dark:bg-black">
      <Hero/>
    </div>
  );
}
