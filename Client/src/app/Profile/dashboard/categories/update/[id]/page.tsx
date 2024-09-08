'use client'

import { useStatusContext } from "@/Utils/Status/statusContext";
import { useEffect, useState } from "react";
import { SkewLoader } from 'react-spinners';
import axios from "axios";
import Image from "next/image";
import { config } from "@/Utils/Auth/handleAuth";
import { CategoryData, getCategories } from "@/Utils/Products/getCategories";
import SideBar from "../../../Side bar/SideBar";
import { UPDATE_CATEGORY } from "@/Utils/Apis";
import { handleMsg } from "@/Utils/Status/handleStatusMsg";

interface UpdateCategoryProps {
    params: {
        id: string;
    };
}

const UpdateCategory = ({ params }: UpdateCategoryProps) => {
    const id = params.id;
    const { isLoading, setIsLoading, successMsg, setSuccessMsg, err, setErr } = useStatusContext();

    const [categoryData, setCategoryData] = useState<CategoryData>({ title: '', href: '' });
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [file, setFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        handleMsg(undefined, successMsg, setSuccessMsg, err, setErr);
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
                const findCategory = data.find((category) => category._id === id);
                if (findCategory) {
                    setCategoryData({
                        title: findCategory.title,
                        href: findCategory.href,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch categories", error);
                setErr("Failed to fetch categories");
            }
        };

        fetchCategories();
    }, [id, successMsg, err, setErr, setSuccessMsg]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoryData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', categoryData.title);
            formData.append('href', categoryData.href);
            if (file) {
                formData.append('thumbnail', file);
            }
            const response = await axios.put(`${UPDATE_CATEGORY}${id}`, formData, config);
            setSuccessMsg(response.data.message);
            setErr(null);
            setTimeout(() => {
                window.location.pathname = '/Profile/dashboard/categories'
            }, 1500)
        } catch (error: any) {
            setErr(error.response?.data.message || "An error occurred");
            console.error("Failed to update category", error);
        } finally {
            setIsLoading(false);
        }
    };

    const showThumbnail = file && (
        <div className='flex items-start flex-col gap-2'>
            <span className='flex items-center gap-2'>
                <Image src={URL.createObjectURL(file)} width={100} height={100} alt={file.name} className='rounded-md' />
                <span className='text-base max-md:text-sm text-yellow-500 flex items-start flex-col'>
                    {file.name}
                    <p className='text-sm text-black'>
                        {file.size < 900 * 1024 
                            ? `${(file.size / 1024).toFixed(2)} kb` 
                            : `${(file.size / (1024 * 1024)).toFixed(2)} mb`}
                    </p>
                </span>
            </span>
        </div>
    );

    return (
        <div className='min-h-screen flex items-start gap-14'>
            <SideBar />
            <div className='w-full mt-5 h-fit bg-slate-300 rounded-md flex flex-col items-center gap-5 p-14'>
                <input
                    type='text'
                    name='title'
                    placeholder='Category title'
                    value={categoryData.title}
                    onChange={handleChange}
                    className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none'
                />
                <input
                    type='text'
                    name='href'
                    placeholder='Category href'
                    value={categoryData.href}
                    onChange={handleChange}
                    className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none'
                />
                <input
                    id='selectThumbnail'
                    accept="image/*"
                    className='hidden'
                    type='file'
                    onChange={handleFileChange}
                />
                <button
                    onClick={() => document.getElementById('selectThumbnail')?.click()}
                    className='p-2 max-md:p-1 max-md:text-xs bg-white text-sm text-black hover:text-green-400 duration-200 rounded-md'
                >
                    Choose img
                </button>
                {showThumbnail}
                {isLoading
                    ? <SkewLoader color="#ffffff" />
                    : <button
                        onClick={handleSubmit}
                        className='p-3 max-md:p-1 max-md:text-xs bg-white text-black hover:text-green-400 duration-200 rounded-md'
                      >
                        Update
                      </button>
                }
            </div>
        </div>
    );
};

export default UpdateCategory;
