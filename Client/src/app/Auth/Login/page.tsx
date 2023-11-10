'use client'
import Link from 'next/link';
import { useState } from 'react';
import { formData } from '../Register/page';
import { handleAuth } from '@/Utils/Auth/handleAuth';
import { LOGIN } from '@/Utils/Apis';
import { SkewLoader } from 'react-spinners';
import { useStatusContext } from '@/Utils/statusContext';
const Login = () => {
    const {isLoading} = useStatusContext();
    const {successMsg} = useStatusContext();
    const {err} = useStatusContext();

    const [form, setForm] = useState<formData> ({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
  return (
    <div className='h-screen flex justify-center relative'>
        <div className='w-2/4 max-md:w-3/4 h-fit absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 bg-green-400 rounded-md flex flex-col items-center gap-5 p-14'>
            <input type='text' name='email' placeholder='your email' value={form.email} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='password' name='password' placeholder='your password' value={form.password} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            {isLoading ?
            <SkewLoader color="#ffffff" />
            :
            <span className='flex flex-col items-center gap-2'>
                <button onClick={(e) => handleAuth(e, LOGIN, form)} className='p-3 bg-white text-black hover:text-green-400 duration-200 rounded-md'>Login</button>
                <p className='text-white max-md:text-sm'>Don't have an account? <Link href='/Auth/Register' className='text-red-500 duration-200 hover:text-black'>Register</Link></p>
            </span>
            }
            {successMsg && <p className='p-1 bg-white rounded-md text-green-400 text-sm font-bold'>{successMsg}</p> }
            {err && <p className='text-red-500 text-sm font-bold'>{err}</p> }
        </div>
    </div>
  )
}

export default Login;