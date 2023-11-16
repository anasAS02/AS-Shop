'use client'

import { handleMsg } from "@/Utils/Status/handleStatusMsg";
import { useStatusContext } from '@/Utils/Status/statusContext';
import axios from 'axios';
import { CHANGE_ADDRESS, CHANGE_COUNTRY, CHANGE_NAME, CHANGE_PASSWORD, CHANGE_PHONE_NUMBER, GET_INFO } from '@/Utils/Apis';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { formData, handleChange } from '@/Utils/Auth/handleChange';
import { useState, useEffect } from "react";
import Cookie from 'js-cookie';
import { faCircleInfo, faEdit, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from "@/Utils/Auth/handleAuth";



const Info = () => {
    const email = Cookie.get('email');

    const {successMsg, setSuccessMsg, err, setErr} = useStatusContext();
    const [updateMode, setUpdateMode] = useState<string | null>(null);
    const [info, setInfo] = useState<formData>({
        name: '',
        country: '',
        address: '',
        phoneNumber: '',
        currentPassword: '',
        newPassword: ''
    });

    const getInfo = async () => {
        try{
            await axios.post(GET_INFO, {email}, config)
            .then((data) => setInfo(data.data.data))
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        handleMsg(setInfo, successMsg, err);
        getInfo();
    }, [successMsg, err]);

    const handleUpdateMode = (e: any) => {
        const id = e.target.id;
        setUpdateMode(id);
    }

    const updateUserInfo = async (e: React.MouseEvent, url: string) => {
        e.preventDefault();
        try{
            const res = await axios.put(url, info, config);
            setErr(null);
            setUpdateMode(null);
            setSuccessMsg(res.data.message);
        }catch(err: any){
            setErr(err.response?.data.message);
            console.log(err)
        }
    }

  return (
    <div className='flex items-start gap-5 flex-col'>
        <span className='flex flex-col items-start gap-2'>
            <label>Name</label>
            <span className='flex items-center'>
            <input readOnly={updateMode === 'name' ? false : true} type='text' name='name' onChange={(e) => handleChange(e, info, setInfo)} value={info?.name} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
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
            <select disabled ={updateMode === 'country' ? false : true} name="country" value={info.country} onChange={(e) => handleChange(e, info, setInfo)} className='w- fit bg-slate-300 p-3 rounded-md border-none outline-none mr-2'>
                <option value='United States'>United States</option>
                <option value='Canada'>Canada</option>
            </select>
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
            <input readOnly={updateMode === 'address' ? false : true} type='text' name='address' onChange={(e) => handleChange(e, info, setInfo)} value={info?.address} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
            {updateMode === 'address' ?
            <p onClick={(e) => updateUserInfo(e, CHANGE_ADDRESS)} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
            :
            <FontAwesomeIcon id='address' onClick={(e) => handleUpdateMode(e)} icon={faEdit} className='cursor-pointer text-blue-500 hover:text-blue-400 duration-200' />
            }
            </span>
        </span>
        <span className='flex items-center gap-2'>
            <PhoneInput
                disabled = {updateMode === 'phoneNumber' ? false : true}
                value={info.phoneNumber}
                onChange={(value) => setInfo({ ...info, phoneNumber: value })}
                onlyCountries={['us', 'ca']}
                preserveOrder={['onlyCountries', 'preferredCountries']}
            />
            {updateMode === 'phoneNumber' ?
            <p onClick={(e) => updateUserInfo(e, CHANGE_PHONE_NUMBER)} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
            :
            <FontAwesomeIcon id='phoneNumber' onClick={(e) => handleUpdateMode(e)} icon={faEdit} className='cursor-pointer text-blue-500 hover:text-blue-400 duration-200' />
            }
        </span>
        {updateMode !== 'changePassword' && <p onClick={() => setUpdateMode('changePassword')} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Change Password</p>}
        { updateMode === 'changePassword' &&
        <span className='flex flex-col items-start gap-2'>
            <span className='flex items-start flex-col gap-3'>
            <label>Current Password</label>
            <input type='password' name='currentPassword' onChange={(e) => handleChange(e, info, setInfo)} value={info?.currentPassword} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
            <label>New Password</label>
            <input type='password' name='newPassword' onChange={(e) => handleChange(e, info, setInfo)} value={info?.newPassword} className='text-slate-500 border-none outline-none bg-slate-300 p-2 rounded-md mr-2' />
            <p onClick={(e) => updateUserInfo(e, CHANGE_PASSWORD)} className='text-black text-sm hover:text-yellow-500 duration-200 cursor-pointer'>Save</p>
            </span>
        </span>
        }
    </div>
  )
}

export default Info