'use client'
import { useStatusContext } from "@/Utils/Status/statusContext";
import { useEffect, useState } from "react";
import { SkewLoader } from 'react-spinners';
import { GET_ORDERS, UPDATE_ORDER_STATUS } from "@/Utils/Apis";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { config } from "@/Utils/Auth/handleAuth";
import { handleMsg } from "@/Utils/Status/handleStatusMsg";
import { orders } from "../MyOrders";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
const Orders = () => {
    const {isLoading, setIsLoading, successMsg, setSuccessMsg, err, setErr} = useStatusContext();
    const [orders, setOrders] = useState<orders[]> ();
    const [graphData, setGraphData] = useState<any> ();

    const getOrders = async () => {
        try{
            const res = await axios.get(GET_ORDERS, config);
            const orders = await res.data.data.orders;
            setOrders(orders);
            setGraphData(res.data.data.graphData);
        }catch(err){
            console.log(err)
        }
    }

    const handleUpdateOrder = async(id: any) => {
        setIsLoading(true);
        try{
            const res = await axios.put(UPDATE_ORDER_STATUS + id, null, config);
            handleMsg(undefined, res.data.message, setSuccessMsg, undefined, undefined);
        }catch(err: any){
            handleMsg(undefined, undefined, undefined, err.response.data.message, setErr);
            console.log(err)
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getOrders();
    }, [successMsg, err])

    const totalRevenue = orders?.reduce((acc: any, order) => {
        acc += order.totalAmount;
        return acc.toFixed(2);
    }, 0);

  return (
    <div className='w-full h-screen flex flex-col items-center gap-10'>
        <div className='mt-12 flex items-start gap-10'>
            <span className='p-5 rounded-md bg-slate-300 flex flex-col gap-2'>
                <h2 className='text-2xl max-md:text-sm'>Total revenue</h2>
                <p className='font-bold text-yellow-500'>${totalRevenue}</p>
            </span>
            <ResponsiveContainer width={100} height={350}>
                <BarChart data={graphData}>
                    <XAxis
                        dataKey='name'
                        stroke='#888888'
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        />
                    <YAxis
                        stroke='#888888'
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                        />
                    <Bar dataKey='total' fill='#3498db' radius={[4, 4, 0, 0]} />    
                </BarChart>
            </ResponsiveContainer>
        </div>
        {orders && 
            orders.map((order: orders) => (
                <span className='flex justify-center items-center gap-5 max-md:flex-col max-md:gap-2 max-md:w-full max-md:text-sm duration-200 w-fit p-5 bg-slate-300 hover:bg-slate-200 rounded-md'>
                    <p>{order.email}</p>
                    <span className='flex flex-col gap-1 items-center'>
                        {order.items.map((item) => (
                            <p>{item.title} x{item.quantity}</p>
                        ))}
                    </span>
                    {isLoading 
                    ?
                    <SkewLoader color="#ffffff" />
                    :
                    <p className='flex items-center gap-2'><p>delivered?</p> {order.delivered ? 'Yes' : 'No'} {!order.delivered && <FontAwesomeIcon icon={faCheck} onClick={() => handleUpdateOrder(order._id)} className='duration-200 hover:text-green-400 cursor-pointer' /> }</p>
                    }
                    <p className='text-green-400'>${order.totalAmount.toFixed(2)}</p>
                    <p>{order.createdAt.substring(0, order.createdAt.indexOf('T'))}</p>
                </span>
            ))
        }
    </div>
  )
}

export default Orders