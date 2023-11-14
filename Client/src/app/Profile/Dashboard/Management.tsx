'use client'

import { formData, handleChange } from "@/Utils/Auth/handleChange"
import { handleMsg } from "@/Utils/Status/handleStatusMsg";
import { useStatusContext } from "@/Utils/Status/statusContext";
import { useEffect, useState } from "react";
import { SkewLoader } from 'react-spinners';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { config } from "@/Utils/Auth/handleAuth";
import { ADD_USER } from "@/Utils/Apis";
import axios from "axios";

const Management = () => {

    const {isLoading, setIsLoading, successMsg, setSuccessMsg, err, setErr} = useStatusContext();

    const [form, setForm] = useState<formData> ({
        name: '',
        email: '',
        password: '',
        country: 'us',
        address: '',
        phoneNumber: '',
        role: 'USER',
        verified: true
    })

    const handleAdd = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const res = await axios.post(ADD_USER, form, config);
            setSuccessMsg(res.data.message);
            setErr(null);
        }catch(err: any){
            setErr(err.response?.data.message);
            console.log(err);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleMsg(setForm, successMsg, err);
    }, [successMsg, err])

  return (
    <div>
        <div className='w-full mt-5 max-md:w-3/4 h-fit bg-green-400 rounded-md flex flex-col items-center gap-5 p-14'>
            <input type='text' name='name' placeholder='name' value={form.name} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='email' name='email' placeholder='your email' value={form.email} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='password' name='password' placeholder='your password' value={form.password} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='text' name='address' placeholder='your address' value={form.address} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 rounded-md border-none outline-none' />
            <select name="country" value={form.country} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 rounded-md border-none outline-none'>
                <option value='us'>United States</option>
                <option value='ca'>Canada</option>
            </select>
            <select name="role" value={form.role} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 rounded-md border-none outline-none'>
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
                <button onClick={(e) => handleAdd(e)} className='p-3 bg-white text-black hover:text-green-400 duration-200 rounded-md'>Add</button>
            }
        </div>
    </div>
  )
}

export default Management