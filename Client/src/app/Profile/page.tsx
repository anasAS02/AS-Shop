'use client'
import {useEffect} from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { faCircleInfo, faEdit, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookie from 'js-cookie';
import { useState } from 'react';
import { useStatusContext } from '@/Utils/statusContext';
import { formData } from '../Auth/Register/page';
import axios from 'axios';
import { CHANGE_ADDRESS, CHANGE_COUNTRY, CHANGE_NAME, CHANGE_PASSWORD, CHANGE_PHONE_NUMBER, GET_INFO } from '@/Utils/Apis';
import Swal from 'sweetalert2';

const Profile = () => {
    const token = Cookie.get('token');
    const email = Cookie.get('email');

    const [mode, setMode] = useState<string>('Info');
    const [updateMode, setUpdateMode] = useState<string | null>(null);
    const [info, setInfo] = useState<any>({
        name: '',
        email,
        country: '',
        address: '',
        phoneNumber: '',
        currentPassword: '',
        newPassword: ''
    });

    const {err, setErr} = useStatusContext();


    const handleMode = (e: React.MouseEvent, mode: string) => {
        e.preventDefault();
        setMode(mode);
    }

    const handleUpdateMode = (e: any) => {
        const id = e.target.id;
        setUpdateMode(id);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setInfo({...info, [name]: value});
    }

    const handleLogout = () => {
        Cookie.remove('token');
        Cookie.remove('email');
        Cookie.remove('role');
        window.location.pathname = '/';
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            email: email,
        },
    };

    const getInfo = async () => {
        try{
            await axios.post(GET_INFO, {email}, config)
            .then((data) => setInfo(data.data.data))
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        getInfo();
    }, []);

    const updateUserInfo = async (e: React.MouseEvent, url: string) => {
        e.preventDefault();
        try{
            const res = await axios.put(url, info, config);
            setErr(null);
            setUpdateMode(null);
            Swal.fire({
                title: "Done",
                text: res.data.message,
                icon: "success"
            });
            getInfo();
        }catch(err: any){
            Swal.fire({
                title: "Oops...",
                text: err.response?.data.message,
                icon: "error"
            });
            console.log(err)
        }
    }

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
            <div className='flex items-start gap-5 flex-col'>
                <span className='flex flex-col items-start gap-2'>
                    <label>Name</label>
                    <span className='flex items-center'>
                    <input readOnly={updateMode === 'name' ? false : true} type='text' name='name' onChange={handleChange} value={info?.name} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
                    {updateMode === 'name' ?
                    <p onClick={(e) => updateUserInfo(e, CHANGE_NAME)} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
                    :
                    <FontAwesomeIcon id='name' onClick={(e) => handleUpdateMode(e)} icon={faEdit} className='cursor-pointer text-blue-500 hover:text-blue-400 duration-200' />
                    }
                    </span>
                </span>
                <span className='flex flex-col items-start gap-2'>
                    <label>Country</label>
                    <span className='flex items-center'>
                    <input readOnly={updateMode === 'country' ? false : true} type='text' name='country' onChange={handleChange} value={info?.country} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
                    {updateMode === 'country' ?
                    <p onClick={(e) => updateUserInfo(e, CHANGE_COUNTRY)} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
                    :
                    <FontAwesomeIcon id='country' onClick={(e) => handleUpdateMode(e)} icon={faEdit} className='cursor-pointer text-blue-500 hover:text-blue-400 duration-200' />
                    }
                    </span>
                </span>
                <span className='flex flex-col items-start gap-2'>
                    <label>Address</label>
                    <span className='flex items-center'>
                    <input readOnly={updateMode === 'address' ? false : true} type='text' name='address' onChange={handleChange} value={info?.address} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
                    {updateMode === 'address' ?
                    <p onClick={(e) => updateUserInfo(e, CHANGE_ADDRESS)} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
                    :
                    <FontAwesomeIcon id='address' onClick={(e) => handleUpdateMode(e)} icon={faEdit} className='cursor-pointer text-blue-500 hover:text-blue-400 duration-200' />
                    }
                    </span>
                </span>
                <span className='flex flex-col items-start gap-2'>
                    <label>Phone Number</label>
                    <span className='flex items-center'>
                    <input readOnly={updateMode === 'phoneNumber' ? false : true} type='text' name='phoneNumber' onChange={handleChange} value={info?.phoneNumber} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
                    {updateMode === 'phoneNumber' ?
                    <p onClick={(e) => updateUserInfo(e, CHANGE_PHONE_NUMBER)} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
                    :
                    <FontAwesomeIcon id='phoneNumber' onClick={(e) => handleUpdateMode(e)} icon={faEdit} className='cursor-pointer text-blue-500 hover:text-blue-400 duration-200' />
                    }
                    </span>
                </span>
                {updateMode !== 'changePassword' && <p onClick={() => setUpdateMode('changePassword')} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Change Password</p>}
                { updateMode === 'changePassword' &&
                <span className='flex flex-col items-start gap-2'>
                    <span className='flex items-start flex-col gap-3'>
                    <label>Current Password</label>
                    <input type='password' name='currentPassword' onChange={handleChange} value={info?.currentPassword} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
                    <label>New Password</label>
                    <input type='password' name='newPassword' onChange={handleChange} value={info?.newPassword} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
                    <p onClick={(e) => updateUserInfo(e, CHANGE_PASSWORD)} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
                    </span>
                </span>
                }
                {err && <p className='text-red-500 text-sm p-2 bg-black rounded-md'>{err}</p>}
            {/* <PieChart
                series={[
                    {
                    data: [
                        { id: 0, value: 90, color: 'orange',  label: 'Users' },
                        { id: 1, value: 8, label: 'Admins' },
                        { id: 2, value: 2, label: 'Managers' },
                    ],
                    },
                ]}
                width={400}
                height={200}
                /> */}
            </div>
        </section>
    </div>
  )
}

export default Profile