
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
} | order(_createdAt asc)`

export const revalidate = 0;

const Blogs = async () => {
  const posts = await client.fetch(query);

  // console.log(posts)

  return (
    <Container className="pt-[100px]">
      <div>
        <div className="flex items-center flex-col ">
          <h1 className="text-[64px] text-start font-bold">Career Advice</h1>
          <BlogCard posts={posts} />
        </div>
      </div>
    </Container>

  )
}

export default Blogs

