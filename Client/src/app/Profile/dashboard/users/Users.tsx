'use client'

import { GET_USERS } from "@/Utils/Apis";
import { config } from "@/Utils/Auth/handleAuth";
import { formData } from "@/Utils/Auth/handleChange";
import axios from "axios";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from 'recharts';
import UserCard from "./UserCard";
import { handleMsg } from "@/Utils/Status/handleStatusMsg";
import { useStatusContext } from "@/Utils/Status/statusContext";

const Users = () => {

    const [managers, setManagers] = useState<formData[]>();
    const [admins, setAdmins] = useState<formData[]>();
    const [users, setUsers] = useState<formData[]>();
    const {successMsg, err} = useStatusContext();

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
        handleMsg(undefined, successMsg, undefined, err, undefined);
        getUsers();
    }, [successMsg, err]);

    const data = [
        { name: 'Users', value: users?.length },
        { name: 'Admins', value: admins?.length },
        { name: 'Managers', value: managers?.length },
        ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
    
  return (
    <div className='w-full flex flex-col justify-center items-center gap-10'>
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
               <UserCard key={user._id} user={user} />
            ))}
        </span>
    </div>
  )
}

export default Users