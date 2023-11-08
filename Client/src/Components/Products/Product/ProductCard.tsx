import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link";

export interface ProductData{
    style: boolean;
    _id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
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
            <Image src={props.thumbnail} style={{width: '250px', height: '250px'}} width={800} height={800} objectFit="contain" alt={props.title} />
        </Link>
        <span className={`${props.style && 'text-center'} w-full`}>
            <p className='text-sm text-right text-green-600'>{props.category}</p>
            <p className='text-lg'>{props.title}</p>
            <p className='text-sm text-gray-400'>{props.description}</p>
            <p className={`text-lg ${props.discountPercentage && props.discountPercentage > 0 ? 'line-through text-black texr-sm' : ''}`}>${props.price}</p>
            {props.discountPercentage && <span className='text-lg text-red-500'>${calc(props.price, props.discountPercentage).toFixed(2)}</span>}
            {!props.style && 
            <span className='flex justify-end items-center gap-3'>
                <button className='duration-200 p-3 max-md:p-1 hover:bg-blue-400 text-black hover:text-white font-bold  flex items-center gap-2 rounded-md'> 
                <FontAwesomeIcon icon={faCartPlus} className='w-[18px] h-[18px]' />
                Add To Cart</button>
                <FontAwesomeIcon icon={faHeart} className='w-[18px] h-[18px] text-gray-400 cursor-pointer' />
            </span>
            }
        </span>
        {props.style &&
        <span className='flex items-center gap-3'>
        <button className='duration-200 p-3 max-md:p-1 hover:bg-blue-400 text-black hover:text-white font-bold  flex items-center gap-2 rounded-md'> 
        <FontAwesomeIcon icon={faCartPlus} className='w-[18px] h-[18px]' />
        Add To Cart</button>
        <FontAwesomeIcon icon={faHeart} className='w-[18px] h-[18px] text-gray-400 cursor-pointer' />
        </span>
        }
    </span>
  )
}
