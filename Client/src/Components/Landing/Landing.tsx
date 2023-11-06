import LandingCover from '@/assets/landing.jpg';
import Image from 'next/image';

export const Landing = () => {
  return (
    <Image src={LandingCover} style={{ width: '100%' }} height={0} objectFit="contain" alt='Landing' />
  )
}
