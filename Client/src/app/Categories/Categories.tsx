'use client'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { categoryData } from "@/Components/Navbar/data"
import { getCategories } from "@/Utils/Products/getCategories"
import { SHOW_IMG } from "@/Utils/Apis"

export const Categories = () => {
  const [categories, setCategories] = useState<categoryData[]>();
  getCategories().then((data) => setCategories(data));

  return (
    <div className='w-full p-24 flex items-center justify-center flex-col gap-5'>
        <h2 className='text-2xl font-bold max-md:text-sm mr-auto'>Our Categories</h2>
        <div className='flex items-center flex-wrap gap-5'>
            {categories?.map((category: categoryData) => (
                <span key={category.id} className='flex flex-col items-center gap-2 relative'>
                    <Link href={`/${category.href}`} className='flex flex-col items-center gap-2'>
                    <Image src={SHOW_IMG + category.thumbnail} style={{width: '150px', height: '150px'}} width={800} height={800} objectFit="contain" alt={category.title} className='rounded-md duration-300 hover:scale-105' />
                    {category.title}
                    </Link>
                </span>
            ))}
        </div>
    </div>
  )
}
