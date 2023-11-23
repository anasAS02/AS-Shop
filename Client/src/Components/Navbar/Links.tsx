import { CategoryData, getCategories } from "@/Utils/Products/getCategories";
import Link from "next/link";

export const Links = async () => {
  const categories = await getCategories();
  return (
    <div className='w-full bg-zinc-800 p-2 flex justify-center items-center gap-5 text-sm text-white max-md:flex-wrap'>
        <Link href={`/Categories/All-Products`} className='duration-200 hover:text-yellow-500'>All Products</Link>
        {
        categories?.map((category: CategoryData) => (
        <Link key={category._id} href={`/Categories/${category.href}`} className='duration-200 hover:text-yellow-500'>{category.title}</Link>
      ))}
    </div>
  )
}
