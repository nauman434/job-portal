import React from 'react'
import Container from './container'
import Image from 'next/image'
import Link from 'next/link'
import { NavbarRoutes } from './navbar-routes'

const Footer = () => {
  return (
    <footer className='pt-[50px] border-t-darkGrey border-t-[1px]'>
      <Container className='flex flex-col gap-8'>
        <div className='flex items-center justify-between'>
          <div>
            <Link href={'/'}>
              <Image src={'/Logo.svg'} width={100} height={100} alt='Logo' />
            </Link>
          </div>
          <div>
            <div className=''><NavbarRoutes /></div>
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