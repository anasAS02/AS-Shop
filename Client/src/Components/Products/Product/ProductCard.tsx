import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link";

export interface ProductData{
    style?: boolean;
    _id?: string;
    title: string;
    description?: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand: string;
    category: string;
    thumbnail: string;
    images?: [string];
}

const calc = (price: number, des: number) => {
    return price - (price * des / 100);
}

export const ProductCard = (props: ProductData) => {
  return (
    <span key={props._id} className={`w-full p-2 duration-300 border-2 border-transparent rounded-md hover:border-green-400 flex ${props.style && 'flex-col'} gap-6 items-center relative`}>
        <Link href={`/products/product/${props._id}`}>
            <Image src={props.thumbnail} className='w-[200px] h-[200px] max-md:w-[100px] max-md:h-[100px]' width={800} height={800} objectFit="contain" alt={props.title} />
        </Link>
        <span className={`${props.style && 'text-center'} w-full`}>
            <p className='text-sm text-right text-green-600'>{props.category}</p>
            <p className='text-lg max-md:text-base'>{props.title}</p>
            <p className='text-sm text-gray-400'><span className='text-yellow-500'>From: </span>{props.brand}</p>
            <p className={`text-lg max-md:text-base ${props.discountPercentage && props.discountPercentage > 0 ? 'line-through text-black texr-sm' : ''}`}>${props.price}</p>
            {props.discountPercentage && <span className='text-lg max-md:text-base text-red-500'>${calc(props.price, props.discountPercentage).toFixed(2)}</span>}
            {!props.style && 
            <span className='flex justify-end items-center gap-3'>
                <button className='duration-200 p-3 max-md:p-1 hover:bg-blue-400 text-black hover:text-white font-bold max-md:text-xs flex items-center gap-2 rounded-md'> 
                <FontAwesomeIcon icon={faCartPlus} className='w-[18px] h-[18px]' />
                Add To Cart</button>
                <FontAwesomeIcon icon={faHeart} className='w-[18px] h-[18px] duration-200 text-gray-400 hover:text-red-500 cursor-pointer' />
            </span>
            }
        </span>
        {props.style &&
        <span className='flex items-center gap-3'>
        <button className='duration-200 p-3 max-md:p-1 hover:bg-blue-400 max-md:text-sm text-black hover:text-white font-bold  flex items-center gap-2 rounded-md'> 
        <FontAwesomeIcon icon={faCartPlus} className='w-[18px] h-[18px]' />
        Add To Cart</button>
        <FontAwesomeIcon icon={faHeart} className='w-[18px] h-[18px] duration-200 text-gray-400 hover:text-red-500 cursor-pointer' />
        </span>
        }
    </span>
  )
}
