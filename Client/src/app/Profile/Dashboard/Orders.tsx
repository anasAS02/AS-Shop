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
            getOrders();
        }
    }

    useEffect(() => {
        getOrders();
    }, [successMsg, err])

    const totalRevenue = orders?.reduce((acc: any, order) => {
        acc += order.totalAmount;
        return acc;
    }, 0);

  return (
    <div className='w-full h-screen flex flex-col items-center gap-10'>
        <div className='mt-12 flex items-start gap-10 max-md:w-full'>
            <span className='p-5 rounded-md bg-slate-300 flex flex-col gap-2'>
                <h2 className='text-2xl max-md:text-sm'>Total revenue</h2>
                <p className='font-bold text-yellow-500'>${totalRevenue?.toFixed(2)}</p>
            </span>
            <ResponsiveContainer width="100%" height={350}>
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
            <table className='w-full max-md:w-2/4 max-md:text-xs bg-slate-300 rounded-md text-center'>
                <thead>
                    <tr className='text-slate-600'>
                        <td>Email</td>
                        <td>Items</td>
                        <td>delivered</td>
                        <td>total amount</td>
                        <td>At</td>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order: orders) => (
                        <tr className='text-center max-md:text-xs' key={order._id}>
                            <td>{order.email}</td>
                            <td className='flex flex-col gap-1 items-center'>
                                {order.items.map((item, i) => (
                                    <p key={i}>{item.title} <span className='text-gray-700 font-bold text-sm max-md:font-normal max-md:text-xs'>x{item.quantity}</span></p>
                                ))}
                            </td>
                            <td>
                            {isLoading 
                            ?
                            <SkewLoader color="#ffffff" />
                            :
                            <p>
                                {order.delivered ? 'Yes' : 'No'}
                                {!order.delivered && <FontAwesomeIcon icon={faCheck} onClick={() => handleUpdateOrder(order._id)} className='duration-200 hover:text-green-400 cursor-pointer' />}
                            </p>
                            }
                            </td>
                            <td>${order.totalAmount.toFixed(2)}</td>
                            <td>{order.createdAt.substring(0, order.createdAt.indexOf('T'))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>    
        }
    </div>
  )
}

export default Orders