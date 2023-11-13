'use client'

import { GET_USERS } from "@/Utils/Apis";
import { config } from "@/Utils/Auth/handleAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const Users = () => {

    interface users{
        _id: any;
        name: string;
        email: string;
        role: string;
    }
    const [managers, setManagers] = useState<users[]>();
    const [admins, setAdmins] = useState<users[]>();
    const [users, setUsers] = useState<users[]>();

    const getUsers = async () => {
        try{
            await axios.get(GET_USERS, config).then((data) => {setManagers(data.data.data.managers),
            setAdmins(data.data.data.admins),
            setUsers(data.data.data.users)});
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const data = [
        { name: 'Users', value: users?.length },
        { name: 'Admins', value: admins?.length },
        { name: 'Managers', value: managers?.length },
        ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
    
  return (
    <>
        <span className='flex items-center'>
            <PieChart width={400} height={400}>
                <Pie
                data={data}
                cx={120}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
            </PieChart>
            <span className='text-xl'>
                <p style={{color: COLORS[0]}}>Managers: {managers?.length}</p>
                <p style={{color: COLORS[1]}}>Admins: {admins?.length}</p>
                <p style={{color: COLORS[2]}}>Users: {users?.length}</p>
            </span>
        </span>
        <span className='w-full flex flex-col items-center gap-4 p-2 rounded-md bg-slate-300'>
            {managers?.map((manager) => (
                <span key={manager._id} className='flex items-center gap-2 text-zinc-600'>
                    <p>{manager.name}</p>
                    <p>{manager.email}</p>
                    <p className='text-sm p-1 rounded-md bg-slate-200 text-green-500'>{manager.role}</p>
                </span>
            ))}
            {admins?.map((admin) => (
                <span key={admin._id} className='flex items-center gap-2 text-zinc-600'>
                    <p>{admin.name}</p>
                    <p>{admin.email}</p>
                    <p className='text-sm p-1 rounded-md bg-slate-200 text-green-500'>{admin.role}</p>
                </span>
            ))}
            {users?.map((user) => (
                <span key={user._id} className='flex items-center gap-2 text-zinc-600'>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p className='text-sm p-1 rounded-md bg-slate-200 text-green-500'>{user.role}</p>
                </span>
            ))}
        </span>
    </>
  )
}

export default Users