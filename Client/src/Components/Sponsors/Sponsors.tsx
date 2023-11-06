import Image from "next/image"

import Apple from '@/assets/Sponsors/Apple.png';
import HP from '@/assets/Sponsors/Hp.png';
import OPPO from '@/assets/Sponsors/Oppo.png';
import Samsung from '@/assets/Sponsors/Samsung.png';

export const Sponsors = () => {
  return (
    <div className='w-full p-24 flex flex-col items-center justify-center gap-5'>
        <h2 className='text-2xl max-md:text-sm font-bold mr-auto'>Our Sponsors</h2>
        <span className='flex items-center justify-center gap-10 flex-wrap'>
          <Image src={Apple} style={{width: '100px', height: '100px'}} width={400} height={400} objectFit="contain" alt='Apple' />
          <Image src={HP} style={{width: '100px', height: '100px'}} width={400} height={400} objectFit="contain" alt='HP' />
          <Image src={OPPO} style={{width: '100px', height: '100px'}} width={400} height={400} objectFit="contain" alt='Oppo' />
          <Image src={Samsung} style={{width: '100px', height: '100px'}} width={400} height={400} objectFit="contain" alt='Samsung' />
        </span>
    </div>
  )
}
