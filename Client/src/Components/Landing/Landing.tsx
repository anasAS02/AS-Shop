import LandingCover from '@/assets/landing.jpg';
import Image from 'next/image';

export const Landing = () => {
  return (
    <div className='relative'>
        <h3 className='absolute left-10 top-2/4 text-4xl font-bold w-2/4 leading-10 max-md:text-sm max-md:left-3 -translate-y-2/4'>Welcome to AS Shop – Your One-Stop Destination for All Your Shopping Needs</h3>
        <Image src={LandingCover} style={{ width: '100%' }} height={0} objectFit="contain" alt='Landing' />
    </div>
  )
}
