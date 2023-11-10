'use client'
import { useState } from 'react';
const Login = () => {
    interface formData {
        email: string;
        password: string;
    }

    const [form, setForm] = useState<formData> ({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleAuth = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(form)
    }

  return (
    <div className='h-screen flex justify-center relative'>
        <div className='w-2/4 max-md:w-3/4 h-fit absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 bg-green-400 rounded-md flex flex-col items-center gap-5 p-14'>
            <input type='text' name='email' placeholder='your email' value={form.email} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='password' name='password' placeholder='your password' value={form.password} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <button onClick={(e) => handleAuth(e)} className='p-3 bg-white text-black hover:text-green-400 duration-200 rounded-md'>Login</button>
        </div>
    </div>
  )
}

export default Login;