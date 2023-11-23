'use client'
import { faCircleInfo, faGear, faShop, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookie from 'js-cookie';
import { useState } from 'react';
import Info from './Info';
import MyOrders from './MyOrders';
import Users from './Dashboard/Users';
import Management from './Dashboard/Management';
import Categories  from './Dashboard/Categories';
import Products from './Dashboard/Products';
import {userRoles} from '../../../../server/src/utils/userRoles';
import { ROLE } from '@/Utils/Cookies';
import Orders from './Dashboard/Orders';
import { useStatusContext } from '@/Utils/Status/statusContext';

const Profile = () => {
    const [mode, setMode] = useState<string>('Info');
    const [controlMode, setControlMode] = useState<string>('users');
    const isLoggedIn = useStatusContext();
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
    <div className={`${mode === 'Dashboard' && 'h-full'} flex items-start max-md:flex-col max-md:justify-center gap-10 p-10`}>
        <aside className='flex flex-col max-md:justify-center gap-5 bg-slate-300 h-fit p-5 rounded-md max-md:text-xs max-md:w-full'>
            <button className={`${mode === 'Info' ? 'bg-slate-600': 'bg-slate-700 hover:bg-late-600'} flex items-center max-md:justify-center p-2 rounded-md text-white duration-300`} onClick={(e) => handleMode(e, 'Info')}>
            <FontAwesomeIcon className='mr-3 text-white' icon={faCircleInfo} />    
            Info</button>
            <button className={`${mode === 'myOrders' ? 'bg-slate-600': 'bg-slate-700 hover:bg-late-600'} flex items-center max-md:justify-center p-2 rounded-md text-white duration-300`} onClick={(e) => handleMode(e, 'myOrders')}>
            <FontAwesomeIcon className='mr-3 text-white' icon={faShoppingBasket} />    
            My orders</button>
            { (ROLE === userRoles.MANAGER || ROLE === userRoles.ADMIN) &&
            <button className={`${mode === 'Dashboard' ? 'bg-slate-600': 'bg-slate-700 hover:bg-late-600'} flex items-center max-md:justify-center p-2 rounded-md text-white duration-300`} onClick={(e) => handleMode(e, 'Dashboard')}>
            <FontAwesomeIcon className='mr-3 text-white' icon={faGear} />    
            Dashboard</button>
            }
            <button className='p-2 rounded-md text-white bg-red-600 hover:bg-red-500 duration-300' onClick={handleLogout}>Logout</button>
        </aside>
        <section className='w-full flex flex-col gap-5 p-5 rounded-md'>
        { mode === 'Info' &&
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
        }
        </section>
    </div>
    :
    <></>
  )
}

export default Profile