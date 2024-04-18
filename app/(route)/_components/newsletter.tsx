
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter: React.FC = () => {



    return (
        <Container className='mt-[50px]'>
            <section className='rounded-lg bg-black p-[5px]' >
                <div className='flex py-[50px] flex-col justify-center items-center  gap-[20px] '>
                    <div className='sm:w-[540px] w-full flex flex-col gap-[20px]'>
                        <h1 className='sm:text-3xl text-xl font-semibold text-center text-white leading-[100%]'>Get the latest jobs in your inbox</h1>
                        <p className='text-sm text-center text-grey'>Subscribe to our newsletter and get latest jobs in you email</p>
                    </div>
                    <div className='flex '>
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
