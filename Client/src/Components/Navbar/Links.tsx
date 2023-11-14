import Link from "next/link"
import { categoryData } from "./data"
import axios from "axios";
import { GET_CATEGORIES } from "@/Utils/Apis";

export const Links = async () => {
  const res = await axios.get(GET_CATEGORIES);
  const data = res.data;
  console.log(data)
  return (
    <div className='w-full bg-zinc-800 p-2 flex justify-center items-center gap-5 text-sm text-white max-md:flex-wrap'>
{/* {      data.map((category: categoryData) => (
          <p>{category.href}</p>
      ))} */}
      {/* <Link key='0' href={`/Categories/AllProducts`} className='duration-200 hover:text-yellow-500'>All Products</Link>
        {data.map((category: categoryData) => (
            <Link key={category.id} href={`/Categories/${category.href}`} className='duration-200 hover:text-yellow-500'>{category.title}</Link>
        ))} */}
    </div>
  )
}
