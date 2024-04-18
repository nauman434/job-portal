
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter: React.FC = () => {



    return (
        <Container className='mt-[50px]'>
            <section className='rounded-lg bg-black px-[20px]' >
                <div className='grid md:grid-cols-12 grid-cols-1 gap-[20px] py-[30px]'>
                    <div className='col-span-7'>
                        <h1 className='sm:text-3xl text-xl font-semibold text-start text-white leading-[100%] mb-2'>Get the latest jobs in your inbox</h1>
                        <p className='text-sm text-start text-grey'>Subscribe to our newsletter and get latest jobs in you email</p>
                    </div>
                    <div className=' col-span-5'>
                        <div className='flex w-full justify-between border-grey shadow-md border-[1px] px-[12px] py-[12px] rounded-[12px] bg-white'>
                            <div className='flex items-center'>
                                <Input type='text' placeholder='your email address' className='border-none focus-visible:ring-0 focus-visible:ring-offset-0' />
                            </div>
                            <Button>Submit</Button>
                        </div>

                    </div>
                </div>
            </section>
        </Container>
    );
};

export default Newsletter;
