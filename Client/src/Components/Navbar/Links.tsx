'use client'
import { useState } from "react";
import { CategoryData, getCategories } from "@/Utils/Products/getCategories";
import Link from "next/link";

export const Links = () => {
  const [categories, setCategories] = useState<CategoryData[]>();
  getCategories().then((data) => setCategories(data));
  return (
    <div className='w-full bg-zinc-800 p-2 flex justify-center items-center gap-5 text-sm text-white max-md:flex-wrap'>
        <Link key='0' href={`/Categories/AllProducts`} className='duration-200 hover:text-yellow-500'>All Products</Link>
        {
        categories?.map((category: CategoryData) => (
        <Link key={category._id} href={`/Categories/${category.href}`} className='duration-200 hover:text-yellow-500'>{category.title}</Link>
      ))}
    </div>
  )
}
