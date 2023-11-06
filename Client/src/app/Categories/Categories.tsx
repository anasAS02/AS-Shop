import { links } from "@/Components/Navbar/data"
import Image from "next/image"
import Link from "next/link"

export const Categories = () => {
  return (
    <div className='flex items-center justify-center flex-col gap-5 p-24 w-full'>
        <h2 className='text-2xl font-bold max-md:text-sm mr-auto'>Our Categories</h2>
        <div className='flex items-center flex-wrap gap-5'>
            {links.map((category) => (
                <span key={category.id} className='flex flex-col items-center gap-2 relative'>
                    <Link href={`/${category.href}`} className='flex flex-col items-center gap-2'>
                    <Image src={category.thumbnail} style={{width: '150px', height: '150px'}} width={800} height={800} objectFit="contain" alt={category.title} className='rounded-md duration-300 hover:scale-105' />
                    {category.title}
                    </Link>
                </span>
            ))}
        </div>
    </div>
  )
}
