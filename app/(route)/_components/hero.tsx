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

    // useEffect(() => {
    //     const fetchJobs = async () => {
    //         const cachedJobs = localStorage.getItem('cachedJobs');
    //         const cachedTime = localStorage.getItem('cachedTime');

    //         if (cachedJobs && cachedTime && new Date().getTime() - new Date(parseInt(cachedTime)).getTime() < 3600000) {
    //             setJobs(JSON.parse(cachedJobs));
    //             setIsLoading(false);
    //         } else {
    //             try {
    //                 const response = await fetch('/api/jobs');
    //                 if (!response.ok) {
    //                     throw new Error('Failed to fetch jobs: ' + response.statusText);
    //                 }
    //                 const data = await response.json();
    //                 setJobs(data);
    //                 localStorage.setItem('cachedJobs', JSON.stringify(data));
    //                 localStorage.setItem('cachedTime', new Date().getTime().toString());
    //             } catch (error) {
    //                 console.error('Failed to fetch jobs:', error);
    //                 setError('Failed to load jobs. Please try again later.');
    //             } finally {
    //                 setIsLoading(false);
    //             }
    //         }
    //     };

    //     fetchJobs();
    // }, []);

    // const uniqueTypes = new Set<string>();
    // const uniqueJobs = jobs.slice(0, 490).filter(cat => cat.Type && !uniqueTypes.has(cat.Type) && cat.Type.trim() !== "" && uniqueTypes.add(cat.Type));

    const backgroundStyle = {
        position: 'relative' as 'relative',
        paddingTop: '100px',
        paddingBottom: '100px',
        backgroundImage: 'url(/img-1.jpg)',
        backgroundSize: 'cover' as 'cover',
        backgroundPosition: 'center' as 'center'
    };

    const overlayStyle = {
        position: 'absolute' as 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 0
    };

    const contentStyle = {
        position: 'relative' as 'relative',
        zIndex: 1
    };

    return (
        <section style={backgroundStyle}>
            <div style={overlayStyle} />
            <div style={contentStyle}>
                <Container className=''>
                    <div className='flex flex-col justify-center items-center pt-[50px] pb-[30px]  gap-[50px]'>
                        <div className='md:w-[60%] w-full flex flex-col gap-[20px]'>
                            <h1 className='sm:text-[48px] text-xl leading-[150%]  font-bold text-center mb-4 text-white'>Welcome to largest Mining jobs site in the world.</h1>
                            <p className='sm:text-lg text-sm text-center text-gray-200'>Discover a Wealth of Career Opportunities in the Thriving World of Mining: Explore High-Paying Roles, International Ventures, and Exciting Projects Await</p>
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
                        {/* {isLoading && <Loading />} */}
                        {/* {error && <p>{error}</p>} */}

                    </div>
                </Container>
            </div>
        </section>
    );
}

export default Hero;
