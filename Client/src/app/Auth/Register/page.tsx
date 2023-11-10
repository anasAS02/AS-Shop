'use client'
import { REGISTER } from '@/Utils/Apis';
import { handleAuth } from '@/Utils/Auth/handleAuth';
import { useStatusContext } from '@/Utils/statusContext';
import Link from 'next/link';
import { useState } from 'react';
import { SkewLoader } from 'react-spinners';

export interface formData {
    name?: string;
    email: string;
    password: string;
    country?: string;
    address?: string;
}

const Register = () => {
    const {isLoading} = useStatusContext();
    const {successMsg} = useStatusContext();
    const {err} = useStatusContext();

    const [form, setForm] = useState<formData> ({
        name: '',
        email: '',
        password: '',
        country: 'United States',
        address: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...form, country: e.target.value });
    };

  return (
    <div className='h-screen flex justify-center relative'>
        <div className='w-2/4 max-md:w-3/4 h-fit absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 bg-green-400 rounded-md flex flex-col items-center gap-5 p-14'>
            <input type='text' name='name' placeholder='name' value={form.name} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='email' name='email' placeholder='your email' value={form.email} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='password' name='password' placeholder='your password' value={form.password} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='text' name='address' placeholder='your address' value={form.address} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <select name="country" value={form.country} onChange={handleSelectChange} className='w-fit p-3 rounded-md border-none outline-none'>
                <option value='United States'>United States</option>
                <option value='Canada'>Canada</option>
            </select>
            {isLoading ?
                <SkewLoader color="#ffffff" />
                :
                <span className='flex flex-col items-center gap-2'>
                    <button onClick={(e) => handleAuth(e, REGISTER, form)} className='p-3 bg-white text-black hover:text-green-400 duration-200 rounded-md'>Register</button>
                    <p className='text-white max-md:text-sm'>already have an account? <Link href='/Auth/Login' className='text-red-500 duration-200 hover:text-black'>Login</Link></p>
                </span>
            }
            {successMsg && <p className='p-1 bg-white rounded-md text-green-400 text-sm font-bold'>{successMsg}</p> }
            {err && <p className='text-red-500 text-sm font-bold'>{err}</p> }
        </div>
    </div>
  )
}

export default Register;