'use client'
import { useStatusContext } from "@/Utils/Status/statusContext";
import { useEffect, useState } from "react";
import { SkewLoader } from 'react-spinners';
import { ADD_CATEGORY, DELETE_CATEGORY, SHOW_IMG, UPDATE_CATEGORY } from "@/Utils/Apis";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { config } from "@/Utils/Auth/handleAuth";
import { CategoryData, getCategories } from "@/Utils/Products/getCategories";
import confirmation from "@/Utils/Status/confirmation";
import { handleMsg } from "@/Utils/Status/handleStatusMsg";

const Categories = () => {
    const {isLoading, setIsLoading, successMsg, setSuccessMsg, err, setErr} = useStatusContext();

    const [categoryData, setCategoryData] = useState<CategoryData> ({
        title: '',
        href: '',
    });

    const [updateMode, setUpdateMode] = useState<boolean> (false);
    const [categoryId, setCategoryId] = useState<any> (null);
    const [categories, setCategories] = useState<CategoryData[]> ();
    const [file, setFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        handleMsg(undefined, successMsg, setSuccessMsg, err, setErr);
        getCategories().then((data) => setCategories(data));
        setCategoryData({
            title: '',
            href: ''
        })
    }, [successMsg, err, setSuccessMsg, setErr]);

    
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
            if(updateMode){
                await axios.put(url, formData, config).then((data) => setSuccessMsg(data.data.message));
                setUpdateMode(false);
                setCategoryId(null);
            }else{
                await axios.post(url, formData, config).then((data) => setSuccessMsg(data.data.message));
            }
            setCategoryData({
                title: '',
                href: ''
            });
            setFile(undefined);
            setErr(null);
            getCategories().then((data) => setCategories(data));
        }catch(err: any){
            setErr(err.response?.data.message);
            console.log(err);
        }finally{
            setIsLoading(false);
        }
    }

    const handleUpdate = async (id: any) => {
        setUpdateMode(true)
        scrollTo(0, 0);
        const findCategory = categories?.find((category) => category._id === id);
        if(findCategory){
            setCategoryData({
                title: findCategory.title,
                href: findCategory.href,
            })
            setCategoryId(id)
        }
    }

    const handleDelete = async (id: any) => {
        confirmation({ url: DELETE_CATEGORY + id, config, successMsg: null, setSuccessMsg, func: getCategories });
    };

    const showThumbnail = ( file &&
        <div className='flex items-start flex-col gap-2'>
            <span className='flex items-center gap-2'>
                <Image src={URL.createObjectURL(file)} width={100} height={100} alt={file.name} className='rounded-md' />
                <span className='text-base max-md:text-sm text-yellow-500 flex items-start flex-col'>{file.name} <p className='text-sm text-black'>{file.size / 1024 < 900 ? (file.size / 1024).toFixed(2) + ' kb' : (file.size / (1024 * 1024)).toFixed(2) + ' mb'}</p></span>
            </span>
        </div>
    )

  return (
    <div className='w-full'>
        <div className='w-full mt-5 h-fit bg-slate-300 rounded-md flex flex-col items-center gap-5 p-20'>
            <input type='text' name='title' placeholder='category title' value={categoryData.title} onChange={handleChange} className='w-fit p-3 max-md:p-1 rounded-md border-none outline-none' />
            <input type='text' name='href' placeholder='category href' value={categoryData.href} onChange={handleChange} className='w-fit p-3 max-md:p-1 rounded-md border-none outline-none' />
            <input id='selectThumbnail' accept="image/*" className='hidden' type='file' onChange={handleFileChange} />
            <button onClick={() => document.getElementById('selectThumbnail')?.click()} className='p-2 max-md:p-1 max-md:text-xs bg-white text-sm text-black hover:text-green-400 duration-200 rounded-md'>Choose img</button>
            {showThumbnail}
            {isLoading ?
                <SkewLoader color="#ffffff" />
                :
                <button onClick={(e) => {updateMode ? handleSubmit(e, UPDATE_CATEGORY + categoryId) : handleSubmit(e, ADD_CATEGORY)}} className='p-3 max-md:p-1 max-md:text-xs bg-white text-black hover:text-green-400 duration-200 rounded-md'>{updateMode ? 'Update' : 'Add'}</button>
            }
        </div>
        <div className='w-full flex flex-col items-center gap-3 mt-10'>
            {categories?.map((category: CategoryData) => (
                <span key={category._id} className='w-full flex justify-between items-center p-2 rounded-md bg-slate-300 hover:bg-slate-200 duration-200'>
                    <Image width={200} height={200} className='w-[100px] h-[100px] max-md:w-[50px] max-md:h-[50px]' src={SHOW_IMG + category.thumbnail} alt={category.title} />
                    <Link className='duration-200 hover:text-yellow-500 max-md:text-xs' href={`/categories/${category.href}`}>{category.title}</Link>
                    <span>
                        <FontAwesomeIcon icon={faEdit} onClick={() => {handleUpdate(category._id)}} className='mr-3 duration-200 text-blue-500 hover:text-blue-400 cursor-pointer' />
                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(category._id)} className='duration-200 text-red-500 hover:text-red-400 cursor-pointer' />
                    </span>
                </span>
            ))}
        </div>
    </div>
  )
}

export default Categories