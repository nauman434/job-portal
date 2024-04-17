'use client'

import Container from '@/components/container'
import JobCard from '@/components/job-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Job } from '@/interfaces/Job'
import { Facebook, Search } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Loading from '../loading'

function truncateText(text: any, limit: number): string {
    // Ensure text is a string or use an empty string if not
    if (typeof text !== 'string') {
        text = text ? String(text) : '';
    }

    const words = text.split(/\s+/);
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    }
    return text;
}


const AllJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/jobs');
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs: ' + response.statusText);
                }
                const data = await response.json();
                setJobs(data);
            } catch (error: any) {
                console.error('Failed to fetch jobs:', error);
                setError('Failed to load jobs. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (isLoading) return <Loading/>;
    if (error) return <p>{error}</p>;


    return (
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
            </div>

            <div className='flex flex-col items-center'>
                
                <div className="grid md:grid-cols-3 grid-cols-2 gap-4"> {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        jobId={job.id}
                        jobType={job.Role || 'N/A'}
                        title={job.Job || 'No Job Title'}
                        description={truncateText(job.jobDescription || 'No Description Available', 35)}
                        postedTime={job.postingDate ? `${job.postingDate.toLocaleString()}` : 'N/A'}
                        salaryRange={job.Salary ? `${job.Salary.toLocaleString()}` : 'Salary Not Disclosed'}
                        companyName={job.Company || 'Company Not Listed'}
                        icon={Facebook}
                        location={`${job.City || 'Unknown City'}, ${job.State || 'Unknown State'}, ${job.Country || 'Unknown Country'}`}
                    />
                ))}
                </div>
            </div>
        </Container>
    )
}

export default AllJobs