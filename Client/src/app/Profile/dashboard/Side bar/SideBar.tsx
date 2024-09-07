import { faBagShopping, faCartFlatbed, faGear, faTableCells, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SideBar = () => {
    const pathname = usePathname();
  return (
    <aside className='h-screen flex flex-col max-md:justify-center gap-3 bg-slate-200 p-5 w-[400px] rounded-md max-md:text-xs max-md:w-full'>
        <Link href='/Profile/dashboard' className={`${pathname === '/Profile/dashboard' ? 'bg-blue-400 text-white': ''} flex items-center max-md:justify-center p-2 rounded-md duration-300`}>
        <FontAwesomeIcon className={`mr-3 ${pathname === '/Profile/dashboard' ? 'text-white' : 'text-black' } text-xl`} icon={faUser} />    
        Users</Link>
        <Link href='/Profile/dashboard/management' className={`${pathname.startsWith('/Profile/dashboard/management') ? 'bg-blue-400 text-white': ''} flex items-center max-md:justify-center p-2 rounded-md duration-300`}>
        <FontAwesomeIcon className={`mr-3 ${pathname.startsWith('/Profile/dashboard/management') ? 'text-white' : 'text-black' } text-xl`} icon={faGear} />    
        Management</Link>
        <Link href='/Profile/dashboard/categories' className={`${pathname.startsWith('/Profile/dashboard/categories') ? 'bg-blue-400 text-white': ''} flex items-center max-md:justify-center p-2 rounded-md duration-300`}>
        <FontAwesomeIcon className={`mr-3 ${pathname.startsWith('/Profile/dashboard/categories') ? 'text-white' : 'text-black' } text-xl`} icon={faTableCells} />    
        Categories</Link>
        <Link href='/Profile/dashboard/products' className={`${pathname.startsWith('/Profile/dashboard/products') ? 'bg-blue-400 text-white': ''} flex items-center max-md:justify-center p-2 rounded-md duration-300`}>
        <FontAwesomeIcon className={`mr-3 ${pathname.startsWith('/Profile/dashboard/products') ? 'text-white' : 'text-black' } text-xl`} icon={faBagShopping} />    
        Products</Link>
        <Link href='/Profile/dashboard/orders' className={`${pathname.startsWith('/Profile/dashboard/orders') ? 'bg-blue-400 text-white': ''} flex items-center max-md:justify-center p-2 rounded-md duration-300`}>
        <FontAwesomeIcon className={`mr-3 ${pathname.startsWith('/Profile/dashboard/orders') ? 'text-white' : 'text-black' } text-xl`} icon={faCartFlatbed} />    
        Orders</Link>
    </aside>
  )
}

export default SideBar