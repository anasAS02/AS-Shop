'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { handleAuth } from '@/Utils/Auth/handleAuth';
import { LOGIN } from '@/Utils/Apis';
import { SkewLoader } from 'react-spinners';
import { useStatusContext } from '@/Utils/Status/statusContext';
import { formData, handleChange } from '@/Utils/Auth/handleChange';
import { handleMsg } from '@/Utils/Status/handleStatusMsg';

const Login = () => {
  const { isLoading, setIsLoading, successMsg, setSuccessMsg, err, setErr } =
    useStatusContext();

  const [form, setForm] = useState<formData>({
    email: '',
    password: '',
  });

  useEffect(() => {
    handleMsg(setForm, successMsg, setSuccessMsg, err, setErr);
  }, [successMsg, err, setSuccessMsg, setErr]);

  return (
    <div className="h-screen flex justify-center relative">
      <div className="w-2/4 max-md:w-3/4 h-fit absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 bg-slate-300 rounded-md flex flex-col items-center gap-5 p-14 max-md:p-20">
        <input
          type="text"
          name="email"
          placeholder="your email"
          value={form.email}
          onChange={(e) => handleChange(e, form, setForm)}
          className="w-fit p-3 rounded-md border-none outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="your password"
          value={form.password}
          onChange={(e) => handleChange(e, form, setForm)}
          className="w-fit p-3 rounded-md border-none outline-none"
        />
        {isLoading ? (
          <SkewLoader color="#ffffff" />
        ) : (
          <span className="flex flex-col items-center gap-2">
            <button
              onClick={(e) =>
                handleAuth(e, LOGIN, form, setIsLoading, setSuccessMsg, setErr)
              }
              className="p-3 bg-white text-black hover:text-green-400 duration-200 rounded-md"
            >
              Login
            </button>
            <p className="text-black max-md:text-sm">
              Don&apos;t have an account? 
              <Link
                href="/Auth/Register"
                className="md:!ml-2 text-red-500 duration-200 hover:text-green-400"
              >
                Register
              </Link>
            </p>
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
