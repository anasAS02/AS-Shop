import Link from "next/link"
import { links } from "./data"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Bag = (props: {active: boolean}) => {
  return (
    <div className={`w-full h-screen bg-black absolute ${props.active ? 'top-10' : '-top-[1000px]'} duration-300 left-0 p-5 flex flex-col justify-start gap-5`}>
        <span className='flex flex-col gap-5'>
            <p className='font-bold text-white text-xl'>Your Bag is Empty.</p>
            <p className='text-sm text-gray-500'><Link href='/signin' className='text-blue-700'>Sign in</Link> to see if you have any saved items</p>
        </span>
        <span className='flex flex-col gap-5'>
            <p className='text-gray-400'>My Profile</p>
            {links.map((link) => (
                <Link key={link.id} href={link.href} className='duration-200 text-sm text-slate-300 flex items-center gap-2 p-2 hover:text-white'>
                    <FontAwesomeIcon icon={link.icon} />
                    {link.title}
                </Link>
            ))}
        </span>
    </div>
  )
}
