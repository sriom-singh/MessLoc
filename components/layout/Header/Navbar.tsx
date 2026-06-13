import React from 'react'
import Image from "next/image"
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import { ModeToggle } from '@/components/ui/darkMode';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
const geistSans = Playfair_Display({
    weight: "600",
    subsets: ["latin"],
});

const Navbar = () => {
    return (
        <nav>
            <div className="flex flex-row items-center justify-between  min-h-full mx-24 py-6 shadow-md shadow-zinc-400/10 ">
                <div className="flex  items-center">
                    <Image src="/logosmall.svg" alt="Logo" width={40} height={40} className="mr-2" />
                    <h1 className={" text-2xl leading-5.5 flex flex-col gap-0"}>MessLoc</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative w-96">
                        <Input
                            type="search"
                            placeholder="Search for messes..."
                            className="pr-10 py-5"
                        />

                        <Search
                            size={16}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                        />
                    </div>
                    <Button size={'lg'} className={"text-primary/80 hover:bg-transparent hover:cursor-pointer bg-transparent gap-0 flex-col"} variant={"secondary"} >
                        <p className='  flex items-center gap-1 text-sm font-medium'>

                            <MapPin />
                            <span>Add Your Location</span>
                        </p>
                        <p className=' text-xs text-stone-600 dark:text-stone-400 font-light'>To see mess in your area</p>
                    </Button>
                    <ModeToggle />
                    <Button variant={'secondary'}> Login</Button>
                    <Button>Signup</Button>

                </div>
            </div>
        </nav>
    )
}

export default Navbar