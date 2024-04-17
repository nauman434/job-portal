'use client';
import { useEffect, useState } from 'react';
import Container from '@/components/container';
import JobCard from '@/components/job-card';
import { Button } from '@/components/ui/button';

import { Job } from '@/interfaces/Job';
import { Facebook } from 'lucide-react';
import Link from 'next/link';

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

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className='pt-[100px]'>
      <Container>
        <div className='flex flex-col gap-[50px] items-center'>
          <div>
            <h2 className='text-primary text-center text-3xl font-semibold'>Featured Jobs</h2>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4"> {jobs.slice(0, 6).map((job) => (
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
          <div>
            <Link href="/all-jobs">
              <Button>More jobs</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedJobs;
