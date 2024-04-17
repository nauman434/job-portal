import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface CardProps {
    date: string;
    title: string;
    description: string;
    imageUrl: string;
}

const BlogCard: React.FC<CardProps> = ({ date, title, description, imageUrl }) => {
    return (
        <div>
            <Link href={'/'} className='flex flex-col gap-4 '>
                <div className='relative w-full h-[250px] hover:shadow-lg transition ease-in duration-75'>
                    <Image src={imageUrl}  alt='image' fill className='object-cover rounded-lg'/>
                </div>
                <div className='flex flex-col gap-2 p-3 '>
                    <p className='text-grey text-sm'>{date}</p>
                    <div>
                        <h4 className="font-bold text-xl">{title}</h4>
                        <p className='text-sm text-grey'>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
        // <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
        //     <img className="w-full" src={imageUrl} alt={title} />
        //     <div className="px-6 py-4">
        //         <div className="font-bold text-xl mb-2">{title}</div>
        //         <p className="text-gray-700 text-base">
        //             {description}
        //         </p>
        //     </div>
        //     <div className="px-6 pt-4 pb-2">
        //         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{date}</span>
        //     </div>
        // </div>
    )
}

export default BlogCard