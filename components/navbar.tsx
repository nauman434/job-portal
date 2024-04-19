import React from 'react'
import Container from './container'
import Image from 'next/image'
import { Button } from './ui/button'
import { NavbarRoutes } from './navbar-routes'
import Link from 'next/link'

const Navbar = () => {
    return (
        <Container>
            <nav className='overflow-hidden py-6 h-[100px]'>
                <div className='grid md:grid-cols-3 grid-cols-2'>
                    <div className='flex items-center justify-start'>
                        <Link href={'/'}>
                            <Image src={'/miners.svg'} width={150} height={150} alt='Logo' />
                        </Link>
                    </div>
                    <div className='md:flex hidden items-center justify-center'><NavbarRoutes /></div>
                    <div className='flex items-center justify-end gap-4'>
                        
                        <Button variant={'default'}>
                            <Link href={'/post-job'}>Post a Job For Free</Link>
                        </Button>
                    </div>
                </div>
            </nav>
        </Container>
    )
}

export default Navbar