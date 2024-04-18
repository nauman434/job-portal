'use client'

// Import necessary dependencies and interfaces
import { useEffect, useState } from 'react';
import { Job } from '@/interfaces/Job';
import { useParams } from 'next/navigation';
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, DollarSign, Navigation } from 'lucide-react';
import Link from 'next/link';
import Loading from '../../loading';
import { Separator } from '@/components/ui/separator';

// Define your component
const JobDetail = () => {
  // State to hold the job data
  const [job, setJob] = useState<Job | null>(null);
  const param = useParams();
  const slug = param.slug;

  console.log('id', slug)

  // Function to fetch job data
  const fetchJob = async () => {
    try {
      // Make a request to your API endpoint
      const res = await fetch(`/api/jobs/${slug}`); // Replace id with your actual id
      if (!res.ok) {
        throw new Error('Failed to fetch job data');
      }
      // Parse response as JSON
      const jobData: Job = await res.json();
      // Set job data to state
      setJob(jobData);
    } catch (error) {
      console.error('Failed to fetch job data:', error);
    }
  };

  // Call fetchJob function when component mounts
  useEffect(() => {
    fetchJob();
  }, []);
  return (
    <section className='py-[100px]'>
      <Container>
        <div className='pt-[50px]'>
          {job ? (
            <div className='sm:p-[35px] p-[15px] flex flex-col gap-[30px] w-full bg-white border rounded-3xl'>
              <div className='grid md:grid-cols-12 grid-cols-1 gap-4'>
                <div className='md:col-span-10 col-span-1'>
                  <h1 className='sm:text-3xl text-2xl font-bold mb-3'>{job.Role}</h1>
                  <p className='sm:text-lg text-[16px] text-grey'>{job.Company}</p>
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
                  <h4 className='text-lg font-bold mb-2'>Posted At</h4>
                  <p className='text-lg text-darkGrey'>{job.postingDate ? `${job.postingDate.toLocaleString()}` : 'N/A'}</p>
                </div>
                <div>
                  <h4 className='text-lg font-bold mb-2'>Location</h4>
                  <p className=''><span className='p-1 bg-red-100  text-red-700 mr-2 rounded-sm'>{job.City}</span> <span className='p-1 bg-green-100 border-green-700 text-green-700 mr-2 rounded-sm'>{job.State}</span>  <span className='font-bold'>{job.Country}</span></p>
                </div>
              </div>

              <div className='mt-6'>
                <h2 className='font-bold text-2xl mb-3'>Job Description</h2>
                <p className='text-darkGrey text-lg mb-4' style={{ whiteSpace: 'pre-wrap' }}>
                  {job.jobDescription}
                </p>
              </div>
            </div>
          ) : ''}
        </div>
      </Container>
    </section>
  );
};

export default JobDetail;

{/* <div className='pt-[100px]'>
      {job ? (
        <section>
          <div className='bg-gray-100 py-[30px]'>
            <Container>
              <div className='flex items-center justify-between '>
                <h4 className='text-lg font-bold'>Job Details</h4>
                <p className='text-sm text-grey'>Home   /   <span className='text-darkGrey'>Job Details</span></p>
              </div>

            </Container>
          </div>
          <Container className='pt-[50px]'>
            <div className='grid md:grid-cols-12 grid-cols-1 gap-6'>
              <div className='col-span-7'>
                <div className='mb-[50px]'>
                  <Button className='mb-4' disabled variant={"secondary"}>{job.Company}</Button>
                  <h1 className='text-4xl leading-[150%] mb-4 font-bold'>{job.Job}</h1>
                  <div className='text-lg flex gap-2 items-center'>

                    <Button disabled className='bg-green-600'>{job.Status}</Button>
                    <Button variant={'outline'} className='rounded-full'>{job.State}</Button>
                  </div>
                </div>
                <div className='col-span-5 items-start md:hidden flex flex-col gap-10'>
                  <div>
                    <Button >
                      <Link href={job.jobLink ? new URL(job.jobLink).toString() : ''} target='_blank' className='flex item-center gap-2'>
                        Apply Now
                        <ArrowRight className='w-3 h-3' />
                      </Link>
                    </Button>
                  </div>
                  <div className='flex mb-[50px] border-grey border-[1px] rounded-[10px] sm:h-[160px] h-full w-full justify-between p-[32px] sm:items-end items-center sm:flex-row flex-col gap-4'>
                    <div className='flex flex-col items-center gap-2 w-[50%]'>
                      <DollarSign className='w-8 h-8 text-blue-500' />
                      <h6 className='font-bold '>Salary(USD)</h6>
                      <h4 className='md:text-lg text-sm text-[#0BA02C] font-medium'>{job.Salary}</h4>
                    </div>
                    <div className='sm:w-[1px] w-full sm:h-full h-[1px] bg-grey' />
                    <div className='flex flex-col items-center gap-2 w-[50%]'>
                      <Navigation className='w-8 h-8 text-blue-500' />
                      <h6 className='font-bold'>Location</h6>
                      <h4 className='md:text-lg text-sm'>{job.City}, {job.Country}</h4>
                    </div>
                  </div>
                </div>
                <div>
                  <p className='leading-[150%] tracking-wide text-darkGrey text-lg'>{job.jobDescription}</p>
                </div>
              </div>
              <div className='col-span-5 items-end md:flex hidden flex-col gap-10'>
                <div>
                  <Button >
                    <Link href={job.jobLink ? new URL(job.jobLink).toString() : ''} target='_blank' className='flex item-center gap-2'>
                      Apply Now
                      <ArrowRight className='w-3 h-3' />
                    </Link>
                  </Button>
                </div>
                <div className='flex border-grey border-[1px] rounded-[10px] h-[160px] w-full justify-between p-[32px] items-end'>
                  <div className='flex flex-col items-center gap-2'>
                    <DollarSign className='w-8 h-8 text-blue-500' />
                    <h6 className='font-bold'>Salary(USD)</h6>
                    <h4 className='text-lg text-[#0BA02C] font-medium'>{job.Salary}</h4>
                  </div>
                  <div className='w-[1px] h-full bg-grey' />
                  <div className='flex flex-col items-center gap-2'>
                    <Navigation className='w-8 h-8 text-blue-500' />
                    <h6 className='font-bold'>Location</h6>
                    <h4 className='text-lg'>{job.City}, {job.Country}</h4>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : (
       <Loading/>
      )}
    </div> */}

