import LandingCover from '@/assets/landing.svg';
import Image from 'next/image';

export const Landing = () => {
  return (
    <div className='relative w-full'>
        <h3 className='absolute left-10 top-2/4 text-4xl font-bold text-white w-2/4 leading-10 max-md:text-sm max-md:left-3 -translate-y-2/4'>Welcome to AS Shop – Your One-Stop Destination for All Your Shopping Needs</h3>
        <Image src={LandingCover} className='w-full' objectFit="contain" alt='Landing' />
    </div>
  )
}
