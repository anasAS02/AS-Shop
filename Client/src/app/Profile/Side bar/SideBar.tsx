'use client'
import { faCircleInfo, faGear, faRightFromBracket, faShop, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookie from 'js-cookie';
import { useState } from 'react';
import {userRoles} from '../../../../../server/src/utils/userRoles';
import { ROLE } from '@/Utils/Cookies';
import { useStatusContext } from '@/Utils/Status/statusContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideBar = () => {

    const [mode, setMode] = useState<string>('Info');
    const [controlMode, setControlMode] = useState<string>('users');
    const {isLoggedIn} = useStatusContext();
    const handleMode = (e: React.MouseEvent, mode: string) => {
        e.preventDefault();
        setMode(mode);
    }

    const handleControlMode = (e: any) => {
        const id = e.target.id;
        setControlMode(id);
    }

    const handleLogout = () => {
        Cookie.remove('token');
        Cookie.remove('email');
        Cookie.remove('role');
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('cart');
            window.location.pathname = '/';
        }
    }

    const pathname = usePathname();

  return (
    <aside className='h-screen flex flex-col max-md:justify-center gap-3 bg-slate-200 p-5 w-[400px] rounded-md max-md:text-xs max-md:w-full'>
        <Link href='/Profile' className={`${pathname === '/Profile' ? 'bg-blue-400 text-white': ''} flex items-center max-md:justify-center p-2 rounded-md duration-300`}>
        <FontAwesomeIcon className={`mr-3 ${pathname === '/Profile' ? 'text-white' : 'text-black' } text-xl`} icon={faCircleInfo} />    
        Info</Link>
        <Link href='/Profile/my-orders' className={`${pathname === '/Profile/my-orders' ? 'bg-blue-400 text-white': ''} flex items-center max-md:justify-center p-2 rounded-md duration-300`}>
        <FontAwesomeIcon className={`mr-3 ${pathname === '/Profile/my-orders' ? 'text-white' : 'text-black' } text-xl`} icon={faShoppingBasket} />    
        My orders</Link>
        { (ROLE === userRoles.MANAGER || ROLE === userRoles.ADMIN) &&
        <Link href='/Profile/dashboard' className={`flex items-center max-md:justify-center p-2 rounded-md text-black duration-300`}>
        <FontAwesomeIcon className='mr-3 text-black text-xl' icon={faGear} />    
        Dashboard</Link>
        }
        <button className='w-full flex items-center max-md:justify-center p-2 rounded-md hover:bg-red-600 hover:text-white duration-300'
            onClick={handleLogout}
        >
            <FontAwesomeIcon className='mr-3 text-xl hover:text-white' icon={faRightFromBracket} />    
        Logout</button>
    </aside>
  )
}

export default SideBar