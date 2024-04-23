'use client'

// useJobDetail.ts
import { useEffect, useState } from 'react';
import { Job } from '@/interfaces/Job';
import { useParams } from 'next/navigation';

const getJobDetail = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);
  const param = useParams<{ slug: string }>();
  const slug = param.slug;

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

  return { job, error };
};

export default getJobDetail;
