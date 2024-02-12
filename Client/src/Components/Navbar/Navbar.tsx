'use client'
import {useEffect, useState} from 'react';
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
import { CHECK_TOKEN, GET_FAVORITES_LIST, GET_PRODUCTS, SHOW_IMG } from '@/Utils/Apis';
import Swal from 'sweetalert2';
import { ProductData } from '../Products/Product/ProductCard';
import Cookies from 'js-cookie';
import { EMAIL, TOKEN } from '@/Utils/Cookies';
import { favProduct } from '@/Utils/Favorites/addToFavList';

export const Navbar = () => {
  
  const {isLoggedIn, setIsLoggedIn} = useStatusContext();
  const [searchKey, setSearchKey] = useState<string>();
  const [searchResult, setSearchResult] = useState<ProductData[]>();
  const [favourites, setFavorites] = useState<favProduct[]>();

  const getFavoritesList = async () => {
      try{
          const res = await axios.post(GET_FAVORITES_LIST, {email: EMAIL});
          const data = await res.data.data;
          setFavorites((prevFavorites) => [...data]);
      }catch(err){
          console.log(err)
      }
  }

  const showDelayAlert = () => {
    setTimeout(() => {
      alert("Please note: Data may take a few seconds to load due to server limitations.");
    }, 3000);
  };
  
  const savedCart = typeof window !== 'undefined' && window.localStorage.getItem('cart');
  const cart = savedCart ? JSON.parse(savedCart) : [];

  useEffect(() => {
    const search = async () => {
      if(searchKey && searchKey.length > 0){
        const res = await axios.get(GET_PRODUCTS, {
          params: {
            search: searchKey
          }
        });
        const data = res.data.data;
        setSearchResult(data);
      }
    }

    if (typeof window !== 'undefined') {
        const savedCart = window.localStorage.getItem('cart');
        const cart = savedCart ? JSON.parse(savedCart) : [];

        if (isLoggedIn) {
            getFavoritesList();
        }
        search();
        const checkToken = async () => {
            try {
                if (TOKEN) {
                    const res = await axios.post(CHECK_TOKEN, { token: TOKEN });
                    if (res.data.data) {
                        setIsLoggedIn(true);
                    }
                }
            } catch (err: any) {
                console.log(err);
                if (!err.response?.data.data) {
                    Swal.fire({
                        title: 'Session',
                        text: 'Your session has ended, login again',
                        icon: 'error',
                    });
                    Cookies.remove('token');
                    Cookies.remove('email');
                    Cookies.remove('role');
                    window.localStorage.removeItem('cart');
                    window.location.pathname = '/';
                }
            }
        };
        checkToken();
    }

    showDelayAlert();
}, [isLoggedIn, searchKey, setIsLoggedIn, cart, favourites]);

  return (
    <nav className='w-full flex justify-around items-center gap-14 p-5 max-md:justify-center max-md:flex-col bg-white '>
        <Link href='/' className='flex items-center gap-1 text-sm font-bold'>
          <Image src={Logo} width={100} height={100} alt='Logo' />
          AS Shop
        </Link>
        <div className='w-full relative max-md:order-1'>
          <input type='search' placeholder='Search...' onChange={(e) => setSearchKey(e.target.value)} className='p-3 w-full border-slate-200 border-2 outline-none' />
          <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute top-2/4 -translate-x-2/4 -translate-y-2/4 right-0 w-[14px] h-[14px] text-slate-300' />
          <span className='max-h-[400px] overflow-y-auto flex flex-col items-start gap-3 bg-slate-200 rounded-md'>
            {searchResult && searchResult.length > 0 && searchKey !== '' && searchResult.map((product: ProductData) => (
              <span key={product._id} className='p-5 flex items-center gap-2'>
                <Image src={product.thumbnail?.startsWith('https://i.dummyjson.com') ? product.thumbnail : SHOW_IMG + product.thumbnail} width={100} height={100} alt={product.title} />
                <Link href={`/Product/${product._id}`} className='duration-200 hover:text-yellow-500'>{product.title}</Link>
                <p className='text-sm text-gray-400'>${product.price}</p>
              </span>
            ))}
          </span>
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
          <div className='flex items-center gap-3 relative'>
            <Link href='/Cart'>
              <FontAwesomeIcon icon={faCartShopping} className='w-[18px] h-[18px] duration-200 text-slate-600 hover:text-green-400' />
              {cart.products && <span className='absolute -left-3 top-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>{cart.products.length}</span>}
            </Link>
            <span className='flex flex-col items-start gap-1 text-sm'>
              <p className='text-gray-500'>Cart</p>
              <p>${cart.products ? cart?.totalAmount?.toFixed(2) : '0'}</p>
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <Link href='/Favorites'>
              <FontAwesomeIcon icon={faHeart} className='w-[18px] h-[18px] duration-200 text-slate-600 hover:text-red-500' />
            </Link>
            <span className='flex flex-col items-start gap-1 text-sm'>
              <p className='text-gray-500'>Favourite</p>
              <p className={`${favourites && favourites.length > 0 ? 'text-red-500' : ''}`}>{favourites ? favourites.length : 0}</p>
            </span>
          </div>
        </span>
    </nav>
  )
}
