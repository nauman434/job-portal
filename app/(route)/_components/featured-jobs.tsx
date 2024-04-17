'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/container';
import JobCard from '@/components/job-card';
import { Button } from '@/components/ui/button';
import { Job } from '@/interfaces/Job';
import { Facebook } from 'lucide-react';
import Link from 'next/link';
import Loading from '../loading';

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

  if (isLoading) return <Loading/>;
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
