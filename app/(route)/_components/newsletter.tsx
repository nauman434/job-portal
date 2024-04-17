
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter: React.FC = () => {



    return (
        <Container className='mt-[50px]'>
            <section className='rounded-lg' style={{
                backgroundImage: `url('/lines.svg'), linear-gradient(#F8F9FD, #F8F9FD)`,
                backgroundBlendMode: 'over',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom',
                backgroundSize: 'cover'
            }}>
                <div className='flex py-[50px] flex-col justify-center items-center  gap-[50px] '>
                    <div className='w-[540px] flex flex-col gap-[20px]'>
                        <h1 className='text-[64px] font-semibold text-center leading-[100%]'>We know the way to Success</h1>
                        <p className='text-[18px] text-grey'>Growing a business means having the right people in your team</p>
                    </div>
                    <div className='flex flex-col gap-[24px]'>
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
