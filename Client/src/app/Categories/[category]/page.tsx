'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_CATEGORY } from '@/Utils/Apis';
import { ProductCard, ProductData } from '@/Components/Products/Product/ProductCart';
import { links } from '@/Components/Navbar/data';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faBars, faTableCells } from "@fortawesome/free-solid-svg-icons";

// export async function generateMetedata({params}: any){
//   const category = params.category;
//   return{
//     title: category,
//     description: `Salla Shop | ${category}`
//   }
// }

export default function Category ({params}: any) {
  const category = params.category;
  const [products, setProducts] = useState<ProductData[]>([]);

  const config = {
    category,
    sortByHighestPrice: 0
  }

  useEffect(() => {
    document.title = category;
    const fetchProducts = async() => {
      const res = await axios.get(GET_CATEGORY + category);
      const data = res.data.data;
      setProducts(data);
    }
    fetchProducts();
  }, [category])

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

    const [openSort, setOpenSort] = useState<boolean>(false);
    const handleSort = () => {
      setOpenSort(!openSort);
    }

  return (
    <div className='p-16 flex items-start gap-10 h-full'>
      <aside className='flex flex-col gap-5 '>
        <span className='flex items-center gap-12 mb-2'>Category 
          <FontAwesomeIcon onClick={handleCategories} icon={openCategories ? faAngleUp : faAngleDown} className='text-green-400 w-[18px] h-[18px] cursor-pointer ml-auto' />
          </span>
          <span className={openCategories ? '' : 'hidden'}>
            {links.map((link) => (
              <Link href={`/Categories/${link.href}`} key={link.id} className={`flex items-center gap-5 mb-2 ${category === link.href ? 'text-green-400' : 'text-gray-400'}`}>
                <p>{link.title}</p>
                <span className={`p-2 border-2 rounded-full ml-auto ${link.href === category ? 'bg-green-400 border-green-400' : 'bg-white border-gray-400'}`}></span>
            </Link>
          ))}
        </span>
      </aside>
      <section className='flex flex-col gap-12 justify-center'>
          <div className='flex items-center justify-between'>
          <span className='flex items-center gap-5'>
          <FontAwesomeIcon onClick={() => handleGrid('grid')} icon={faTableCells} className={`w-[18px] h-[18px] ${grid ? 'text-green-400' : 'text-gray-400'} cursor-pointer`} />
          <FontAwesomeIcon onClick={() => handleGrid('')} icon={faBars} className={`w-[18px] h-[18px] ${!grid ? 'text-green-400' : 'text-gray-400'} cursor-pointer`} />
          </span>
          <span className='flex gap-2 items-center relative'>
          Sort By: 
          <span className='flex items-center justify-between text-green-400'>Lowest Price <FontAwesomeIcon onClick={handleSort} icon={openSort ? faAngleUp : faAngleDown} className='w-[18px] h-[18px] cursor-pointer' /></span>
          <span className={`absolute left-16 -bottom-16 p-2 rounded-md text-center text-white duration-300 bg-green-400 hover:bg-green-300 cursor-pointer ${openSort ? '' : 'hidden'}`}>Highest Price</span>
          </span>
        </div>
        <div className={`gap-5 ${grid ? 'grid items-center grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1' : 'flex flex-col items-start justify-start'}`}>
          {products?.map((product: ProductData) => (
            <ProductCard style={grid ? true : false} key={product._id} _id={product._id} category={product.category} thumbnail={product.thumbnail} title={product.title} price={product.price} description={product.description} discountPercentage={product.discountPercentage} />
          ))}
        </div>
      </section>
    </div>
  )
}
