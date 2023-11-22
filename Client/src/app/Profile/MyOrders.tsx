'use client'
import { GET_MY_ORDERS } from '@/Utils/Apis';
import { config } from '@/Utils/Auth/handleAuth';
import { EMAIL } from '@/Utils/Cookies';
import { faCheck, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface orders {
    _id: any;
    email: string;
    items: { title: string, thumbnail: string , totalPrice: number, quantity: number}[];
    totalAmount: number;
    delivered: boolean;
    createdAt: string;
}

const MyOrders = () => {
    const [orders, setOrders] = useState<orders[]>();

    const getOrders = async () => {
        try{
            const res = await axios.post(GET_MY_ORDERS, {email: EMAIL}, config);
            const orders = await res.data.data.orders;
            setOrders(orders);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getOrders();
    }, [])

  return (
    <div className='w-full h-full flex items-start gap-5 flex-co p-5'>
        {orders && orders.map((order: orders) => (
        <div className='flex flex-col items-start gap-5 max-md:items-center'>
            <span className='flex gap-5 items-center'>
                <h2 className='text-2xl max-md:text-base'>{order.delivered ? 'On the way' : 'Delivered'}</h2>
                <FontAwesomeIcon icon={order.delivered ? faTruck : faCheck} className='animate-pulse' />
            </span>
            {order.items.map((item) => (
                <span className='flex items-center gap-5 max-md:flex-col max-md:justify-center'>
                    <Image src={item.thumbnail} width={200} height={200} alt='as' />
                    <span className='flex flex-col items-start gap-2 max-md:items-center'>
                        <h2>{item.title} <span className='text-gray-400 font-bold text-base max-md:text-sm'>x{item.quantity}</span></h2>
                        <p className='text-green-400 font-bold'>${item.totalPrice.toFixed(2)}</p>
                    </span>
                </span>
            ))}
            <p className='text-green-400 font-bold text-base max-md:text-sm'><span className='text-black'>Total:</span> ${order.totalAmount.toFixed(2)}</p>
            <p className='text-gray-400 text-base max-md:text-sm font-bold'>{order.createdAt.substring(0, order.createdAt.indexOf('T'))}</p>
        </div> 
    ))}
    </div>
  )
}

export default MyOrders