'use client'
import { useStatusContext } from '@/Utils/Status/statusContext';
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import { useCart } from './CartContext';
import { ProductData } from '@/Components/Products/Product/ProductCard';
import axios from 'axios';
import { CREATE_ORDER } from '@/Utils/Apis';
import { EMAIL } from '@/Utils/Cookies';
import { config } from '@/Utils/Auth/handleAuth';
import { loadStripe } from '@stripe/stripe-js';

export interface CartProductType {
  _id: any;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  total: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [string];
  quantity: number;
}

const Cart = () => {
  const {isLoggedIn} = useStatusContext();
  const {handleAddToCart, handleDeleteFromCart, handleDecreaseQty} = useCart();
  const [cartProducts, setCartProducts] = useState<ProductData[] | null>();
  const savedCart = typeof window !== 'undefined' && window.localStorage.getItem('cart');
  const cart = savedCart && JSON.parse(savedCart);
  const {cartItems} = useCart();

  const items = cartProducts?.map((item: ProductData) => ({
    title: item.title,
    thumbnail: item.thumbnail,
    quantity: item.quantity,
    totalPrice: item.total
  }));

  const orderId = EMAIL && EMAIL + Date.now();
  
  useEffect(() => {
    const getCartProducts = () => {
      if(typeof window !== 'undefined'){
        if(cart){
          setCartProducts(cart.products);
        }else{
          setCartProducts(null);
        }
      }
    }
    document.title = 'AS-Shop Cart';
    getCartProducts();
  }, [cartItems]);

  const [sessionId, setSessionId] = useState(null);

  const handleCheckout = async () => {
    axios.post(CREATE_ORDER, { items, totalAmount: cart?.totalAmount, email: EMAIL, orderId: orderId }, config)
    .then(async (res) => {
      if (res.status === 200) {
        window.localStorage.clear();
        return res.data;
      } else {
        return Promise.reject(res.data);
      }
    })
    .then(({ url }) => {
        window.location = url;
    })
    .catch((error) => {
        console.error('Error creating Stripe Checkout Session:', error);
    });
      const stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
      if (sessionId) {
        const result = await stripe?.redirectToCheckout({ sessionId });
        console.error('Error redirecting to Stripe Checkout:', result?.error);
    }
};

  return (
    !isLoggedIn ? 
    <div className='h-screen'>
      <h2 className='absolute left-2/4 -translate-x-2/4 -translate-y-2/4 top-2/4 max-md:top-full font-bold text-red-500 text-3xl max-md:text-base flex flex-col items-center'>You must be logged in
        <Link href='/Auth/Login' className='text-base max-md:text-sm text-black hover:text-yellow-500 duration-200'>Login now</Link>
      </h2>
    </div>
    :
    typeof window !== 'undefined' &&
    <div className='min-h-screen w-full md:mb-72 p-10'>
        {!cartProducts ? 
          <h2 className='absolute left-2/4 -translate-x-2/4 -translate-y-2/4 top-2/4 max-md:top-full font-bold text-red-500 text-3xl max-md:text-base flex flex-col items-center'>Your cart is empty
            <Link href='/Categories/All-Products' className='text-base max-md:text-sm text-black hover:text-yellow-500 duration-200'>Shop now</Link>
          </h2>
        :
        <div className='flex justify-around items-start gap-14 max-md:flex-col max-md:justify-center max-md:gap-5'>
          <div className='w-fit max-md:w-full flex flex-col items-start gap-5 max-md:justify-center max-md:items-center'>
            {cartProducts && cartProducts.map((product: ProductData) =>
              <span key={product._id} className='w-full flex items-center max-md:flex-col max-md:justify-center gap-5 p-2 border-2 border-gray-100 rounded-md'>
                <Image width={100} height={100} src={product.thumbnail} alt='' />
                <span className='md:w-[300px] flex flex-col gap-2 items-start max-md:items-center max-md:text-center'>
                  <h2 className='text-xl max-md:text-lg'>{product.title}</h2>
                  <p className='text-gray-400'>${product.total.toFixed(2)}</p>
                </span>
                <span className='flex items-center gap-5 border-2 border-gray-300 rounded-md p-2'>
                  <FontAwesomeIcon icon={faMinus} onClick={() => handleDecreaseQty(product)} className='text-gray-400 cursor-pointer' />
                  {product.quantity}
                  <FontAwesomeIcon icon={faPlus} onClick={() => handleAddToCart(product)} className='text-gray-400 cursor-pointer'/>
                </span>
                <h3 className='text-lg max-md:text-sm'>${(product.total * product.quantity).toFixed(2)}</h3>
                <FontAwesomeIcon icon={faXmark} onClick={() => handleDeleteFromCart(product)} className='cursor-pointer md:ml-auto duration-200 hover:text-red-500'/>
              </span>
            )}
          </div>
          <div className='w-fit max-md:w-full h-fit p-5 ronded-md flex flex-col gap-5 items-center'>
            <h2 className='text-xl max-md:text-lg mr-auto'>Order summary</h2>
            <span className='w-full flex justify-between items-center gap-6 text-gray-500 max-md:text-xs'>
              <p>Total amount</p>
              <p className='ml-auto'>${cart?.totalAmount.toFixed(2)}</p>
            </span>
            <button onClick={handleCheckout} className='outline-none border-none rounded-md p-4 max-md:p-2 duration-300 bg-blue-400 hover:bg-blue-300 text-white text-center'>Checkout</button>
          </div>
        </div>
        }
    </div>
  )
}

export default Cart