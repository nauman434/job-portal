'use client'

import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { Clock, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Loading from '../loading';
import { Job } from '@/interfaces/Job';
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

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
      // Always fetch new data
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs: ' + response.statusText);
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setIsLoading(false);
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

  const uniqueCountries = new Set<string>();
  const uniqueCountry = jobs.slice(0, 491).filter(cat => cat.Country && !uniqueCountries.has(cat.Country) && cat.Country.trim() !== "" && uniqueCountries.add(cat.Country));

  const uniqueCompanies = new Set<string>();
  const uniqueCompany = jobs.slice(0, 491).filter(cat => cat.Company && !uniqueCompanies.has(cat.Company) && cat.Company.trim() !== "" && uniqueCompanies.add(cat.Company));


  if (isLoading) return <Loading />;
  if (error) return <p>{error}</p>;


  return (
    <Container className='py-[50px]'>
      <div className='grid md:grid-cols-12 grid-cols-1 gap-[50px]'>
        <div className='md:col-span-4 col-span-8 flex flex-col gap-[30px]'>
          <div className='p-[20px] border rounded-xl '>
            <div className='mb-[20px]'>
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

          </div>
          <div className='p-[20px] border rounded-xl '>
            <h4 className='font-bold text-sm mb-[20px]'>Job Type</h4>
            <div className='flex flex-wrap gap-4'>
              <ScrollArea className="h-[200px] w-full ">
                <div className=''>
                  {uniqueJobs.map((cat, index) => (
                    <div key={index}>
                      <Button className='mb-2 bg-transparent text-black p-0 hover:bg-transparent hover:font-bold transition ease-linear duration-75'>{cat.Type}</Button>
                      <div className='mb-2 w-full h-[1px] bg-gray-100' />
                    </div>
                    // <Button key={index} className='bg-gray-200 hover:bg-darkGrey text-black hover:text-white'>{cat.Type}</Button>
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>
          <div className='p-[20px] border rounded-xl '>
            <h4 className='font-bold text-sm mb-[20px]'>Country</h4>
            <div className='flex flex-wrap gap-4'>
              <ScrollArea className="h-[200px] w-full ">
                <div className='flex flex-wrap items-start gap-4'>
                  {uniqueCountry.slice(0, 10).map((cat, index) => (
                    <Button key={index} variant={'outline'}>{cat.Country}</Button>
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>
          <div className='p-[20px] border rounded-xl '>
            <h4 className='font-bold text-sm mb-[20px]'>Companies</h4>
            <div className='flex flex-wrap gap-4'>
              <ScrollArea className="h-[200px] w-full ">
                <div className='flex flex-wrap items-start gap-4'>
                  {uniqueCompany.slice(0, 10).map((cat, index) => (
                    <Button key={index} className='bg-transparent text-black hover:bg-gray-200' size={'sm'} variant={'default'}>{cat.Company}</Button>
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>
        </div>
        {/* 2nd Grid-Col */}
        <div className='col-span-8 flex flex-col gap-[50px]'>
          <div>
            <h2 className='text-3xl font-bold mb-2'>Recent Jobs</h2>
            <p className='text-grey'>{jobs.length} recent jobs are posted</p>
          </div>
          {jobs.slice(displayIndex, displayIndex + 10).map((job, index) => (
            <Link key={index} href={`/job/${job.id}`}>
              <div key={index} className='border p-[35px] rounded-xl flex flex-col gap-[20px] hover:shadow-lg transition ease-linear duration-75'>
                <div>
                  <h2 className='text-xl font-bold mb-2'>{job.Role}</h2>
                  <p className='text-grey'>{job.Company || 'Company Not Listed'}</p>
                </div>
                <div>
                  <p className='text-grey text-sm mb-4'>
                    {job.jobDescription?.slice(0,300)}
                  </p>
                  <Button disabled className='bg-gray-200 text-black'>{job.Type || "Not Disclosed"}</Button>
                </div>
                <div className='w-full h-[1px] bg-gray-200' />
                <div className='grid sm:grid-cols-3 grid-cols-1 '>
                  <div className='sm:hidden flex mb-4 justify-between flex-wrap gap-3'>
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
                  <Button className=''>
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