import Image from 'next/image'
import React from 'react'
import {Quote} from 'lucide-react'
type Props = {
    image?: string;
    author: string;
    designation: string;
    testimonial: string;
}

const TestimonialCard = (props:Props) => {
    const { image, author, designation, testimonial } = props;
    return (
        <div className="flex gap-2 w-full p-4 border  md:max-w-3xl rounded-xl">
            {image ? <Image alt={author} width={40} height={40} src={image} />:<span className="size-10 text-center rounded-full px-3 flex items-center justify-center border border-stone-300">{author[0]+author[1].toUpperCase()}</span>}
            <div>
                <h3 className='font-medium text-base'>{author}</h3>
                <p className="text-sm text-gray-500">
                    {designation || ""}</p>
                <p className='text-base italic font-light mt-2'>{testimonial}</p>
            </div>
            <Quote size={36} className="-rotate-180 text-stone-300" />
        </div>
    )
}

export default TestimonialCard