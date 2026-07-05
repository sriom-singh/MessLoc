import { BadgePercent, MapPin, SquareDot, Star } from 'lucide-react';
import Image from 'next/image'
import React from 'react'
import { Mess } from "@/types/types"
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';


type MessCardProps = {
  mess: Mess;
};

const MessCard = ({ mess }: MessCardProps) => {

  return (
    <Card className='p-0 w-full gap-1  max-w-md h-min  rounded-lg overflow-hidden'>
      <CardHeader className='relative p-0 max-h-2/3 rounded-t-2xl overflow-hidden'>
        <div className='w-min p-1 border bg-white text-black absolute top-1 right-1 text-xs  flex gap-0.5 items-center rounded-full'>
          <Star fill='orange' className='border-none outline-none stroke-0' size={14} />
          <span>{mess.rating}</span>
          <span className='text-[10px] text-black/60'>&#40;{mess.totalReviews}&#41;</span>
        </div>
        <Image src={mess.images[0]} width={220} height={150} className=' w-full object-cover object-center h-44' alt={mess.name} />
      </CardHeader>
      <CardContent className='py-2 px-2 gap-3 flex flex-col'>
        <CardTitle className='leading-4.5'>{mess.name}</CardTitle>
        <div className='dark:text-stone-300 flex flex-col gap-1 '>

          <div className='flex gap-1 items-center'>
            <MapPin className='stroke-yellow-200' size={14} />
            <p className='text-xs'>{mess.address}</p>
          </div>
          <div className='flex gap-1 items-center'>
            <SquareDot className={mess.foodType=="Non-Veg"?"stroke-red-500":"stroke-green-400"} size={14} />
            <p className='text-xs'>{mess.foodType}</p>
          </div>
          <div className='flex gap-1 items-center'>
            <BadgePercent size={14} />
            <p className='text-xs'>Starting from <span className='font-semibold leading-1 text-white text-sm'>₹{mess.monthlyPrice}</span>/month</p>
          </div>

        </div>
        <CardFooter className='flex w-full p-0 gap-2 mb-1'>
          <Button size={'sm'} className={"flex-1"} variant={'outline'}>View Details</Button>
          <Button size={'sm'} className={"flex-1"} variant={'default'}>Book Now</Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}

export default MessCard