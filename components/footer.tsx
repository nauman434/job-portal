import React from 'react'
import Container from './container'
import Image from 'next/image'
import Link from 'next/link'
import { NavbarRoutes } from './navbar-routes'
import { Button } from './ui/button'
import { Facebook, LinkedinIcon, Twitter } from 'lucide-react'

const footerRoutes = [
  {
    name: "Jobs",
    path: '/'
  },
  {
    name: "Companies",
    path: '/companies'
  },
  {
    name: "Career Advice",
    path: '/blogs'
  },
  {
    name: "Contact Us",
    path: '/blogs'
  },
  {
    name: "Terms of Service",
    path: '/terms-of-service'
  },
  {
    name: "Privacy Policy",
    path: '/privacy-policy'
  },
]

const socialMedia = [
  {
    icon: LinkedinIcon,
    path: '/'
  },
  {
    icon: Facebook,
    path: '/'
  },
]

const Footer = () => {
  return (
    <footer className='pt-[50px] border-t-darkGrey border-t-[1px]'>
      <Container className='flex flex-col gap-8'>
        <div className='flex sm:flex-row flex-col gap-[30px] items-start justify-between'>
          <div>
            <Link href={'/'}>
              <Image src={'/Logo.svg'} width={100} height={100} alt='Logo' />
            </Link>
          </div>
          <div className='flex sm:flex-row flex-col  gap-4'>
            <div className='grid grid-cols-2 grid-rows-3 gap-4'>
              {footerRoutes.map((route, index) => (
                <Link key={index} href={route.path}>
                  <Button variant={'link'}>{route.name}</Button>
                </Link>
              ))}
            </div>
            <div className='flex gap-4 sm:flex-col flex-row'>
              {socialMedia.map((social, index) => (
                <Link key={index} href={social.path} >
                  <Button variant={'outline'} size={'icon'} className='rounded-full'>
                    <social.icon className='w-[20px] h-[20px]' />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

        </div>
        <div className='py-[30px] border-t-grey border-t-[1px]'>
          <p className='text-center text-[15px] text-darkGrey'>
            © 2023 Job Portal. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer