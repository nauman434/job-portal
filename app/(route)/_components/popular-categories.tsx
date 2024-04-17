import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, BadgeCent } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PopularCategories = () => {
    const categories = [
        {
            icon: BadgeCent,
            name: 'Mining',
            number: 300,
        },
        {
            icon: BadgeCent,
            name: 'Gold',
            number: 123,
        },
        {
            icon: BadgeCent,
            name: 'Silver',
            number: 425,
        },
        {
            icon: BadgeCent,
            name: 'Copper',
            number: 90,
        },
        {
            icon: BadgeCent,
            name: 'Uranium',
            number: 700,
        },
        {
            icon: BadgeCent,
            name: 'Silver',
            number: 425,
        },
        {
            icon: BadgeCent,
            name: 'Copper',
            number: 90,
        },
        {
            icon: BadgeCent,
            name: 'Uranium',
            number: 700,
        },
    ]


    return (
        <section className='py-[100px]'>
            <Container>
                <Separator />
                <div className='flex flex-col gap-[50px] py-[50px]'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-3xl font-semibold'>Popular Categories</h1>
                        <Button variant={'link'} className='flex gap-2'>
                            View All
                            <ArrowRight className='w-4 h-4' />
                        </Button>
                    </div>
                    <div className='grid md:grid-cols-4 grid-cols-2 gap-8'>
                        {categories.map((category, index) => (
                            <Link href={'/'}>
                                <div key={index} className='flex gap-4 items-center p-[24px] group hover:bg-none cursor-pointer  transition-colors duration-200 hover:shadow-lg rounded-[12px]'>
                                    <div className='w-[68px] h-[68px] rounded-[8px] bg-grey flex items-center justify-center group-hover:bg-primary transition-colors duration-200'>
                                        {React.createElement(category.icon, { className: 'w-8 h-8 text-white group-hover:text-[#E7F0FA]' })}
                                    </div>
                                    <div>
                                        <h6 className='text-lg font-medium text-primary '>{category.name}</h6>
                                        <p className='text-sm text-grey '>{category.number} Jobs available</p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>

            </Container>
        </section>
    )
}

export default PopularCategories