'use client'
import { useStatusContext } from "@/Utils/Status/statusContext";
import { useEffect, useState } from "react";
import { SkewLoader } from 'react-spinners';
import { ADD_PRODUCT } from "@/Utils/Apis";
import axios from "axios";
import Image from "next/image";
import { config } from "@/Utils/Auth/handleAuth";
import { CategoryData, getCategories } from "@/Utils/Products/getCategories";
import { handleMsg } from "@/Utils/Status/handleStatusMsg";
import SideBar from '../../Side bar/SideBar'

const AddProduct = () => {

    const {isLoading, setIsLoading, successMsg, setSuccessMsg, err, setErr} = useStatusContext();

    interface ProductData{
        _id?: string;
        title: string;
        description: string;
        price: string;
        discountPercentage: string;
        brand: string;
        category: string;
        thumbnail?: string;
        images?: [string];
    }

    const [categories, setCategories] = useState<CategoryData[]> ();
    const [productData, setProductData] = useState<ProductData> ({
        title: '',
        description: '',
        price: '',
        discountPercentage: '',
        brand: '',
        category: 'Laptops'
    });

    const [images, setImages] = useState<File[] | undefined>(undefined);
    const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const thumbnail = event.target.files?.[0];
        setThumbnail(thumbnail);
    };

    
    useEffect(() => {
        handleMsg(undefined, successMsg, setSuccessMsg, err, setErr);
        setIsLoading(true);
        getCategories().then((data) => {setCategories(data); setIsLoading(false)});
    }, [successMsg, err, setSuccessMsg, setErr, setIsLoading]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setProductData({...productData, [name]: value});
    }

    const handleSubmit = async (e: React.MouseEvent, url: string) => {
        e.preventDefault();
        setIsLoading(true);
        try{            
            const formData = new FormData();
            formData.append('title', productData.title);
            formData.append('description', productData.description);
            formData.append('price', productData.price);
            formData.append('discountPercentage', productData.discountPercentage);
            formData.append('brand', productData.brand);
            formData.append('category', productData.category);

                if(!images || !thumbnail){
                    setErr('Images and thumbnail are required');
                    return;
                }
                if(thumbnail){
                    formData.append('thumbnail', thumbnail);
                }
                if (images) {
                    for(let i = 0; i < images.length; i++){
                        formData.append('images', images[i]);
                    }
                }
                await axios.post(url, formData, config).then((data) => setSuccessMsg(data.data.message));
                setProductData({
                    title: '',
                    description: '',
                    price: '',
                    discountPercentage: '',
                    brand: '',
                    category: 'Laptops'
            });
            setThumbnail(undefined);
            setImages(undefined);
            setErr(null);
            setTimeout(() => {
                window.location.pathname = '/Profile/dashboard/products'
            }, 1500)
        }catch(err: any){
            setErr(err.response?.data.message);
            console.log(err);
        }finally{
            setIsLoading(false);
        }
    }

    
  const showThumbnail = ( thumbnail &&
    <div className='flex items-start flex-col gap-2'>
        <span className='flex items-center gap-2'>
            <Image src={URL.createObjectURL(thumbnail)} width={100} height={100} alt={thumbnail.name} className='rounded-md' />
            <span className='text-base max-md:text-sm text-yellow-500 flex items-start flex-col'>{thumbnail.name} <p className='text-sm text-black'>{thumbnail.size / 1024 < 900 ? (thumbnail.size / 1024).toFixed(2) + ' kb' : (thumbnail.size / (1024 * 1024)).toFixed(2) + ' mb'}</p></span>
        </span>
    </div>
  )

  const showImgs = images?.map((img: File, i) => (
      <div key={i} className='flex items-start flex-col gap-2'>
          <span className='flex items-center gap-2'>
              <Image src={URL.createObjectURL(img)} width={100} height={100} alt={img.name} className='rounded-md' />
              <span className='text-base max-md:text-sm text-yellow-500 flex items-start flex-col'>{img.name} <p className='text-sm text-black'>{img.size / 1024 < 900 ? (img.size / 1024).toFixed(2) + ' kb' : (img.size / (1024 * 1024)).toFixed(2) + ' mb'}</p></span>
          </span>
      </div>
  ))

  return (
    <div className='flex items-start gap-14 min-h-screen'>
      <SideBar />
      <div className='w-full mt-5 h-fit bg-slate-300 rounded-md flex flex-col items-center gap-5 p-14'>
            <input type='text' name='title' placeholder='product title' value={productData.title} onChange={handleChange} className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none' />
            <input type='text' name='description' placeholder='product description' value={productData.description} onChange={handleChange} className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none' />
            <input type='text' name='price' placeholder='product price' value={productData.price} onChange={handleChange} className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none' />
            <input type='text' name='discountPercentage' placeholder='product discountPercentage' value={productData.discountPercentage} onChange={handleChange} className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none' />
            <input type='text' name='brand' placeholder='product brand' value={productData.brand} onChange={handleChange} className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none' />
            {isLoading ?
            <SkewLoader color="#ffffff" />
            :
            <select name='category' value={productData.category} onChange={handleChange} className='w-fit p-3 max-md:p-1 rounded-md border-none outline-none'>
                {categories?.map((category) => (
                    <option key={category._id} value={category.title}>{category.title}</option>
                ))}
            </select>
            }
            <input id='selectThumbnail' accept="image/*" className='hidden' type='file' onChange={handleFileChange} />
            <button onClick={() => document.getElementById('selectThumbnail')?.click()} className='p-2 max-md:p-1 bg-white max-md:text-xs text-sm text-black hover:text-green-400 duration-200 rounded-md'>Choose thumbnail</button>
            {showThumbnail}
            <input multiple id='selectImager' accept="image/*" className='hidden' type='file' onChange={(e) => e.target.files && setImages([...e.target.files])} />
            <button onClick={() => document.getElementById('selectImager')?.click()} className='p-2 max-md:p-1 bg-white max-md:text-xs text-sm text-black hover:text-green-400 duration-200 rounded-md'>Choose images</button>
            {showImgs}
            {isLoading ?
                <SkewLoader color="#ffffff" />
                :
                <button onClick={(e) => handleSubmit(e, ADD_PRODUCT)} className='p-3 bg-white text-black hover:text-green-400 duration-200 rounded-md'>Add</button>
            }
        </div>
    </div>
  )
}

export default AddProduct
