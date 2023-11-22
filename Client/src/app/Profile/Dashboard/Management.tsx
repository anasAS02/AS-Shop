'use client'

import { formData, handleChange } from "@/Utils/Auth/handleChange"
import { handleMsg } from "@/Utils/Status/handleStatusMsg";
import { useStatusContext } from "@/Utils/Status/statusContext";
import { useEffect, useState } from "react";
import { SkewLoader } from 'react-spinners';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { config } from "@/Utils/Auth/handleAuth";
import { ADD_USER, CHANGE_ROLE, GET_USERS, REMOVE_ROLE } from "@/Utils/Apis";
import axios from "axios";
import UserCard from "./UserCard";
import confirmation from "@/Utils/Status/confirmation";
import {ROLE} from '@/Utils/Cookies';

const Management = () => {
    const {isLoading, setIsLoading, successMsg, setSuccessMsg, err, setErr} = useStatusContext();

    const [form, setForm] = useState<formData> ({
        name: '',
        email: '',
        password: '',
        country: 'us',
        address: '',
        phoneNumber: '',
    })

    const [managers, setManagers] = useState<formData[]>();
    const [admins, setAdmins] = useState<formData[]>();

    const getUsers = async () => {
        try{
            await axios.get(GET_USERS, config).then((data) => {setManagers(data.data.data.managers),
            setAdmins(data.data.data.admins)});
        }catch(err){
            console.log(err);
        }
    }

    const handleAdd = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const res = await axios.post(ADD_USER, form, config);
            setSuccessMsg(res.data.message);
            setErr(null);
            getUsers();
        }catch(err: any){
            setErr(err.response?.data.message);
            console.log(err);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
        handleMsg(setForm, successMsg, setSuccessMsg, err, setErr);
    }, [successMsg, err, setSuccessMsg, setErr]);

    const handleChangeRole = async(id: any, role: string) => {
        try{
            const res = await axios.put(CHANGE_ROLE, {id, ROLE}, config);
            setSuccessMsg(res.data.message);
        }catch(err: any){
            setErr(err.response?.data.message);
            console.log(err);
        }
    }
    
    const handleRemoveRole = async(id: any) => {
        confirmation({ url: REMOVE_ROLE, data: {id, ROLE}, config, successMsg: null, func: getUsers });
    }

  return (
    <div className='w-full flex flex-col items-center gap-5'>
        <div className='mt-5 w-full h-fit bg-slate-300 rounded-md flex flex-col items-center gap-5 p-14'>
            <input type='text' name='name' placeholder='name' value={form.name} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 max-md:p-1 rounded-md border-none outline-none' />
            <input type='email' name='email' placeholder='your email' value={form.email} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 max-md:p-1 rounded-md border-none outline-none' />
            <input type='password' name='password' placeholder='your password' value={form.password} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 max-md:p-1 rounded-md border-none outline-none' />
            <input type='text' name='address' placeholder='your address' value={form.address} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 max-md:p-1 rounded-md border-none outline-none' />
            <select name="country" value={form.country} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 max-md:p-1 rounded-md border-none outline-none'>
                <option value='us'>United States</option>
                <option value='ca'>Canada</option>
            </select>
            <select name="role" value={form.role} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 max-md:p-1 rounded-md border-none outline-none'>
                <option value='MANAGER'>Manager</option>
                <option value='ADMIN'>Admin</option>
                <option value='USER'>User</option>
            </select>
            <PhoneInput
            value={form.phoneNumber}
            onChange={(value) => setForm({ ...form, phoneNumber: value })}
            onlyCountries={['us', 'ca']}
            preserveOrder={['onlyCountries', 'preferredCountries']}
            />
            {isLoading ?
                <SkewLoader color="#ffffff" />
                :
                <button onClick={(e) => handleAdd(e)} className='p-3 max-md:p-1 max-md:text-sm bg-white text-black hover:text-green-400 duration-200 rounded-md'>Add</button>
            }
        </div>
        {managers?.map((manager) => (
               <UserCard key={manager._id} user={manager} handleChangeRole={handleChangeRole} handleRemoveRole={handleRemoveRole} />
            ))}
        {admins?.map((admin) => (
            <UserCard key={admin._id} user={admin} handleChangeRole={handleChangeRole} handleRemoveRole={handleRemoveRole} />
        ))}
    </div>
  )
}

export default Management