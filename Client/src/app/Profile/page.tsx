'use client'
import { faCircleInfo, faGear, faShop, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookie from 'js-cookie';
import { useState } from 'react';
import Info from './Info/Info';
import MyOrders from './my-orders/page';
import Users from './dashboard/users/Users';
import Management from './dashboard/management/page';
import Categories  from './dashboard/categories/page';
import Products from './dashboard/products/page';
import {userRoles} from '../../../../server/src/utils/userRoles';
import { ROLE } from '@/Utils/Cookies';
import Orders from './dashboard/orders/page';
import { useStatusContext } from '@/Utils/Status/statusContext';
import SideBar from './Side bar/SideBar';
import { usePathname } from 'next/navigation';

const Profile = () => {
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


  return (
    isLoggedIn ?
    <div className={`min-h-screen h-full flex items-start max-md:flex-col max-md:justify-center gap-10`}>
        <SideBar />
        <section className='w-full flex flex-col gap-5 p-5 rounded-md'>
        {/* { mode === 'Info' &&
            <Info />
        }
        { mode === 'myOrders' &&
            <MyOrders />
        }
        {mode === 'Dashboard' &&
            <div className='w-full flex flex-col items-center justify-center'>
                <nav className='flex items-center gap-2 max-md:text-xs'>
                    <button id='users' onClick={(e) => handleControlMode(e)} className={`bg-transparent duration-200 ${controlMode === 'users' ? 'text-yellow-500' : 'text-black'} hover:text-yellow-500`}>Users</button>
                    <button id='management' onClick={(e) => handleControlMode(e)} className={`bg-transparent duration-200 ${controlMode === 'management' ? 'text-yellow-500' : 'text-black'} hover:text-yellow-500`}>Management</button>
                    <button id='categories' onClick={(e) => handleControlMode(e)} className={`bg-transparent duration-200 ${controlMode === 'categories' ? 'text-yellow-500' : 'text-black'} hover:text-yellow-500`}>Categories</button>
                    <button id='products' onClick={(e) => handleControlMode(e)} className={`bg-transparent duration-200 ${controlMode === 'products' ? 'text-yellow-500' : 'text-black'} hover:text-yellow-500`}>Products</button>
                    <button id='orders' onClick={(e) => handleControlMode(e)} className={`bg-transparent duration-200 ${controlMode === 'orders' ? 'text-yellow-500' : 'text-black'} hover:text-yellow-500`}>Orders</button>
                </nav>
            {controlMode === 'users' &&
                <Users />
            }
            {controlMode === 'management' &&
                <Management />
            }
            {controlMode === 'categories' &&
                <Categories />
            }
            {controlMode === 'products' &&
                <Products />
            }
            {controlMode === 'orders' &&
                <Orders />
            }
            </div>
        } */}
        <Info />
        </section>
    </div>
    :
    <div className='h-screen'></div>
  )
}

export default Profile