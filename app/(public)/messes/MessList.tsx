import React from 'react'
import MessCard from '@/components/cards/messCard';
import { Mess } from '@/types/types';

const MessList = ({ messes }: { messes: Mess[] }) => {
    console.log("Hii this is -- --", messes)
    return (
        <div className='grid flex-1 self-start grid-cols-1 px-4 sm:grid-cols-2 justify-start items-start md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4  w-full'>
            {messes.map((data: Mess) => (
                <MessCard key={data._id} mess={data} />
            ))}
        </div>
    )
}

export default MessList