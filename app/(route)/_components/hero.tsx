import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const categories = [
    {
        name: 'Mining',
        number: 300,
    },
    {
        name: 'Gold',
        number: 123,
    },
    {
        name: 'Silver',
        number: 425,
    },
    {
        name: 'Copper',
        number: 90,
    },
    {
        name: 'Uranium',
        number: 700,
    },
    {
        name: 'Silver',
        number: 425,
    },
    {
        name: 'Copper',
        number: 90,
    },
    {
        name: 'Uranium',
        number: 700,
    },
]

const Hero = () => {
    return (


        <section style={{
            backgroundImage: `url('/lines.svg'), linear-gradient(#F8F9FD, #F8F9FD)`,
            backgroundBlendMode: 'over',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover'
        }}>
            <Container>
                <div className='flex flex-col justify-center items-center h-[100vh] gap-[50px] '>
                    <div className='w-[540px] flex flex-col gap-[20px]'>
                        <h1 className='text-[64px] font-semibold text-center leading-[100%]'>We know the way to Success</h1>
                        <p className='text-[18px] text-grey'>Growing a business means having the right people in your team</p>
                    </div>
                    <div className='flex flex-col gap-[24px]'>
                        <div className='flex w-full justify-between border-grey shadow-md border-[1px] px-[12px] py-[12px] rounded-[12px] bg-white'>
                            <div className='flex items-center'>
                                <Search className='w-4 h-4' />
                                <Input type='text' placeholder='Job title, keyword' className='border-none focus-visible:ring-0 focus-visible:ring-offset-0' />
                            </div>
                            <Button>Search</Button>
                        </div>
                        <p className='text-sm text-darkGrey'>
                            <span className='text-grey pr-2'>Suggestion:</span>
                            Designer,
                            Programing,{' '}
                            <span className='font-semibold'>Digital Marketing</span>,
                            Video,
                            Animation.</p>
                    </div>
                    <div className='flex gap-3 flex-wrap items-center justify-center'>
                        {categories.map((cat) => (
                            <Button variant={"outline"} className='bg-transparent h-[28px] rounded-full'>
                                <Link href={'/'}>
                                    {cat.name}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Hero