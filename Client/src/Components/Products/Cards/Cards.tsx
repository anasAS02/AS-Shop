'use client'
import { useEffect, useState } from 'react';
import { getProducts } from '@/Utils/Products/getProducts';
import { ProductData } from '../Product/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { SHOW_IMG } from '@/Utils/Apis';

const Cards = () => {
  const [products, setProducts] = useState<ProductData[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response?.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='flex items-center gap-5 max-md:flex-col p-24'>
      {products?.slice(7, 10).map((product: ProductData) => (
        <span key={product._id} className='relative'>
          <Image
            src={product.thumbnail.startsWith('https://i.imgur.com/') ? product.thumbnail : SHOW_IMG + product.thumbnail}
            style={{ width: '400px', height: '300px' }}
            width={800}
            height={800}
            objectFit='contain'
            alt={product.title}
            className='rounded-md'
          />
          <span className='p-3 w-full h-full duration-300 hover:bg-blue-200 opacity-0 hover:opacity-100 rounded-md flex flex-col items-center justify-center gap-3 absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4'>
            <h3 className='text-xl max-md:text-base'>{product.title}</h3>
            <Link className='p-2 bg-white rounded-md text-yellow-500 text-lg max-md:text-sm' href={`/Product/${product._id}`}>
              Buy now
            </Link>
          </span>
        </span>
      ))}
    </div>
  );
};

export default Cards;
