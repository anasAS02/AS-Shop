import Link from "next/link"
import { links } from "./data"

export const Links = () => {
  return (
    <div className='w-full bg-zinc-800 p-2 flex justify-center items-center gap-5 text-sm text-white max-md:flex-wrap'>
      <Link key='0' href={`/Categories/AllProducts`} className='duration-200 hover:text-yellow-500'>All Products</Link>
        {links.map((link) => (
            <Link key={link.id} href={`/Categories/${link.href}`} className='duration-200 hover:text-yellow-500'>{link.title}</Link>
        ))}
    </div>
  )
}
