import BlogCard from '@/components/blog-card';
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { client } from '@/sanity/lib/client'
import { ArrowRight } from 'lucide-react';
import { groq } from 'next-sanity'
import Link from 'next/link';
import React from 'react'

const query = groq`*[_type == 'post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt asc)[0...3]`

export const revalidate = 0;


const FeaturedBlogs = async () => {
  const posts = await client.fetch(query);

  // console.log(posts)

  return (
    <Container className="pt-[100px]">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-[64px] text-start font-bold">Blogs Posts</h1>
          <Button variant={'link'} className='flex gap-2'>
            <Link href={'/blogs'} className="flex items-center gap-2">
              View All
              <ArrowRight className='w-4 h-4' />
            </Link>
          </Button>
        </div>
        <BlogCard posts={posts} />
      </div>
    </Container>
  )
}

export default FeaturedBlogs