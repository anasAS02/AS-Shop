import Link from "next/link"
import { links } from "../data"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faApple } from "@fortawesome/free-brands-svg-icons"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faBagShopping } from "@fortawesome/free-solid-svg-icons/faBagShopping"

export const Navbar = () => {
  return (
    <nav className='w-full p-5 bg-gray-950 opacity-80 text-gray-300 fixed top-0 flex justify-center items-center gap-5'>
        <Link href='/'>
            <FontAwesomeIcon icon={faApple} className='w-[24px] h-[24px] duration-200 hover:text-white' />
        </Link>
        <div className='links flex gap-5'>
            {links.map((link) => (
                <Link key={link.id} href={link.href} className='duration-200 hover:text-white'>{link.title}</Link>
            ))}
        </div>
        <div className='flex items-center gap-5'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='w-[24px] h-[24px] duration-200 hover:text-white cursor-pointer' />
            <FontAwesomeIcon icon={faBagShopping} className='w-[18px] h-[18px] duration-200 hover:text-white cursor-pointer' />
        </div>
    </nav>
  )
}
