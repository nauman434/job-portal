import { Job } from '@/interfaces/Job'
import React from 'react'
import Container from './container';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Separator } from './ui/separator';

type JobDetailProps = {
    job: Job | { error: string };
};



const Details: React.FC<JobDetailProps> = ({ job }) => {

    if ('error' in job) {
        return <div>Error: {job.error}</div>;
      }


    return (
        <section className='py-[100px]'>
            <Container>
                <div className='pt-[50px]'>
                    {job ? (
                        <div className='sm:p-[35px] p-[15px] flex flex-col gap-[30px] w-full bg-white border rounded-3xl'>
                            <div className='grid md:grid-cols-12 grid-cols-1 gap-4'>
                                <div className='md:col-span-10 col-span-1'>
                                    <h1 className='sm:text-3xl text-2xl font-bold mb-3'>{job.Role}</h1>
                                    <p className='sm:text-lg text-[16px] text-gray-400 font-bold'>{job.Company}</p>
                                </div>
                                <Button className='md:col-span-2 col-span-1 h-[60px]'>
                                    <Link className='flex items-center gap-3' href={job.jobLink ? new URL(job.jobLink).toString() : ''} target='_blank'>
                                        Apply Now
                                        <ArrowUpRight className='w-[18px] h-[18px]' />
                                    </Link>
                                </Button>
                            </div>
                            <div >
                                <Button className='text-black font-bold rounded-[0px] bg-transparent hover:bg-transparent border-b-black border-b-[2px]'>
                                    Job Details
                                </Button>
                                <Separator className='h-[2px]' />
                            </div>
                            <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-[20px]'>
                                <div>
                                    <h4 className='text-lg font-bold mb-2'>Job Type</h4>
                                    <p className='text-lg text-darkGrey'>{job.Type || "Not Disclosed"}</p>
                                </div>
                                <div>
                                    <h4 className='text-lg font-bold mb-2'>Salary</h4>
                                    <p className='text-lg text-darkGrey'>{job.Salary ? `${job.Salary.toLocaleString()}` : 'Not Disclosed'}</p>
                                </div>
                                <div>
                                    <h4 className='text-lg font-bold mb-2'>Posted On</h4>
                                    <p className='text-lg text-darkGrey'>{job.postingDate ? `${job.postingDate.slice(0, 10)}` : 'N/A'}</p>
                                </div>
                                <div>
                                    <h4 className='text-lg font-bold mb-2'>Location</h4>
                                    <p className=''><span className='p-1 bg-gray-100 border-gray-200 text-gray-700 mr-2 rounded-sm'>{job.City}</span> <span className='p-1 bg-gray-100 border-gray-200 text-gray-700 mr-2 rounded-sm'>{job.State}</span>  <span className='font-bold'>{job.Country}</span></p>
                                </div>
                            </div>

                            <div className='mt-6'>
                                <h2 className='font-bold text-2xl mb-3'>Job Description</h2>
                                <p className='text-darkGrey text-lg mb-4' style={{ whiteSpace: 'pre-wrap' }}>
                                    {job.HowToApply}
                                </p>
                            </div>
                        </div>
                    ) : ''}
                </div>
            </Container>
        </section>
    );
};

export default Details