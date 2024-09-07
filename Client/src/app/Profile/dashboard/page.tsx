'use client'

import SideBar from './Side bar/SideBar'
import Users from './users/Users'

const page = () => {
  return (
    <div className='w-full min-h-screen flex items-start justify-center'>
        <SideBar />
        <Users />
        {/* <nav className='flex items-center gap-2 max-md:text-xs'>
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
        } */}
    </div>
  )
}

export default page