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
  const [job, setJob] = useState<Job | null>(null);
  const param = useParams<{ slug: string }>();
  const slug = param.slug;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/jobs/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const jsonData: Job[] = await response.json(); // Directly expecting an array of jobs
        console.log('Fetched Data:', jsonData);

        if (jsonData.length > 0) {
          setJob(jsonData[0]); // Assuming you want to display the first job in the array
        } else {
          throw new Error('Data format error: Expected a non-empty array');
        }
      } catch (error: any) {
        console.error('Fetch Error:', error);
        setError(error.message || 'An error occurred');
      }
    };

    fetchData();
  }, [slug]);

  if (error) {
    return <div>Error: {error}</div>;
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
                  <h4 className='text-lg font-bold mb-2'>Posted On</h4>
                  <p className='text-lg text-darkGrey'>{job.postingDate ? `${job.postingDate.slice(0,10)}` : 'N/A'}</p>
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

export default JobDetail;

