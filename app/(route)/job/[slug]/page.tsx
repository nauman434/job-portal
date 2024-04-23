import Details from "@/components/details";


interface Job {
  Id: string;
  Company: string;
  Role: string;
  Type: string;
  Country: string;
  State: string;
  City: string;
  Status: string;
  Salary: string;
  postingDate: string;
  closingDate: string;
  jobLink: string;
  HowToApply: string;
}

const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=aB4CcvbRF3V08fdwOOPIyo9z7rnOCpSgNTrYyIIR_finj8IiNCbTP57F43H_tbtt53ytnr31RMebpd7qihrckCFrfYuITBORm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCZacyH8VWUFIguE0YP6rzf4KbghDEnOwU6XaDns7TB1H9adbaIKRvMZMKd9T3XTJtYBmpyG-UHKlMX0Xtby6zEUdazmcgtN5A&lib=Mkqw7b3y7buH77XAwtMhkAcwdutSGjkjP';

async function getJobDetail(slug: string): Promise<Job | { error: string }> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const jsonData = await response.json();
    if (!jsonData.data || !Array.isArray(jsonData.data)) {
      throw new Error("Data is not in expected format");
    }
    const job = jsonData.data.find((job: Job) => job.Id === slug);
    if (!job) {
      return { error: "Job not found" };
    }
    return job;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred." };
  }
}


export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const job = await getJobDetail(params.slug);

  // Check if 'error' is a property in the returned job object
  if ('error' in job) {
    return { title: "Job not found" };
  }

  // TypeScript will now understand that job is of type 'Job'
  return { title: job.Role };
}



const JobDetail = async ({ params }: { params: { slug: string } }) => {
  const jobs = await getJobDetail(params.slug)

  //console.log(jobs)


  return (
    <div>
      <Details job={jobs} />
    </div>
  )

}

export default JobDetail

















// 'use client'

// // useJobDetail.ts
// import { useEffect, useState } from 'react';
// import { Job } from '@/interfaces/Job';
// import { useParams } from 'next/navigation';
// import Container from '@/components/container';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, ArrowUpRight, DollarSign, Navigation } from 'lucide-react';
// import Link from 'next/link';
// import { Separator } from '@/components/ui/separator';




// const JobDetail = () => {
//   const [job, setJob] = useState<Job | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const param = useParams<{ slug: string }>();
//   const slug = param.slug;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/jobs/${slug}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error: ${response.status}`);
//         }

//         const jsonData: Job[] = await response.json(); // Directly expecting an array of jobs
//         //console.log('Fetched Data:', jsonData);

//         if (jsonData.length > 0) {
//           setJob(jsonData[0]); // Assuming you want to display the first job in the array
//         } else {
//           throw new Error('Data format error: Expected a non-empty array');
//         }
//       } catch (error: any) {
//         console.error('Fetch Error:', error);
//         setError(error.message || 'An error occurred');
//       }
//     };

//     fetchData();
//   }, [slug]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }


//   return (
//     <section className='py-[100px]'>
//       <Container>
//         <div className='pt-[50px]'>
//           {job ? (
//             <div className='sm:p-[35px] p-[15px] flex flex-col gap-[30px] w-full bg-white border rounded-3xl'>
//               <div className='grid md:grid-cols-12 grid-cols-1 gap-4'>
//                 <div className='md:col-span-10 col-span-1'>
//                   <h1 className='sm:text-3xl text-2xl font-bold mb-3'>{job.Role}</h1>
//                   <p className='sm:text-lg text-[16px] text-gray-400 font-bold'>{job.Company}</p>
//                 </div>
//                 <Button className='md:col-span-2 col-span-1 h-[60px]'>
//                   <Link className='flex items-center gap-3' href={job.jobLink ? new URL(job.jobLink).toString() : ''} target='_blank'>
//                     Apply Now
//                     <ArrowUpRight className='w-[18px] h-[18px]' />
//                   </Link>
//                 </Button>
//               </div>
//               <div >
//                 <Button className='text-black font-bold rounded-[0px] bg-transparent hover:bg-transparent border-b-black border-b-[2px]'>
//                   Job Details
//                 </Button>
//                 <Separator className='h-[2px]' />
//               </div>
//               <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-[20px]'>
//                 <div>
//                   <h4 className='text-lg font-bold mb-2'>Job Type</h4>
//                   <p className='text-lg text-darkGrey'>{job.Type || "Not Disclosed"}</p>
//                 </div>
//                 <div>
//                   <h4 className='text-lg font-bold mb-2'>Salary</h4>
//                   <p className='text-lg text-darkGrey'>{job.Salary ? `${job.Salary.toLocaleString()}` : 'Not Disclosed'}</p>
//                 </div>
//                 <div>
//                   <h4 className='text-lg font-bold mb-2'>Posted On</h4>
//                   <p className='text-lg text-darkGrey'>{job.postingDate ? `${job.postingDate.slice(0,10)}` : 'N/A'}</p>
//                 </div>
//                 <div>
//                   <h4 className='text-lg font-bold mb-2'>Location</h4>
//                   <p className=''><span className='p-1 bg-gray-100 border-gray-200 text-gray-700 mr-2 rounded-sm'>{job.City}</span> <span className='p-1 bg-gray-100 border-gray-200 text-gray-700 mr-2 rounded-sm'>{job.State}</span>  <span className='font-bold'>{job.Country}</span></p>
//                 </div>
//               </div>

//               <div className='mt-6'>
//                 <h2 className='font-bold text-2xl mb-3'>Job Description</h2>
//                 <p className='text-darkGrey text-lg mb-4' style={{ whiteSpace: 'pre-wrap' }}>
//                   {job.HowToApply}
//                 </p>
//               </div>
//             </div>
//           ) : ''}
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default JobDetail;





