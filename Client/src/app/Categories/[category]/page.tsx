'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_CATEGORY, GET_PRODUCTS } from '@/Utils/Apis';
import { ProductCard, ProductData } from '@/Components/Products/Product/ProductCard';
import { links } from '@/Components/Navbar/data';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faBars, faBarsStaggered, faCircleXmark, faTableCells } from "@fortawesome/free-solid-svg-icons";



export default function Category ({params}: any) {
  const category = params.category;
  const [products, setProducts] = useState<ProductData[]>([]);

  const [from, setFrom] = useState<number | undefined>(undefined);
  const [to, setTo] = useState<number | undefined>(undefined);
  const [sortLowest, setSortLowest] = useState<string | null>(null);
  const [sortHighest, setSortHighest] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(category === 'AllProducts' ? GET_PRODUCTS : GET_CATEGORY + category, {
        params: {
          lowestPrice: from,
          highestPrice: to,
          sortByLowestPrice: sortLowest,
          sortByHighestPrice: sortHighest,
        },
      });
      const data = res.data.data;
      setProducts(data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    // document.title = category;
  }, [sortLowest, sortHighest])

  const [grid, setGrid] = useState<boolean>(true);

  const handleGrid = (style: string) => {
    if(style === 'grid'){
      setGrid(true);
    }else{
      setGrid(false);
    }
  }

  const [openCategories, setOpenCategories] = useState<boolean>(true);
  const handleCategories = () => {
    setOpenCategories(!openCategories);
  }

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if(value === 'lowest'){
      setSortLowest('0');
      setSortHighest(null);
    }else if(value === 'highest'){
      setSortHighest('0');
      setSortLowest(null);
    }
    fetchProducts();
  }

  const handleFilter = (event: React.MouseEvent) => {
    event.preventDefault();
    fetchProducts();
  }

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [closeFilter, setCloseFilter] = useState<boolean>(true);
  
  const handleOpenFilter = () => {
    setOpenFilter(true);
    setCloseFilter(false);
  }

  const handleCloseFilter = () => {
    setCloseFilter(true);
    setOpenFilter(false);
  }

  return (
    <div className={`p-16 max-md:p-4 flex items-start gap-10 ${products?.length > 0 ? 'h-full' : 'h-screen'}`}>
      <aside className={`${openFilter ? 'flex' : 'hidden'} md:flex flex-col gap-5`}>
        <span className='flex items-center gap-12 mb-2'>Category 
        <span className='flex items-center gap-3 md:ml-auto'>
          <FontAwesomeIcon onClick={handleCategories} icon={openCategories ? faAngleUp : faAngleDown} className='text-green-400 w-[18px] h-[18px] cursor-pointer' />
          <FontAwesomeIcon onClick={handleCloseFilter} icon={faCircleXmark} className='text-red-500 w-[18px] h-[18px] cursor-pointer md:hidden' />
        </span>
          </span>
          <span className={openCategories ? '' : 'hidden'}>
            <Link href='/Categories/AllProducts' className={`flex items-center gap-5 mb-2 ${category === 'AllProducts' ? 'text-green-400' : 'text-gray-400'}`}>
              <p>All Products</p>
              <span className={`p-2 border-2 rounded-full ml-auto ${category === 'AllProducts' ? 'bg-green-400 border-green-400' : 'bg-white border-gray-400'}`}></span>
            </Link>
            {links.map((link) => (
              <Link href={`/Categories/${link.href}`} key={link.id} className={`flex items-center gap-5 mb-2 ${category === link.href ? 'text-green-400' : 'text-gray-400'}`}>
                <p>{link.title}</p>
                <span className={`p-2 border-2 rounded-full ml-auto ${link.href === category ? 'bg-green-400 border-green-400' : 'bg-white border-gray-400'}`}></span>
            </Link>
          ))}
        </span>
        <span className='flex flex-col items-center gap-5 mb-2'>
          <p className='mr-auto'>Price</p>
          <span className='flex items-center gap-2'>
            <input type='number' placeholder='from' onChange={(e) => setFrom(Number(e.target.value))} className='border-none outline-none bg-gray-300 placeholder:text-slate-700 p-2 rounded-md w-20' />
            <input type='number' placeholder='to' onChange={(e) => setTo(Number(e.target.value))} className='border-none outline-none bg-gray-300 placeholder:text-slate-700 p-2 rounded-md w-20' />
          </span>
          <button onClick={(event) => handleFilter(event)} className='p-2 bg-blue-400 duration-300 hover:bg-blue-300 rounded-md text-white'>Filter</button>
        </span>
      </aside>
      <section className={`${openFilter ? 'hidden' : 'flex'} w-full md:flex flex-col gap-12 justify-between`}>
          <div className='flex items-center gap-10 justify-between'>
          <span className='flex items-center gap-5'>
          <FontAwesomeIcon onClick={handleOpenFilter} icon={faBarsStaggered} className={`${openFilter && 'hidden'} md:hidden w-[18px] h-[18px] text-gray-400 cursor-pointer`} />
          <FontAwesomeIcon onClick={() => handleGrid('grid')} icon={faTableCells} className={`w-[18px] h-[18px] ${grid ? 'text-green-400' : 'text-gray-400'} cursor-pointer`} />
          <FontAwesomeIcon onClick={() => handleGrid('')} icon={faBars} className={`w-[18px] h-[18px] ${!grid ? 'text-green-400' : 'text-gray-400'} cursor-pointer`} />
          </span>
          <span className='flex gap-3 items-center relative max-md:text-sm'>
          Sort By: 
          <select className='border-none outline-none' onChange={(event) => handleSort(event)}>
            <option value='lowest'>Lowest Price</option>
            <option value='highest'>Highest Price</option>
          </select>
          </span>
        </div>
        <div className={`gap-5 ${grid ? 'grid items-center grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1' : 'flex flex-col items-start justify-start'}`}>
          {products?.map((product: ProductData) => (
            <ProductCard style={grid ? true : false} key={product._id} _id={product._id} category={product.category} thumbnail={product.thumbnail} title={product.title} price={product.price} brand={product.brand} discountPercentage={product.discountPercentage} />
          ))}
        </div>
      </section>
    </div>
  )
}
