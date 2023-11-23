'use client'
import { ProductCard, ProductData } from "@/Components/Products/Product/ProductCard";
import { GET_FAVORITES_LIST } from "@/Utils/Apis";
import { EMAIL } from "@/Utils/Cookies";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useStatusContext } from "@/Utils/Status/statusContext";
import { calcPrice } from "@/Utils/Products/calcPrice";

const Favourite = () => {
  const {isLoggedIn} = useStatusContext();
  const [products, setProducts] = useState<any[]>();

  const getFavoritesList = async () => {
    try{
        const res = await axios.post(GET_FAVORITES_LIST, {email: EMAIL});
        const data = await res.data.data;
        setProducts(data);
    }catch(err){
        console.log(err)
    }
}

useEffect(() => {
  getFavoritesList();
  document.title = 'AS-Shop Favorites list';
}, [products])

  return (
    !isLoggedIn ? 
    <div className='h-screen'>
      <h2 className='absolute left-2/4 -translate-x-2/4 -translate-y-2/4 top-2/4 max-md:top-full font-bold text-red-500 text-3xl max-md:text-sm flex flex-col items-center'>You must be logged in
        <Link href='/Auth/Login' className='text-base max-md:text-sm text-black hover:text-yellow-500 duration-200'>Login now</Link>
      </h2>
    </div>
    :
    <div className={`${products && products.length > 0 ? 'h-full' : 'h-screen'} flex flex-col gap-5`}>
      {products && products?.length > 0 ? 
        <div className='flex flex-col justify-center items-center w-full gap-5 p-10'>
          {products?.map((product: ProductData) => (
            <ProductCard key={product._id} _id={product._id} total={calcPrice(product.price, product.discountPercentage || 0)} title={product.title} quantity={1} price={product.price} thumbnail={product.thumbnail} images={product.images} category={product.category} description={product.description} discountPercentage={product.discountPercentage} brand={product.brand} />
          ))}
        </div>
        :
        <h2 className='absolute left-2/4 -translate-x-2/4 -translate-y-2/4 top-2/4 max-md:top-full font-bold text-red-500 text-3xl max-md:text-base flex flex-col items-center'>Your favourite list is empty
          <Link href='/Categories/All-Products' className='text-base max-md:text-sm text-black hover:text-yellow-500 duration-200'>Shop now</Link>
        </h2>
    }
    </div>
  )
}

export default Favourite