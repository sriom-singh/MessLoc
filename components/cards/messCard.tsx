import { Star } from 'lucide-react';
import Image from 'next/image'
import React from 'react'
import {Mess}from "@/types/types"


type MessCardProps = {
  mess: Mess;
};


const MessCard = ({mess}:MessCardProps) => {

  return (
    <div  className='min-w-sm max-w-sm border rounded-2xl overflow-hidden max-h-96'>
        <div className='relative flex-1 max-h-2/3 overflow-hidden'>
            <div className='w-min p-1 absolute top-1 right-1 text-xs bg-white text-black flex gap-1 items-center rounded-full'>
              <Star size={12}/>
              <span>{mess.rating}</span>  
              <span className='text-[10px]'>&#40;{mess.totalRatings}&#41;</span> 
            </div>
            <Image width={220} height={150} className=' w-full object-cover object-center' src={mess.imageUrl} alt={mess.name} />
        </div>
        <div className='py-2 px-2'>
    {mess.name}
    <div className='text-stone-300 flex flex-col gap-1 my-2'>

    <p className='text-xs'>{mess.address}</p>
    <p  className='text-xs'>{mess.foodType}</p>
    <p  className='text-xs'>Starting from <span className='font-semibold leading-1 text-white text-sm'>₹{mess.pricePerMonth}</span></p>
    </div>
        </div>
    </div>
  )
}

export default MessCard