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
import UserCard from "../users/UserCard";
import confirmation from "@/Utils/Status/confirmation";
import {ROLE} from '@/Utils/Cookies';
import SideBar from "../Side bar/SideBar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

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
    <div className='flex items-start gap-14'>
        <SideBar />
        <div className='w-full flex flex-col items-center gap-5'>
            <Link href='management/add' className='ml-auto flex items-center gap-2 p-2 rounded-lg bg-blue-400 hover:bg-blue-300 duration-200 text-white mt-2'>
                <p>Add Admin</p>
                <FontAwesomeIcon icon={faAdd} className='text-xl' />
            </Link>
            {managers?.map((manager) => (
                <UserCard key={manager._id} user={manager} handleChangeRole={handleChangeRole} handleRemoveRole={handleRemoveRole} />
                ))}
            {admins?.map((admin) => (
                <UserCard key={admin._id} user={admin} handleChangeRole={handleChangeRole} handleRemoveRole={handleRemoveRole} />
            ))}
        </div>
    </div>
  )
}

export default Management