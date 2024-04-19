'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/container';
import JobCard from '@/components/job-card'; // Note: Check if you need this as it isn't used in the snippet.
import { Button } from '@/components/ui/button';
import { Job } from '@/interfaces/Job'; // Ensure this interface properly defines 'Role' and 'Type'.
import { BriefcaseBusiness, Search, User } from 'lucide-react';
import Link from 'next/link';
import Loading from '../loading'; // Make sure the Loading component is implemented.
import { Input } from '@/components/ui/input';

const Hero = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            const cachedJobs = localStorage.getItem('cachedJobs');
            const cachedTime = localStorage.getItem('cachedTime');

            if (cachedJobs && cachedTime && new Date().getTime() - new Date(parseInt(cachedTime)).getTime() < 3600000) {
                setJobs(JSON.parse(cachedJobs));
                setIsLoading(false);
            } else {
                try {
                    const response = await fetch('/api/jobs');
                    if (!response.ok) {
                        throw new Error('Failed to fetch jobs: ' + response.statusText);
                    }
                    const data = await response.json();
                    setJobs(data);
                    localStorage.setItem('cachedJobs', JSON.stringify(data));
                    localStorage.setItem('cachedTime', new Date().getTime().toString());
                } catch (error) {
                    console.error('Failed to fetch jobs:', error);
                    setError('Failed to load jobs. Please try again later.');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchJobs();
    }, []);

    const uniqueTypes = new Set<string>();
    const uniqueJobs = jobs.slice(0, 490).filter(cat => cat.Type && !uniqueTypes.has(cat.Type) && cat.Type.trim() !== "" && uniqueTypes.add(cat.Type));

    return (
        <section className='pt-[100px]' >
            <Container className=''>
                <div className='flex flex-col justify-center items-center pt-[100px] pb-[30px]  gap-[50px]'>
                    <div className='md:w-[60%] w-full flex flex-col gap-[20px]'>
                        <h1 className='sm:text-[48px] text-xl leading-[150%]  font-bold text-center mb-4'>Welcome to largest Mining jobs site in the world.</h1>
                        <p className='sm:text-lg text-sm text-center text-grey'>Discover top sports betting jobs across sportsbooks, startups, analytics, media, fintech and SaaS companies supporting the sports betting industry.</p>
                    </div>
                    {/* <div className='flex gap-3 flex-wrap items-center justify-center'>
                        {uniqueJobs.slice(0, 10).map((cat, index) => (
                            <Button key={index} size={'sm'} variant="outline" className='bg-transparent text-xs h-[28px]  rounded-full'>
                                <Link href={`/`}>
                                    {cat.Type}
                                </Link>
                            </Button>
                        ))}
                    </div> */}
                    {isLoading && <Loading />}
                    {/* {error && <p>{error}</p>} */}
                    
                </div>
            </Container>
        </section>
    );
}

export default Hero;
