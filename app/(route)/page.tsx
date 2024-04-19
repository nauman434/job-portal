import Container from '@/components/container'
import React from 'react'
import Hero from './_components/hero'
import PopularCategories from './_components/popular-categories'
import FeaturedJobs from './_components/featured-jobs'
import { Separator } from '@/components/ui/separator'
import Newsletter from './_components/newsletter'
import BlogList from './_components/blog-list'

const Home = () => {
  return (
    <main className=''>
      <Hero />
      <Newsletter />
      <FeaturedJobs />
      {/* <PopularCategories /> */}
      <BlogList/>
    </main>
  )
}

export default Home