'use client'
import { REGISTER } from '@/Utils/Apis';
import { handleAuth } from '@/Utils/Auth/handleAuth';
import { useStatusContext } from '@/Utils/statusContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SkewLoader } from 'react-spinners';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Swal from 'sweetalert2';
import { formData, handleChange } from '@/Utils/Auth/handleChange';

const Register = () => {
    const {isLoading, setIsLoading} = useStatusContext();
    const {successMsg, setSuccessMsg} = useStatusContext();
    const {err, setErr} = useStatusContext();

    const [form, setForm] = useState<formData> ({
        name: '',
        email: '',
        password: '',
        country: 'us',
        address: '',
        phoneNumber: ''
    })

    const handleMsg = (): void => {
        if(successMsg){
            Swal.fire({
                title: "Done",
                text: successMsg,
                icon: "success"
            })
            setForm({
                name: '',
                email: '',
                password: '',
                country: 'us',
                address: '',
                phoneNumber: ''
            })
        }
        if(err){
            Swal.fire({
                title: "Oops...",
                text: err,
                icon: "error"
            })
        }
    }

    useEffect(() => {
        handleMsg();
    }, [successMsg, err])

  return (
    <div className='h-screen flex justify-center relative'>
        <div className='w-2/4 max-md:w-3/4 h-fit absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 bg-green-400 rounded-md flex flex-col items-center gap-5 p-14'>
            <input type='text' name='name' placeholder='name' value={form.name} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='email' name='email' placeholder='your email' value={form.email} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='password' name='password' placeholder='your password' value={form.password} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='text' name='address' placeholder='your address' value={form.address} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 rounded-md border-none outline-none' />
            <select name="country" value={form.country} onChange={(e) => handleChange(e, form, setForm)} className='w-fit p-3 rounded-md border-none outline-none'>
                <option value='us'>United States</option>
                <option value='ca'>Canada</option>
            </select>
            <PhoneInput
            value={form.phoneNumber}
            country={form.country}
            onChange={(value) => value.length > 10 && setForm({ ...form, phoneNumber: value })}
            onlyCountries={['us', 'ca']}
            preserveOrder={['onlyCountries', 'preferredCountries']}
            />
            {isLoading ?
                <SkewLoader color="#ffffff" />
                :
                <span className='flex flex-col items-center gap-2'>
                    <button onClick={(e) => handleAuth(e, REGISTER, form, setIsLoading, setSuccessMsg, setErr)} className='p-3 bg-white text-black hover:text-green-400 duration-200 rounded-md'>Register</button>
                    <p className='text-white max-md:text-sm'>already have an account? <Link href='/Auth/Login' className='text-red-500 duration-200 hover:text-black'>Login</Link></p>
                </span>
            }
            {/* {err && <p className='p-1 bg-white rounded-md text-red-500 text-sm font-bold'>{err}</p> } */}
        </div>
    </div>
  )
}

export default Register;