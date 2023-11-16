'use client'
import {useEffect} from 'react';
import Cookies from 'js-cookie';
import Image from "next/image"
import Logo from '@/assets/logo.jpg';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { useStatusContext } from '@/Utils/Status/statusContext';
import axios from 'axios';
import { CHECK_TOKEN } from '@/Utils/Apis';
import Swal from 'sweetalert2';

export const Navbar = () => {
  const token = Cookies.get('token');
  const {isLoggedIn, setIsLoggedIn} = useStatusContext();
  useEffect(() => {
    const checkToken = async () => {
      try{
        if(token){
          const res = await axios.post(CHECK_TOKEN, {token});
          if(res.data.data){
          setIsLoggedIn(true);
        }
      }
      }catch(err: any){
        console.log(err)
        if(!err.response?.data.data){
          Cookies.remove('token');
          Cookies.remove('role');
          Cookies.remove('email');
          setIsLoggedIn(false);
          Swal.fire({
            title: "Session",
            text: "Your session has ended, login again",
            icon: "error"
          });
        }
      }
  }
    checkToken();
  }, [])
  
  return (
    <nav className='w-full flex justify-around items-center gap-14 p-5 max-md:justify-center max-md:flex-col'>
        <Link href='/' className='flex items-center gap-1 text-sm font-bold'>
          <Image src={Logo} width={100} height={100} alt='Logo' />
          AS Shop
        </Link>
        <div className='w-full relative max-md:order-1'>
          <input type='search' placeholder='Search...' className='p-3 w-full border-slata-200 border-2 outline-none' />
          <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute top-2/4 -translate-x-2/4 -translate-y-2/4 right-0 w-[14px] h-[14px] text-slate-300' />
          
        </div>
        <span className='flex items-start gap-10'>
          <div className='flex items-center gap-3'>
            <FontAwesomeIcon icon={faUser} className='w-[18px] h-[18px] text-slate-600' />
            <span className='flex flex-col items-start gap-1 text-sm'>
              <p className='text-gray-500'>Welcome</p>
              <span className='flex items-center gap-2'>
                <Link href={`/${isLoggedIn ? 'Profile' : 'Auth/Login'}`} className='duration-200 hover:text-yellow-500'>{isLoggedIn ? 'Profile' : 'Login'}</Link>
              </span>
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <Link href='/Cart'>
              <FontAwesomeIcon icon={faCartShopping} className='w-[18px] h-[18px] duration-200 text-slate-600 hover:text-green-400' />
            </Link>
            <span className='flex flex-col items-start gap-1 text-sm'>
              <p className='text-gray-500'>Cart</p>
              <p>$0</p>
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <Link href='/Favourite'>
              <FontAwesomeIcon icon={faHeart} className='w-[18px] h-[18px] duration-200 text-slate-600 hover:text-red-500' />
            </Link>
            <span className='flex flex-col items-start gap-1 text-sm'>
              <p className='text-gray-500'>Favourite</p>
              <p>0</p>
            </span>
          </div>
        </span>
    </nav>
  )
}
