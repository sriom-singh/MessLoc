import React from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { MoveRight } from 'lucide-react';

const Hero = () => {
  return (
    <header className="flex flex-col md:flex-row  items-center justify-between px-24 gap-16 my-16">
        <div className="flex-1">
            <h1 className="text-4xl md:text-6xl leading-16 font-bold">
                Discover Affordable Nearby Mess Services with <span className="text-primary">MessLoc</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6">
                Your go-to platform for finding, comparing, and subscribing to local mess services tailored for students and professionals.
            </p>
            <div className="mt-8 flex gap-4">

            <Button>Explore Messes <MoveRight /> </Button>
            <Button variant={"outline"}>List your Mess <MoveRight /> </Button>
            </div>
        </div>
            <Image src="/hero.png" alt="Hero Image" width={500} height={500} className="mx-auto" />

    </header>
  )
}

export default Hero