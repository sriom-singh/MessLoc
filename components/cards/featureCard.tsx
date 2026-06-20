import React from 'react'

type Props = {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard = (props: Props) => {
    const { icon, title, description } = props;
    return (
        <div className="flex items-center w-full  md:max-w-3xl gap-4 p-4  border rounded-lg">
            <span>
                {icon}
            </span>
            <div>

                <h3 className="text-md font-semibold">{title}</h3>
                <p className="text-sm text-gray-500">
                    {description}
                </p>
            </div>

        </div>
    )
}

export default FeatureCard