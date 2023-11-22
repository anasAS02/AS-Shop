'use client'

import { ProductCard, ProductData } from '@/Components/Products/Product/ProductCard';
import { GET_PRODUCT } from '@/Utils/Apis';
import { faBagShopping, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCart } from '@/app/Cart/CartContext'; 
import { useStatusContext } from '@/Utils/Status/statusContext';
import { getCategory } from '@/Utils/Products/getCategory';
import { calcPrice } from '@/Utils/Products/calcPrice';

const ProductComp = (props: {productId: any}) => {
    const productId = props.productId;
    const [products, setProducts] = useState<ProductData[]>();
    const [product, setProduct] = useState<ProductData>();
    const [imgs, setImgs] = useState<[string]>();
    const [imgIndex, setImgIndes] = useState<number>(0);
    const [about, setAbout] = useState<boolean>(true);
    const [brand, setBrand] = useState<boolean>(false);
    const {handleAddToCart, cartItems} = useCart();
    const {isLoggedIn} = useStatusContext();

    const handleAbout = () => {
        setAbout(true);
        setBrand(false);
    }

    const handleBrand = () => {
        setBrand(true);
        setAbout(false);
    }

    const getProduct = async() => {
        try{
            const res = await axios.get(GET_PRODUCT + productId);
            const data = await res.data.data[0];
            setProduct({...data, quantity: 1, total: calcPrice(data.price, data.discountPercentage || 0)});
            setImgs(data.images);
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(() => {
        getProduct();
        if(product){
            getCategory(product.category).then((data) => setProducts(data?.data.data));
        }
    }, [cartItems, product])

return(
    product && imgs &&
    <div className='h-full p-10 flex flex-col gap-10'>
        <div className='flex max-md:flex-col items-center max-md:items-start gap-10'>
            <span className='flex max-md:flex-col-reverse items-center gap-5'>
                <span className='flex md:flex-col items-start gap-2 max-md:flex-wrap'>
                    {imgs.map((img: string, index: number) => (
                        <Image onClick={() => setImgIndes(index)} key={index} src={img} width={130} height={170} alt={product.title} className={`${index === imgIndex ? 'opacity-100' : 'opacity-60'} rounded-md cursor-pointer duration-200 hover:opacity-100`} />
                    ))}
                </span>
                <Image src={imgs[imgIndex]} width={600} height={600} alt={product.title} className='rounded-md' />
            </span>
            <span className='flex flex-col items-start gap-2'>
                <h3 className='text-2xl max-md:text-base'>{product.title}</h3>
                <span className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faBagShopping} className='text-green-400' />
                    <p>From: <span className='text-green-400'>{product.brand}</span></p>
                </span>
                <p>{product.description}</p>
                {product.discountPercentage && product.discountPercentage > 0 && <p className='text-red-500'>{product.discountPercentage}% off</p>}
                <span className='flex gap-5 items-center'>
                    <button onClick={() => isLoggedIn ? handleAddToCart(product) : window.location.pathname = '/Auth/Login'} className='duration-200 p-3 max-md:p-1 hover:bg-blue-400 text-black hover:text-white font-bold max-md:text-xs flex items-center gap-2 rounded-md'> 
                    <FontAwesomeIcon icon={faCartPlus} />
                    Add To Cart</button>
                    <p className='text-green-400 font-bold text-lg'>${product.total}</p>
                </span>
            </span>
        </div>
        <div className='flex items-start flex-col gap-10'>
            <span className='flex items-center gap-5'>
                <button onClick={handleAbout} className={`${about ? 'bg-green-400 text-white' : 'bg-slate-300'} duration-200 hover:bg-green-300 p-3 rounded-md`}>About</button>
                <button onClick={handleBrand} className={`${brand ? 'bg-green-400 text-white' : 'bg-slate-300'} duration-200 hover:bg-green-300 p-3 rounded-md`}>Brand</button>
            </span>
            {about && <p className='p-5 rounded-md bg-slate-300 border-l-2 border-green-400 w-fit'>{product.description}</p>}
            {brand && <p className='p-5 rounded-md bg-slate-300 border-l-2 border-green-400 w-fit'>{product.brand}</p>}
        </div>
        <div className='flex items-start flex-col gap-10'>
            <h2 className='text-2xl max-md:text-base'>Similar products</h2>
            {products &&
            <span className='flex flex-wrap items-center gap-5'>
                {products.map((product: ProductData) => (
                    <ProductCard key={product._id} _id={product._id} category={product.category} description={product.description} brand={product.brand} images={product.images} thumbnail={product.thumbnail} price={product.price} quantity={1} discountPercentage={product.discountPercentage} title={product.title} total={calcPrice(product.price, product.discountPercentage || 0)} /> 
                ))}
            </span>
            }
        </div>
    </div>
  )
}

export default ProductComp;