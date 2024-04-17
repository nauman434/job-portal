'use client'

import { Job } from '@/interfaces/Job';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [job, setJob] = useState<Job | null>(null);
    const role  = useParams<{ role?: string }>();  


    const fetchJob = async () => {
        try {
          const res = await fetch(`/api/jobs/role/Maintenance`);
          if (!res.ok) {
            throw new Error('Failed to fetch job data');
          }
          // Parse response as JSON
          const jobData: Job = await res.json();
          setJob(jobData);
        } catch (error) {
          console.error('Failed to fetch job data:', error);
        }
      };
      useEffect(() => {
        fetchJob();
      }, []); 

    return (
        <div>
            {job ? <p>{`Job Title: ${job.Job}, Description: ${job.jobDescription}`}</p> : <p>No job found or still loading...</p>}
        </div>
    );
}

export default Page;
