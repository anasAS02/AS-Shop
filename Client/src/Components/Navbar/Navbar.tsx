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
import { Arrow } from "./Arrow";
import { useStatusContext } from '@/Utils/statusContext';
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
  console.log(isLoggedIn)
  return (
    <nav className='w-full flex items-center gap-14 justify-center max-md:flex-wrap'>
        <Link href='/' className='flex items-center gap-1 text-sm font-bold'>
          <Image src={Logo} width={100} height={100} alt='Logo' />
          Salla Shop
        </Link>
        <div className='relative'>
          <input type='search' placeholder='Search...' className='p-3 w-full border-slata-200 border-2 outline-none' />
          <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute top-2/4 -translate-x-2/4 -translate-y-2/4 right-0 w-[14px] h-[14px] text-slate-300' />
        </div>
        <div className='flex items-center gap-3'>
          <FontAwesomeIcon icon={faUser} className='w-[18px] h-[18px] text-slate-600' />
          <span className='flex flex-col items-start gap-1 text-sm'>
            <p className='text-gray-500'>Welcome</p>
            <span className='flex items-center gap-2'>
              <Link href='/Auth/Login' className='duration-200 hover:text-yellow-500'>Login</Link>
              {/* <Arrow /> */}
            </span>
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <Link href='/cart'>
            <FontAwesomeIcon icon={faCartShopping} className='w-[18px] h-[18px] text-slate-600' />
          </Link>
          <span className='flex flex-col items-start gap-1 text-sm'>
            <p className='text-gray-500'>Cart</p>
            <p>$0</p>
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <Link href='/favourite'>
            <FontAwesomeIcon icon={faHeart} className='w-[18px] h-[18px] text-slate-600' />
          </Link>
          <span className='flex flex-col items-start gap-1 text-sm'>
            <p className='text-gray-500'>Favourite</p>
            <p>0</p>
          </span>
        </div>
    </nav>
  )
}
