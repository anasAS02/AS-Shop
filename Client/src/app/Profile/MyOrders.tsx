import imge from '@/assets/cover1.jpg';
import Image from 'next/image';

const MyOrders = () => {
  return (
    <div className='w-full h-screen flex items-start gap-5 flex-co p-5'>
        <div className='flex flex-col items-start gap-5'>
            <h2 className='text-2xl max-md:text-base'>On Road</h2>
            <div className='flex items-center gap-5 relative overflow-hidden'>
                <span className='w-5 h-5 bg-green-500 rounded-full'></span>
                <span className='w-5 h-5 bg-green-500 rounded-full'></span>
                <span className='w-5 h-5 bg-green-400 duration-200 animate-pulse rounded-full'></span>
                <span className='w-full h-1 bg-green-500 rounded-md absolute left-8 -translate-x-2/4 -translate-y-2/4 top-2/4'></span>
            </div>
            <span className='flex items-center gap-5'>
                <Image src={imge} width={200} height={200} alt='as' />
                <span className='flex flex-col items-start gap-2'>
                    <h2>Iphone XS mac <span className='text-gray-400 font-bold text-base max-md:text-sm'>x2</span></h2>
                    <p className='text-green-400 font-bold'>$800</p>
                </span>
            </span>
            <p className='text-gray-400 text-base max-md:text-sm'>12-05-2023</p>
            <p className='text-green-400 font-bold text-base max-md:text-sm'><span className='text-black'>Total:</span> $989</p>
        </div>
    </div>
  )
}

export default MyOrders