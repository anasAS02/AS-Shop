'use client'
import { ProductCard } from '@/Components/Products/Product/ProductCard';
import { useStatusContext } from '@/Utils/Status/statusContext';
import Link from 'next/link';
import {useState, useEffect} from 'react';

const Favourite = () => {
    const {isLoggedIn} = useStatusContext();
    const [arrs, setArrs] = useState<boolean>(true);
    const [pros, setPros] = useState<any[]>();
    useEffect(() => {
      fetch('https://dummyjson.com/carts/1')
      .then(res => res.json())
      .then((data) => setPros(data.products));
    }, [])
  return (
    !isLoggedIn ? 
    <div className='h-screen'>
      <h2 className='absolute left-2/4 -translate-x-2/4 -translate-y-2/4 top-2/4 max-md:top-full font-bold text-red-500 text-3xl max-md:text-base flex flex-col items-center'>You must be logged in
        <Link href='/Auth/Login' className='text-base max-md:text-sm text-black hover:text-yellow-500 duration-200'>Login now</Link>
      </h2>
    </div>
    :
    <div className={`${pros && pros.length > 0 ? 'h-full' : 'h-screen'} flex flex-col justify-center items-center gap-5`}>
      {pros && pros?.length < 0 ? 
          <h2 className='absolute left-2/4 -translate-x-2/4 -translate-y-2/4 top-2/4 max-md:top-full font-bold text-red-500 text-3xl max-md:text-base flex flex-col items-center'>Your favourite list is empty
            <Link href='/Categories/AllProducts' className='text-base max-md:text-sm text-black hover:text-yellow-500 duration-200'>Shop now</Link>
          </h2>
        :
        <div className='flex flex-col justify-center items-center gap-5 p-10'>
          {pros?.map((pro: any) => (
            <ProductCard key={pro.id} _id={pro.id} title={pro.title} quantity={1} price={pro.price} thumbnail={pro.thumbnail} images={pro.images} category='tvs' description={pro.title} discountPercentage={pro.discountPercentage} brand='alAraby' />
          ))}
        </div>
    }
    </div>
  )
}

export default Favourite