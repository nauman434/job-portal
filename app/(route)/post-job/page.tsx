import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const plan = [
    {
        text: '5 Job Postings',
    },
    {
        text: '90 Days Duration Each',
    },
    {
        text: 'Job Alert Emails',
    },
    {
        text: 'Candidates Database',
    }
]

const page = () => {
    return (
        <section className='py-[100px]'>
            <Container className='mt-[100px] flex flex-col gap-[50px] items-center'>
                <div className='flex flex-col items-center gap-4'>
                    <h1 className='sm:text-[36px] text-[24px] font-bold text-center'>Check our amazing plans, choose the best one for you</h1>
                    <p className='sm:text-lg text-sm text-center text-grey'>Post or Featured you job for 30 days for free</p>
                </div>

                <div className='flex flex-col items-center bg-white border rounded-xl sm:w-[400px] w-full gap-[20px]'>
                    <div className='h-[5px] rounded-b-lg w-[200px] bg-black' />
                    <div className='flex w-full gap-[20px] flex-col items-center p-[20px]'>
                        <p className='font-bold text-sm'>Recommended</p>
                        <div>
                            <h2 className='text-center text-xl mb-2'>Basic Boosted</h2>
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