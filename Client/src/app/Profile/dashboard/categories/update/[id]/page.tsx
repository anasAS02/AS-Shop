'use client'
import { useStatusContext } from "@/Utils/Status/statusContext";
import { useEffect, useState } from "react";
import { SkewLoader } from 'react-spinners';
import { UPDATE_CATEGORY } from "@/Utils/Apis";
import axios from "axios";
import Image from "next/image";
import { config } from "@/Utils/Auth/handleAuth";
import { CategoryData, getCategories } from "@/Utils/Products/getCategories";
import { handleMsg } from "@/Utils/Status/handleStatusMsg";
import SideBar from "../../../Side bar/SideBar";

const UpdateCategory = (params: {id: any}) => {
    const id = params['params'].id;
    const {isLoading, setIsLoading, successMsg, setSuccessMsg, err, setErr} = useStatusContext();

    const [categoryData, setCategoryData] = useState<CategoryData> ({
        title: '',
        href: '',
    });

    const [categories, setCategories] = useState<CategoryData[]> ();
    const [file, setFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        handleMsg(undefined, successMsg, setSuccessMsg, err, setErr);
        const findCategory = categories?.find((category) => category._id === id);
        if(findCategory){
            setCategoryData({
                title: findCategory.title,
                href: findCategory.href,
            })
    }}, [successMsg, err, setSuccessMsg, setErr]);

    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFile(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCategoryData({...categoryData, [name]: value});
    }

    const handleSubmit = async (e: React.MouseEvent, url: string) => {
        e.preventDefault();

        setIsLoading(true);
        try{            
            const formData = new FormData();
            formData.append('title', categoryData.title);
            formData.append('href', categoryData.href);
            if (file) {
                formData.append('thumbnail', file);
            }
            await axios.put(url, formData, config).then((data) => setSuccessMsg(data.data.message));
            setErr(null);
        }catch(err: any){
            setErr(err.response?.data.message);
            console.log(err);
        }finally{
            setIsLoading(false);
        }
    }

    const showThumbnail = ( file &&
        <div className='flex items-start flex-col gap-2'>
            <span className='flex items-center gap-2'>
                <Image src={URL.createObjectURL(file)} width={100} height={100} alt={file.name} className='rounded-md' />
                <span className='text-base max-md:text-sm text-yellow-500 flex items-start flex-col'>{file.name} <p className='text-sm text-black'>{file.size / 1024 < 900 ? (file.size / 1024).toFixed(2) + ' kb' : (file.size / (1024 * 1024)).toFixed(2) + ' mb'}</p></span>
            </span>
        </div>
    )

  return (
    <div className='flex items-start gap-14'>
        <SideBar />
        <form className='w-full mt-5 h-fit bg-slate-300 rounded-md flex flex-col items-center gap-5 p-14'>
            <input type='text' name='title' placeholder='category title' value={categoryData.title} onChange={handleChange} className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none' />
            <input type='text' name='href' placeholder='category href' value={categoryData.href} onChange={handleChange} className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none' />
            <input id='selectThumbnail' accept="image/*" className='hidden' type='file' onChange={handleFileChange} />
            <button onClick={() => document.getElementById('selectThumbnail')?.click()} className='p-2 max-md:p-1 max-md:text-xs bg-white text-sm text-black hover:text-green-400 duration-200 rounded-md'>Choose img</button>
            {showThumbnail}
            {isLoading ?
                <SkewLoader color="#ffffff" />
                :
                <button type="submit" onClick={(e) => {handleSubmit(e, UPDATE_CATEGORY + id)}} className='p-3 max-md:p-1 max-md:text-xs bg-white text-black hover:text-green-400 duration-200 rounded-md'>Update</button>
            }
        </form>
    </div>
  )
}

export default UpdateCategory