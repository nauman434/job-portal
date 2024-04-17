'use client'

import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { Clock, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Loading from '../loading';
import { Job } from '@/interfaces/Job';
import Link from 'next/link'
import { Input } from '@/components/ui/input'

function truncateText(text: string, limit: number): string {
  const words = text.split(/\s+/);
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
}

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      // Check for cached data
      const cachedJobs = localStorage.getItem('cachedJobs');
      const cachedTime = localStorage.getItem('cachedTime');

      if (cachedJobs && cachedTime && new Date().getTime() - new Date(parseInt(cachedTime)).getTime() < 3600000) {
        // If cached data is less than one hour old, use it
        setJobs(JSON.parse(cachedJobs));
        setIsLoading(false);
      } else {
        // Otherwise, fetch new data
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

  const loadMoreJobs = () => {
    setDisplayIndex(prevIndex => prevIndex + 10);
  };

  const goBack = () => {
    setDisplayIndex(prevIndex => Math.max(0, prevIndex - 10));
  };

  const endIndex = Math.min(displayIndex + 10, jobs.length);

  const uniqueTypes = new Set<string>();
  const uniqueJobs = jobs.slice(150, 490).filter(cat => cat.Type && !uniqueTypes.has(cat.Type) && cat.Type.trim() !== "" && uniqueTypes.add(cat.Type));


  if (isLoading) return <Loading />;
  if (error) return <p>{error}</p>;


  return (
    <Container className='py-[50px]'>
      <div className='grid md:grid-cols-12 grid-cols-1 gap-[50px]'>
        <div className='col-span-4 w-full'>
          <div className='p-[20px] border rounded-xl w-full'>
            <div className='mb-[50px]'>
              <h2 className='text-lg font-bold mb-3'>Search Jobs</h2>
              <div className='flex items-center w-full border-grey shadow-md border-[1px] px-[12px] py-[12px] rounded-[12px] bg-white'>
                <Search className='w-4 h-4' />
                <Input
                  type='text'
                  placeholder='Job title, keyword'
                  className='border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                // value={'searchTerm'}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className='flex gap-4 flex-col'>
              <h4 className='font-bold text-sm'>Job Type</h4>
              <div className='flex flex-wrap gap-4'>
                {uniqueJobs.slice(0, 10).map((cat, index) => (
                  <Button key={index} className='bg-gray-200 hover:bg-darkGrey text-black hover:text-white'>{cat.Type}</Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-8 flex flex-col gap-[50px]'>
          <div>
            <h2 className='text-3xl font-bold mb-2'>Recent Jobs</h2>
            <p className='text-grey'>{jobs.length} recent jobs are posted</p>
          </div>
          {jobs.slice(displayIndex, displayIndex + 10).map((job, index) => (
            <Link href={`/job/${job.id}`}>
              <div key={index} className='border p-[35px] rounded-xl flex flex-col gap-[20px] hover:shadow-lg transition ease-linear duration-75'>
                <div>
                  <h2 className='text-xl font-bold mb-2'>{job.Job}</h2>
                  <p className='text-grey'>{job.Company || 'Company Not Listed'}</p>
                </div>
                <div>
                  <p className='text-grey text-sm mb-4'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum debitis ut pariatur a repellat blanditiis quae odio sunt commodi, quam ab deleniti hic nemo aliquam voluptatem et dolores consequuntur maxime minus incidunt id. Aliquam, nulla.
                  </p>
                  <Button disabled className='bg-gray-200 text-black'>{job.Type || "Not Disclosed"}</Button>
                </div>
                <div className='w-full h-[1px] bg-gray-200' />
                <div className='grid sm:grid-cols-3 grid-cols-1 '>
                  <div className='sm:hidden flex mb-4 justify-between'>
                    <p className='font-bold flex items-center text-sm'>{job.Salary ? `${job.Salary.toLocaleString()}` : 'Salary Not Disclosed'}</p>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-4 h-4' />
                      <p className='text-sm text-grey'>{job.postingDate ? `${job.postingDate.toLocaleString()}` : 'N/A'}</p>
                    </div>
                  </div>

                  <p className='font-bold sm:flex hidden items-center text-sm'>{job.Salary ? `${job.Salary.toLocaleString()}` : 'Salary Not Disclosed'}</p>
                  <div className='sm:flex hidden items-center gap-2'>
                    <Clock className='w-4 h-4' />
                    <p className='text-sm text-grey'>{job.postingDate ? `${job.postingDate.toLocaleString()}` : 'N/A'}</p>
                  </div>
                  <Button className='font-mono'>
                    <Link target='_blank' href={job.jobLink ? new URL(job.jobLink).toString() : ''}>
                      Quick Apply
                    </Link>
                  </Button>
                </div>

              </div>
            </Link>
          ))}
          <div className='flex justify-between items-center'>
            {displayIndex > 0 && (
              <Button variant={'outline'} onClick={goBack}>Back</Button>
            )}
            <div>Showing {displayIndex + 1} to {endIndex} of {jobs.length} jobs</div>
            {displayIndex + 10 < jobs.length && (
              <Button onClick={loadMoreJobs}>Next</Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default FeaturedJobs