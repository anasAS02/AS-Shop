'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_CATEGORIES_PRODUCTS, GET_PRODUCTS } from '@/Utils/Apis';
import { ProductCard, ProductData } from '@/Components/Products/Product/ProductCard';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faBars, faBarsStaggered, faCircleXmark, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { CategoryData, getCategories } from '@/Utils/Products/getCategories';
import { calcPrice } from '@/Utils/Products/calcPrice';

export default function Category ({params}: any) {
  const categoryParam = params.category;
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>();

  const [from, setFrom] = useState<number | undefined>(undefined);
  const [to, setTo] = useState<number | undefined>(undefined);
  const [sortLowest, setSortLowest] = useState<string | null>(null);
  const [sortHighest, setSortHighest] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(categoryParam === 'All-Products' ? GET_PRODUCTS : GET_CATEGORIES_PRODUCTS + categoryParam, {
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
    fetchProducts();
    getCategories().then((data) => setCategories(data));
    document.title = categoryParam;
    categories
  }, [sortLowest, sortHighest, categoryParam, categories, from, to])

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
  }
  
  return (
    <div className='p-16 max-md:p-4 flex items-start gap-10 min-h-screen max-md:flex-col'>
      <aside className='flex flex-col gap-5 max-md:w-full'>
        <span className='flex items-center gap-12 mb-2'>Category 
          <FontAwesomeIcon onClick={handleCategories} icon={openCategories ? faAngleUp : faAngleDown} className='text-green-400 w-[18px] h-[18px] cursor-pointer ml-auto' />
          </span>
          <span className={openCategories ? '' : 'hidden'}>
            <Link href='/Categories/All-Products' className={`flex items-center gap-5 mb-2 ${categoryParam === 'All-Products' ? 'text-green-400' : 'text-gray-400'}`}>
              <p>All Products</p>
              <span className={`p-2 border-2 rounded-full ml-auto ${categoryParam === 'All-Products' ? 'bg-green-400 border-green-400' : 'bg-white border-gray-400'}`}></span>
            </Link>
            {categories?.map((category: CategoryData) => (
              <Link href={`/Categories/${category.href}`} key={category._id} className={`flex items-center gap-5 mb-2 ${categoryParam === category.href ? 'text-green-400' : 'text-gray-400'}`}>
                <p>{category.title}</p>
                <span className={`p-2 border-2 rounded-full ml-auto ${category.href === categoryParam ? 'bg-green-400 border-green-400' : 'bg-white border-gray-400'}`}></span>
            </Link>
          ))}
        </span>
        <span className='flex flex-col items-center gap-5 mb-2'>
          <p className='mr-auto'>Price</p>
          <span className='flex items-center gap-2'>
            <input type='number' placeholder='from' onChange={(e) => setFrom(Number(e.target.value))} className='border-none outline-none bg-gray-300 placeholder:text-slate-700 p-2 rounded-md w-20' />
            <input type='number' placeholder='to' onChange={(e) => setTo(Number(e.target.value))} className='border-none outline-none bg-gray-300 placeholder:text-slate-700 p-2 rounded-md w-20' />
          </span>
        </span>
      </aside>
      <section className='flex w-full md:flex flex-col gap-12 justify-between'>
          <div className='flex items-center gap-10 justify-between'>
          <span className='flex items-center gap-5'>
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
            <ProductCard style={grid ? true : false}
              key={product._id}
              _id={product._id}
              quantity={1}
              images={product.images}
              description={product.description} 
              category={product.category} 
              thumbnail={product.thumbnail} 
              title={product.title} 
              price={product.price} 
              brand={product.brand} 
              discountPercentage={product.discountPercentage} 
              total={calcPrice(product.price, product.discountPercentage || 0)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
