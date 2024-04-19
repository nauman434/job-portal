import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const plan = [
    {
        text: 'Live in 24h',
    },
    {
        text: 'Promoted for 30 days',
    },
    {
        text: 'Pinned to top of search and relevant pages',
    },
    {
        text: 'Inclusion in Weekly Jobs Newsletter',
    }
]

const page = () => {
    return (
        <section className='py-[100px]'>
            <Container className='mt-[100px] flex flex-col gap-[50px] items-center'>
                <div className='flex flex-col items-center gap-4'>
                    <h1 className='sm:text-[36px] text-[24px] font-bold text-center'>Feature your job for 30 days for free</h1>
                </div>

                <div className='flex flex-col items-center bg-white border rounded-xl sm:w-[400px] w-full gap-[20px]'>
                    <div className='h-[5px] rounded-b-lg w-[200px] bg-black' />
                    <div className='flex w-full gap-[20px] flex-col items-center p-[20px]'>
                        <p className='font-bold text-sm'>Recommended</p>
                        <div>
                            <h2 className='text-center text-xl mb-2'>Basic</h2>
                            <p className='text-center text-grey text-sm'>For 1 Job</p>
                        </div>
                        <div>
                            <h2 className='font-bold text-[48px]'>Free </h2>
                        </div>
                        <Separator />
                        <div className='flex flex-col gap-4 mb-10'>
                            {plan.map((item, index) => (
                                <div key={index} className='flex items-center gap-3'>
                                    <Check className='w-4 h-4' />
                                    <p className='text-darkGrey'>{item.text}</p>
                                </div>
                            ))}
                        </div>
                        <Button className='w-full h-[60px]'>
                            <Link href="mailto:info@minersjobs.co" >
                                Send us Email
                            </Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default page