'use client'

// interfaces/Job.ts
export interface Job {
    id: string;
    Job?: string;
    jobDescription?: string;
    Role?: string;
    postingDate?: Date;
    Salary?: number;
    Company?: string;
    City?: string;
    State?: string;
    Country?: string;
}

// AllJobs.tsx
import React, { useEffect, useState } from 'react';
import Container from '@/components/container';
import JobCard from '@/components/job-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Search } from 'lucide-react';
import Loading from '../loading';

function truncateText(text: any, limit: number): string {
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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/jobs');
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs: ' + response.statusText);
                }
                const data: Job[] = await response.json();
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

    const filteredJobs = jobs.filter(job => {
        // Ensure 'Job' is a string and perform a case-insensitive comparison
        const jobTitle = job.Job?.toLowerCase() ?? '';

        // Check if 'jobDescription' is a string and perform a case-insensitive comparison
        const jobDescription = typeof job.jobDescription === 'string' ? job.jobDescription.toLowerCase() : '';

        return jobTitle.includes(searchTerm.toLowerCase()) || jobDescription.includes(searchTerm.toLowerCase());
    });


    if (isLoading) return <Loading />;
    if (error) return <p>{error}</p>;

    return (
        <Container className='pt-[100px]'>
            <div className='flex flex-col  items-center'>
                
                    <div className='flex items-center w-full mb-[100px] border-grey shadow-md border-[1px] px-[12px] py-[12px] rounded-[12px] bg-white'>
                        <Search className='w-4 h-4' />
                        <Input
                            type='text'
                            placeholder='Job title, keyword'
                            className='border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        />
                    </div>

                <div className="grid md:grid-cols-3 grid-cols-2 gap-4"> {filteredJobs.map((job) => (
                    <JobCard
                        key={job.id}
                        jobId={job.id}
                        jobType={job.Role ?? 'N/A'}
                        title={job.Job ?? 'No Job Title'}
                        description={truncateText(job.jobDescription ?? 'No Description Available', 35)}
                        postedTime={job.postingDate ? `${job.postingDate.toLocaleString()}` : 'N/A'}
                        salaryRange={job.Salary ? `${job.Salary.toLocaleString()}` : 'Salary Not Disclosed'}
                        companyName={job.Company ?? 'Company Not Listed'}
                        location={`${job.City ?? 'Unknown City'}, ${job.State ?? 'Unknown State'}, ${job.Country ?? 'Unknown Country'}`}
                        icon={Facebook}
                    />
                ))}
                </div>
            </div>
        </Container>
    );
};

export default AllJobs;
