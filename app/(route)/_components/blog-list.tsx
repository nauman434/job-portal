import BlogCard from '@/components/blog-card';
import Container from '@/components/container'
import React from 'react'

type Job = {
    id: number;
    date: string;
    title: string;
    description: string;
    imageUrl: string;
};

const jobs: Job[] = [
    {
        id: 1,
        date: "July 27, 2022",
        title: "How to find a job as a software developer in Japan",
        description: "Finding a software developer job in Japan is tough. Here's some advice to help English speakers avoid the pitfalls and find a positive work environment.",
        imageUrl: "/img.jpg", 
      },
    {
        id: 1,
        date: "July 27, 2022",
        title: "How to find a job as a software developer in Japan",
        description: "Finding a software developer job in Japan is tough. Here's some advice to help English speakers avoid the pitfalls and find a positive work environment.",
        imageUrl: "/img.jpg", 
      },
    {
        id: 1,
        date: "July 27, 2022",
        title: "How to find a job as a software developer in Japan",
        description: "Finding a software developer job in Japan is tough. Here's some advice to help English speakers avoid the pitfalls and find a positive work environment.",
        imageUrl: "/img.jpg", 
      },
];

const BlogList = () => {
    return (
        <section className='py-[100px]'>
            <Container className='flex flex-col gap-6'>
                <div className='flex flex-col gap-3'>
                    <h2 className='text-[36px] text-primary font-medium'>Top Articles for Miners in Worldwide</h2>
                    <p>Check out our latest blog posts for insights on miner</p>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-6 ">
                    {jobs.map((job) => (
                        <BlogCard
                            key={job.id}
                            date={job.date}
                            title={job.title}
                            description={job.description}
                            imageUrl={job.imageUrl}
                        />
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default BlogList