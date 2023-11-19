'use client'
import { GET_FAVORITES_LIST } from "@/Utils/Apis";
import { useCart } from "@/app/Cart/CartContext";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import { EMAIL } from "@/Utils/Cookies";
import { addToFavoritesList, favProduct } from "@/Utils/Favorites/addToFavList";
import { removeFromFavList } from "@/Utils/Favorites/removeFromFavList";
import { useStatusContext } from "@/Utils/Status/statusContext";
import { calcPrice } from "@/Utils/Products/calcPrice";

export interface ProductData{
    style?: boolean;
    _id: any;
    title: string;
    description: string;
    price: number;
    total: number;
    discountPercentage?: number;
    stock?: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: [string];
    quantity: number;
}

export const ProductCard = (props: ProductData) => {
const {handleAddToCart} = useCart();
const [favourites, setFavorites] = useState<favProduct[]>();
const {isLoggedIn} = useStatusContext();

const favProduct = {
    id: EMAIL+props.description,
    email: EMAIL,
    title: props.title,
    description: props.description,
    price: props.price,
    total: calcPrice(props.price, props.discountPercentage || 0),
    discountPercentage: props.discountPercentage || 0,
    brand: props.brand,
    category: props.category,
    thumbnail: props.thumbnail,
    images: props.images
}

const getFavoritesList = async () => {
    try{
        const res = await axios.post(GET_FAVORITES_LIST, {email: EMAIL});
        const data = await res.data.data;
        setFavorites((prevFavorites) => [...data]);
    }catch(err){
        console.log(err)
    }
}

const isProductFavorited = () => {
    const productId = `${EMAIL}${props.description}`;
    const findProduct = favourites?.find((product) => product.id === productId);
    return findProduct ? true : false;
};

const [cartProduct] = useState<ProductData>({
    _id: props._id,
    title: props.title,
    description: props.description,
    price: props.price,
    discountPercentage: props.discountPercentage || 0,
    total: calcPrice(props.price, props.discountPercentage || 0),
    brand: props.brand,
    category: props.category,
    thumbnail: props.thumbnail,
    images: props.images,
    quantity: 1
})

useEffect(() => {
    if(isLoggedIn){
        getFavoritesList();
    }
}, [favourites, isLoggedIn])

return (
<span key={props._id} className={`w-full p-2 duration-300 border-2 border-transparent rounded-md hover:border-green-400 flex ${props.style && 'flex-col'} gap-6 items-center relative`}>
    <Link href={`/Product/${props._id}`}>
        <Image src={props.thumbnail} className='w-[200px] h-[200px] max-md:w-[100px] max-md:h-[100px]' width={800} height={800} objectFit="contain" alt={props.title} />
    </Link>
    <span className={`${props.style && 'text-center'} w-full`}>
        <p className='text-sm text-right text-green-600'>{props.category}</p>
        <p className='text-lg max-md:text-base'>{props.title}</p>
        <p className='text-sm text-gray-400'><span className='text-yellow-500'>From: </span>{props.brand}</p>
        <p className={`text-lg max-md:text-base ${props.discountPercentage && props.discountPercentage > 0 ? 'line-through text-black texr-sm' : ''}`}>${props.price}</p>
        {props.discountPercentage && <span className='text-lg max-md:text-base text-red-500'>${calcPrice(props.price, props.discountPercentage).toFixed(2)}</span>}
        {!props.style && 
        <span className='flex justify-end items-center gap-3'>
            <button onClick={() => isLoggedIn ? handleAddToCart(cartProduct) : window.location.pathname = '/Auth/Login'} className='duration-200 p-3 max-md:p-1 hover:bg-blue-400 text-black hover:text-white font-bold max-md:text-xs flex items-center gap-2 rounded-md'> 
            <FontAwesomeIcon icon={faCartPlus} className='w-[18px] h-[18px]' />
            Add To Cart</button>
            <FontAwesomeIcon onClick={() => isLoggedIn ? isProductFavorited() ? removeFromFavList(favProduct.id) : addToFavoritesList(favProduct) : window.location.pathname = '/Auth/Login'} icon={faHeart} className={`${isProductFavorited() ? 'text-red-500' : 'text-gray-400'} w-[18px] h-[18px] duration-200 hover:text-red-400 cursor-pointer`} />
        </span>
        }
    </span>
    {props.style &&
    <span className='flex items-center gap-3'>
    <button onClick={() => isLoggedIn ? handleAddToCart(cartProduct) : window.location.pathname = '/Auth/Login'} className='duration-200 p-3 max-md:p-1 hover:bg-blue-400 max-md:text-sm text-black hover:text-white font-bold  flex items-center gap-2 rounded-md'> 
    <FontAwesomeIcon icon={faCartPlus} className='w-[18px] h-[18px]' />
    Add To Cart</button>
    <FontAwesomeIcon onClick={() => isLoggedIn ? isProductFavorited() ? removeFromFavList(favProduct.id) : addToFavoritesList(favProduct) : window.location.pathname = '/Auth/Login'} icon={faHeart} className={`${isProductFavorited() ? 'text-red-500' : 'text-gray-400'} w-[18px] h-[18px] duration-200 hover:text-red-400 cursor-pointer`} />
    </span>
    }
</span>
)
}
