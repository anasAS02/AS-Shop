import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons/faArrowRightLong"
import Link from "next/link"
import { links } from "../data"

export const Search = (props: {active: boolean}) => {
  return (
    <div className={`w-full bg-black absolute ${props.active ? 'top-10' : '-top-[1000px]'} duration-300 left-0 p-5 flex flex-col justify-start gap-1`}>
        <span className='flex items-center'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='w-[18px] h-[18px] duration-200 hover:text-white cursor-pointer' />
            <input autoFocus type='search' placeholder='Search apple.com' className='p-5 bg-transparent placeholder:text-gray-300 placeholder:font-bold placeholder:text-xl caret-white border-none outline-none' />
        </span>
        <span className='flex flex-col gap-5'>
            <p>Suggested Links</p>
            {links.map((link) => (
                <Link key={link.id} href={link.href} className='duration-200 text-sm text-white flex items-center gap-2 p-2 hover:bg-zinc-900'>
                    <FontAwesomeIcon icon={faArrowRightLong} className='w-[18p4] h-[14px]' />
                    {link.title}
                </Link>
            ))}
        </span>
        <span className='flex flex-col gap-5'>
            <p>Quick Links</p>
            {links.map((link) => (
                <Link key={link.id} href={link.href} className='duration-200 text-sm text-white flex items-center gap-2 p-2 hover:bg-zinc-900'>
                    <FontAwesomeIcon icon={faArrowRightLong} className='w-[18p4] h-[14px]' />
                    {link.title}
                </Link>
            ))}
        </span>
    </div>
  )
}
