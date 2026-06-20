import React from 'react'
import { SectionLabel } from './sectionLabel'

type Props = {
    label?: string;
    title?: string;
    description?: string;
}

const SectionHeader = (props: Props) => {
    const { label, title, description } = props;
    return (
        <div className="relative flex pt-16 pb-12 flex-col items-center text-center ">
            {label && <SectionLabel>{label}</SectionLabel>}
            {title && <h1 className=" font-bold text-[48px] max-w-xl md:text-[36px] text-center leading-[1.1] tracking-tight ">{title}</h1>}
            {description && <p className="mt-4 text-[14px] max-w-xl text-stone-400 leading-relaxed">
                {description}</p>}
        </div>
    )
}

export default SectionHeader