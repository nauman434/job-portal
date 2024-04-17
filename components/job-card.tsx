// components/JobCard.tsx

import React from 'react';
import { Clock, DollarSign, LucideIcon } from 'lucide-react';
import Link from 'next/link';

type JobCardProps = {
    jobId: string;
    jobType: string;
    title: string;
    description: string;
    postedTime: string; // Ensure this is included and formatted properly
    salaryRange: string;
    companyName: string;
    icon: LucideIcon;  // Corrected type for a JSX.Element
    location: string;
};

const JobCard: React.FC<JobCardProps> = ({
    jobId,
    jobType,
    title,
    description,
    postedTime,
    salaryRange,
    companyName,
    icon: Icon,  
    location,
}) => {
    return (
        <Link href={`/job/${jobId}`}>  
            <div className="max-w-sm rounded-lg border-gray-100 border-[1px] hover:shadow-lg transition ease-in bg-white p-6 cursor-pointer">
                <span className="inline-block bg-blue-100 text-darkGrey text-xs font-semibold rounded-full px-2.5 py-0.5">
                    {jobType}
                </span>
                <h3 className="mt-3 text-xl font-bold text-primary">{title}</h3>
                <p className="mt-2 text-darkGrey text-sm">{description}</p>
                <div className="flex justify-between items-center mt-4">
                    <div className='flex gap-2 items-center'>
                        <Clock className='w-3 h-3' />
                        <span className="text-xs text-gray-500">{postedTime}</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        {/* <DollarSign className='w-3 h-3' /> */}
                        <span className="text-xs font-bold">{salaryRange}</span>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="flex items-center">
                    <Icon className="w-6 h-6 text-primary" />
                    <div className="ml-2">
                        <p className="text-sm font-semibold">{companyName}</p>
                        <p className="text-xs text-gray-500">{location}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default JobCard;
