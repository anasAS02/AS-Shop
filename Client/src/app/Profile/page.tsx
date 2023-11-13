'use client'
import { faCircleInfo, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import Info from './Info';
import axios from 'axios';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { GET_USERS } from '@/Utils/Apis';
import { config } from '@/Utils/Auth/handleAuth';

const Profile = () => {
    const [mode, setMode] = useState<string>('Info');
    const [controlMode, setControlMode] = useState<string>('users');
    interface users{
        name: string;
        email: string;
        role: string;
    }
    const [managers, setManagers] = useState<users[]>();
    const [admins, setAdmins] = useState<users[]>();
    const [users, setUsers] = useState<users[]>();

    const handleMode = (e: React.MouseEvent, mode: string) => {
        e.preventDefault();
        setMode(mode);
    }

    const handleLogout = () => {
        Cookie.remove('token');
        Cookie.remove('email');
        Cookie.remove('role');
        window.location.pathname = '/';
    }

    const handleControlMode = (e: any) => {
        const id = e.target.id;
        setControlMode(id);
        console.log(id)
    }

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
    <div className='h-screen flex items-start gap-10 p-10'>
        <aside className='flex flex-col gap-5 bg-slate-300 h-fit p-5 rounded-md'>
            <button className={`${mode === 'Info' ? 'bg-blue-500': 'bg-blue-600 hover:bg-blue-500'} flex items-center p-2 rounded-md text-white duration-300`} onClick={(e) => handleMode(e, 'Info')}>
            <FontAwesomeIcon className='mr-3 text-white' icon={faCircleInfo} />    
            Info</button>
            <button className={`${mode === 'Dashboard' ? 'bg-blue-500': 'bg-blue-600 hover:bg-blue-500'} flex items-center p-2 rounded-md text-white duration-300`} onClick={(e) => handleMode(e, 'Dashboard')}>
            <FontAwesomeIcon className='mr-3 text-white' icon={faGear} />    
            Dashboard</button>
            <button className='p-2 rounded-md text-white bg-red-600 hover:bg-red-500 duration-300' onClick={handleLogout}>Logout</button>
        </aside>
        <section className='w-full flex flex-col gap-5 p-5 rounded-md'>
        { mode === 'Info' &&
            <Info />
        }
        {mode === 'Dashboard' &&
            <div className='w-full flex flex-col items-center justify-center'>
                <nav className='flex items-center gap-2'>
                    <button id='users' onClick={(e) => handleControlMode(e)} className={`bg-transparent duration-200 ${controlMode === 'users' ? 'text-yellow-500' : 'text-black'} hover:text-yellow-500`}>Users</button>
                    <button id='management' onClick={(e) => handleControlMode(e)} className={`bg-transparent duration-200 ${controlMode === 'management' ? 'text-yellow-500' : 'text-black'} hover:text-yellow-500`}>Management</button>
                    <button id='categories' onClick={(e) => handleControlMode(e)} className={`bg-transparent duration-200 ${controlMode === 'categories' ? 'text-yellow-500' : 'text-black'} hover:text-yellow-500`}>Categories</button>
                    <button id='produts' onClick={(e) => handleControlMode(e)} className={`bg-transparent duration-200 ${controlMode === 'produts' ? 'text-yellow-500' : 'text-black'} hover:text-yellow-500`}>Produts</button>
                    <button id='orders' onClick={(e) => handleControlMode(e)} className={`bg-transparent duration-200 ${controlMode === 'orders' ? 'text-yellow-500' : 'text-black'} hover:text-yellow-500`}>Orders</button>
                </nav>
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
                    <p style={{color: COLORS[0]}}>Users: {users?.length}</p>
                    <p style={{color: COLORS[1]}}>Admins: {admins?.length}</p>
                    <p style={{color: COLORS[2]}}>Managers: {managers?.length}</p>
                </span>
            </span>
            </div>
        }
        </section>
    </div>
  )
}

export default Profile