import Footer from "@/components/layout/Footer/Footer";
import Hero from "@/components/layout/Header/Hero";
import Navbar from "@/components/layout/Header/Navbar";
import FeatureCard from "@/components/cards/featureCard";
import SectionHeader from "@/components/ui/sectionHeader";
import Image from "next/image";
import { ShieldCheck,Clock4, HandCoins, WalletCards } from "lucide-react";
import TestimonialCard from "@/components/cards/testimonialCard";

export default function Home() {
  return (
    <div className="flex  flex-col flex-1 justify-between pb-12  w-full h-full bg-zinc-50 font-sans dark:bg-black">
      {/* Hero Section */}
      <Hero />

      {/* Feature Section */}
      <section>
      <SectionHeader label="Why MessLoc" title="Why students & professionals choose Us" description="We built MessLoc to solve the real problems of finding food in an unfamiliar city. Here's what makes us different." />
      <div className="flex flex-col gap-4 justify-center items-center w-full px-4 pb-10 sm:px-6 lg:px-4 py-2">
      <FeatureCard icon={<ShieldCheck />} title="Verified listings only" description="Every mess on MessLoc is manually verified. Real menus, real prices, real contact details — no fake listings." />
      <FeatureCard icon={<Clock4 />} title="Real-time availability" description="See live open/closed status, current menu, and instant availability of meal slots before you subscribe." />
      <FeatureCard icon={<HandCoins />} title="Budget-first search" description="Set your daily budget and instantly see all messes that fit — no surprises, no hidden fees, no upselling." />
      <FeatureCard icon={<WalletCards />} title="Digital subscriptions" description="Subscribe online, pay digitally, get a QR-based mess card. No cash negotiations, no verbal commitments." />
      </div>
      </section>

      {/* Testimonial */}
      <section>
        <SectionHeader label="Real Stories" title="What our users say" description="From first-year students to working professionals and mess owners — real experiences, real results." />
        <div className="flex flex-col gap-4 justify-center items-center w-full px-4 pb-10 sm:px-6 lg:px-4 py-2">
            <TestimonialCard  author="John Doe" designation="Student" testimonial="MessLoc made it so easy for me to find a mess that fit my budget and dietary preferences. I highly recommend it!" />
            <TestimonialCard  author="Jane Smith" designation="Professional" testimonial="I was new to the city and didn't know where to eat. MessLoc helped me find a great mess with delicious food and a friendly atmosphere." />
            <TestimonialCard  author="Mike Johnson" designation="Mess Owner" testimonial="Since listing my mess on MessLoc, I've seen a significant increase in customers. It's a great platform for mess owners to reach more people." />
        </div>
      </section>
    </div>
  );
}
