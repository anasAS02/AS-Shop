'use client'

import Link from 'next/link';
import { CategoryData, getCategories } from '@/Utils/Products/getCategories';
import { useState, useEffect } from 'react';

export const Links = () => {
  const [categories, setCategories] = useState<CategoryData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full bg-zinc-800 p-2 flex justify-center items-center gap-5 text-sm text-white max-md:flex-wrap'>
      <Link href={`/Categories/All-Products`} className='duration-200 hover:text-yellow-500'>
        All Products
      </Link>
      {categories &&
        categories.map((category: CategoryData) => (
          <Link
            key={category._id}
            href={`/Categories/${category.href}`}
            className='duration-200 hover:text-yellow-500'
          >
            {category.title}
          </Link>
        ))}
    </div>
  );
};
