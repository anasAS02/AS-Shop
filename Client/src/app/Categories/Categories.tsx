'use client'
import { useEffect, useState } from 'react';
import { CategoryData, getCategories } from '@/Utils/Products/getCategories';
import { SHOW_IMG } from '@/Utils/Apis';
import Image from 'next/image';
import Link from 'next/link';

const Categories = () => {
  const [categories, setCategories] = useState<CategoryData[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='w-full p-24 flex items-center justify-center flex-col gap-5'>
      <h2 className='text-2xl font-bold max-md:text-sm mr-auto'>Our Categories</h2>
      <div className='flex items-center flex-wrap gap-5'>
        {categories?.map((category: CategoryData) => (
          <span key={category._id} className='flex flex-col items-center gap-2 relative'>
            <Link href={`/Categories/${category.href}`} className='flex flex-col items-center gap-2'>
              <Image
                src={category.thumbnail.startsWith('https://i.imgur.com/') ? category.thumbnail : SHOW_IMG + category.thumbnail}
                style={{ width: '150px', height: '150px' }}
                width={800}
                height={800}
                objectFit='contain'
                alt={category.title}
                className='rounded-md duration-300 hover:scale-105'
              />
              {category.title}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Categories;
