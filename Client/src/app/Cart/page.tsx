'use client'
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import {useState, useEffect} from 'react';
const Cart = () => {
  const [hi, setHi] = useState<boolean>(false);
  const [pros, setPros] = useState<any[]>();
  useEffect(() => {
    fetch('https://dummyjson.com/carts/1')
    .then(res => res.json())
    .then((data) => setPros(data.products));
  }, [])
  return (
    <div className={`${pros && pros.length > 0 ? 'h-full' : 'h-screen'} w-full p-10`}>
        {hi ? 
          <h2 className='absolute left-2/4 -translate-x-2/4 -translate-y-2/4 top-2/4 max-md:top-full font-bold text-red-500 text-3xl max-md:text-base flex flex-col items-center'>Your cart is empty
            <Link href='/Categories/AllProducts' className='text-base max-md:text-sm text-black hover:text-yellow-500 duration-200'>Shop now</Link>
          </h2>
        :
        <div className='flex justify-around items-start gap-14 max-md:flex-col max-md:justify-center max-md:gap-5'>
          <div className='w-fit flex flex-col items-start gap-5 max-md:justify-center max-md:items-center'>
            {pros?.map((pro: any) =>
              <span className='w-full flex items-center max-md:flex-col max-md:justify-center gap-5 p-2 border-2 border-gray-100 rounded-md'>
                <Image width={100} height={100} src={pro.thumbnail} alt='' />
                <span className='md:w-[300px] flex flex-col gap-2 items-start max-md:items-center max-md:text-center'>
                  <h2 className='text-xl max-md:text-lg'>{pro.title}</h2>
                  <p className='text-gray-400'>${pro.price}</p>
                </span>
                <span className='flex items-center gap-5 border-2 border-gray-300 rounded-md p-2'>
                  <FontAwesomeIcon icon={faMinus} onClick={() => console.log('first')} className='text-gray-400 cursor-pointer' />
                  {pro.quantity}
                  <FontAwesomeIcon icon={faPlus}  onClick={() => console.log('first')} className='text-gray-400 cursor-pointer'/>
                </span>
                <h3 className='text-lg max-md:text-sm'>${pro.total}</h3>
                <FontAwesomeIcon icon={faXmark}  onClick={() => console.log('first')} className='cursor-pointer md:ml-auto duration-200 hover:text-red-500'/>
              </span>
            )}
          </div>
          <div className='w-fit h-fit p-5 border-2 border-gray-100 rounded-md flex flex-col items-center gap-4'>
            <h2 className='text-xl max-md:text-lg mr-auto'>Order summary</h2>
            <span className='w-full flex justify-between items-center gap-6 text-gray-500 max-md:text-xs'>
              <p>total products</p>
              <p className='ml-auto'>${pros && pros[0].total}</p>
            </span>
            <span className='w-full flex justify-between items-center gap-6 text-gray-500 max-md:text-xs font-bold'>
              <p>total <small className='text-red-500 align-super'>* </small>(includes shipping and tax)</p>
              <p className='ml-auto'>${pros && pros[0].total}</p>
            </span>
            <button className='outline-none border-none rounded-md p-4 max-md:p-2 duration-300 bg-blue-400 hover:bg-blue-300 text-white text-center'>Checkout</button>
          </div>
        </div>
        }
    </div>
  )
}

export default Cart