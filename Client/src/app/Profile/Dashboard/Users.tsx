'use client'

import { GET_USERS, REMOVE_ROLE } from "@/Utils/Apis";
import { config } from "@/Utils/Auth/handleAuth";
import { formData } from "@/Utils/Auth/handleChange";
import axios from "axios";
import { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import UserCard from "./UserCard";
import confirmation from "@/Utils/Status/confirmation";

const Users = () => {

    const [managers, setManagers] = useState<formData[]>();
    const [admins, setAdmins] = useState<formData[]>();
    const [users, setUsers] = useState<formData[]>();

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

    const handleChangeRole = async(id: any) => {
        confirmation({ url: REMOVE_ROLE + id, config, successMsg: null, func: getUsers });
    }
    
    const handleRemoveRole = async(id: any) => {
        confirmation({ url: REMOVE_ROLE + id, config, successMsg: null, func: getUsers });
    }
    
  return (
    <>
        <span className='flex items-center justify-center max-md:flex-col'>
            <PieChart width={250} height={400}>
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
        <span className='w-full flex flex-col max-md:justify-center items-center gap-4 p-5'>
            {users?.map((user) => (
               <UserCard key={user._id} user={user} handleChangeRole={handleChangeRole} handleRemoveRole={handleRemoveRole} />
            ))}
        </span>
    </>
  )
}

export default Users