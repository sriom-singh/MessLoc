import Footer from "@/components/layout/Footer/Footer";
import Hero from "@/components/layout/Header/Hero";
import Navbar from "@/components/layout/Header/Navbar";
import FeatureCard from "@/components/ui/featureCard";
import SectionHeader from "@/components/ui/sectionHeader";
import Image from "next/image";
import { ShieldCheck,Clock4, HandCoins, WalletCards } from "lucide-react";

export default function Home() {
  return (
    <div className="flex  flex-col flex-1 justify-between  w-full h-full bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <SectionHeader label="Why MessLoc" title="Why students & professionals choose Us" description="We built MessLoc to solve the real problems of finding food in an unfamiliar city. Here's what makes us different." />
      <div className="flex flex-col gap-4 justify-center items-center w-full px-4 sm:px-6 lg:px-4 py-2">
      <FeatureCard icon={<ShieldCheck />} title="Verified listings only" description="Every mess on MessLoc is manually verified. Real menus, real prices, real contact details — no fake listings." />
      <FeatureCard icon={<Clock4 />} title="Real-time availability" description="See live open/closed status, current menu, and instant availability of meal slots before you subscribe." />
      <FeatureCard icon={<HandCoins />} title="Budget-first search" description="Set your daily budget and instantly see all messes that fit — no surprises, no hidden fees, no upselling." />
      <FeatureCard icon={<WalletCards />} title="Digital subscriptions" description="Subscribe online, pay digitally, get a QR-based mess card. No cash negotiations, no verbal commitments." />

      </div>
    </div>
  );
}
