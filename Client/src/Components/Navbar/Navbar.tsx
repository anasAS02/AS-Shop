import Link from "next/link"
import { links } from "./data"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faApple } from "@fortawesome/free-brands-svg-icons"
import { SeacrhButton } from "./Search/SeacrhButton"
import { BagButton } from "./Bag/BagButton"

export const Navbar = () => {

  return (
    <nav className='w-full p-2 bg-zinc-800 opacity-80 text-gray-300 fixed top-0 flex justify-center items-center gap-5 max-md:gap-2'>
        <Link href='/'>
            <FontAwesomeIcon icon={faApple} className='w-[24px] h-[24px] duration-200 hover:text-white' />
        </Link>
        <div className='links flex items-center gap-5 max-md:gap-2'>
            {links.map((link) => (
                <Link key={link.id} href={link.href} className='duration-200 text-sm hover:text-white'>{link.title}</Link>
            ))}
        </div>
        <div className='flex items-center gap-2'>
            <SeacrhButton />
            <BagButton />
        </div>
    </nav>
  )
}
