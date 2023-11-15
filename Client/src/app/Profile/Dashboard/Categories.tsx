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
        getCategories().then((data) => setCategories(data));
        if(successMsg){
            Swal.fire({
                title: "Done",
                text: successMsg,
                icon: "success"
            })
        }
        if(err){
            Swal.fire({
                title: "Oops...",
                text: err,
                icon: "error"
            })
        }
    }, [successMsg, err]);

    
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
        await axios.delete(DELETE_CATEGORY + id, config);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
            preConfirm: async () => {
                await axios.post(DELETE_CATEGORY + id, config),
                getCategories().then((data) => setCategories(data));
            },
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
              });
            }
          });
    }

  return (
    <div>
        <div className='w-full mt-5 max-md:w-3/4 h-fit bg-green-400 rounded-md flex flex-col items-center gap-5 p-14'>
            <input type='text' name='title' placeholder='category title' value={categoryData.title} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='text' name='href' placeholder='category href' value={categoryData.href} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <input id='selectThumbnail' accept="image/*" className='hidden' type='file' onChange={handleFileChange} />
            <button onClick={() => document.getElementById('selectThumbnail')?.click()} className='p-2 bg-white text-sm text-black hover:text-green-400 duration-200 rounded-md'>Choose img</button>
            
            {isLoading ?
                <SkewLoader color="#ffffff" />
                :
                <button onClick={(e) => {updateMode ? handleSubmit(e, UPDATE_CATEGORY + categoryId) : handleSubmit(e, ADD_CATEGORY)}} className='p-3 bg-white text-black hover:text-green-400 duration-200 rounded-md'>{updateMode ? 'Update' : 'Add'}</button>
            }
        </div>
        <div className='flex flex-col items-center gap-3 mt-10'>
            {categories?.map((category: CategoryData) => (
                <span key={category._id} className='w-full flex justify-between items-center p-2 rounded-md bg-slate-300 hover:bg-slate-200 duration-200'>
                    <Image width={200} height={200} className='w-[100px] h-[100px]' src={SHOW_IMG + category.thumbnail} alt={category.title} />
                    <Link className='duration-200 hover:text-yellow-500' href={`/categories/${category.href}`}>{category.title}</Link>
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