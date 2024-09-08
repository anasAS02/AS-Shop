'use client';

import { useStatusContext } from "@/Utils/Status/statusContext";
import { useEffect, useState } from "react";
import { SkewLoader } from 'react-spinners';
import axios from "axios";
import Image from "next/image";
import { config } from "@/Utils/Auth/handleAuth";
import { CategoryData, getCategories } from "@/Utils/Products/getCategories";
import { GET_PRODUCTS, UPDATE_PRODUCT } from "@/Utils/Apis";
import SideBar from '../../../Side bar/SideBar';
import { handleMsg } from "@/Utils/Status/handleStatusMsg";

interface ProductData {
    _id?: string;
    title: string;
    description: string;
    price: string;
    discountPercentage: string;
    brand: string;
    category: string;
    thumbnail?: string;
    images?: string[];
}

interface UpdateProductProps {
    params: {
        id: any;
    };
}

const UpdateProduct = ({ params }: UpdateProductProps) => {
    const productId = params.id;
    const { isLoading, setIsLoading, successMsg, setSuccessMsg, err, setErr } = useStatusContext();

    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [productData, setProductData] = useState<ProductData>({
        title: '',
        description: '',
        price: '',
        discountPercentage: '',
        brand: '',
        category: 'Laptops'
    });
    const [images, setImages] = useState<File[] | undefined>(undefined);
    const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);

    useEffect(() => {
        const fetchProductData = async () => {
            setIsLoading(true);
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
                const response = await axios.get(`${GET_PRODUCTS}/${productId}`);
                setProductData(response.data.data[0]);
                handleMsg(undefined, successMsg, setSuccessMsg, err, setErr);
            } catch (error) {
                console.error("Failed to fetch product data", error);
                setErr("Failed to fetch product data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductData();
    }, [productId, successMsg, err, setSuccessMsg, setErr, setIsLoading]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (event.target.id === 'selectThumbnail') {
            setThumbnail(file);
        } else if (event.target.id === 'selectImages') {
            setImages(Array.from(event.target.files || []));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', productData.title);
            formData.append('description', productData.description);
            formData.append('price', productData.price);
            formData.append('discountPercentage', productData.discountPercentage);
            formData.append('brand', productData.brand);
            formData.append('category', productData.category);

            if (thumbnail) {
                formData.append('thumbnail', thumbnail);
            }
            if (images) {
                images.forEach(image => formData.append('images', image));
            }

            await axios.put(UPDATE_PRODUCT + productId, formData, config).then((data) => setSuccessMsg(data.data.message));
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
        } catch (error: any) {
            setErr(error.response?.data.message || "An error occurred");
            console.error("Failed to update product", error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderThumbnail = () => (
        thumbnail && (
            <div className='flex items-start flex-col gap-2'>
                <span className='flex items-center gap-2'>
                    <Image src={URL.createObjectURL(thumbnail)} width={100} height={100} alt={thumbnail.name} className='rounded-md' />
                    <span className='text-base max-md:text-sm text-yellow-500 flex items-start flex-col'>
                        {thumbnail.name}
                        <p className='text-sm text-black'>
                            {thumbnail.size < 900 * 1024
                                ? `${(thumbnail.size / 1024).toFixed(2)} kb`
                                : `${(thumbnail.size / (1024 * 1024)).toFixed(2)} mb`}
                        </p>
                    </span>
                </span>
            </div>
        )
    );

    const renderImages = () => (
        images?.map((img, i) => (
            <div key={i} className='flex items-start flex-col gap-2'>
                <span className='flex items-center gap-2'>
                    <Image src={URL.createObjectURL(img)} width={100} height={100} alt={img.name} className='rounded-md' />
                    <span className='text-base max-md:text-sm text-yellow-500 flex items-start flex-col'>
                        {img.name}
                        <p className='text-sm text-black'>
                            {img.size < 900 * 1024
                                ? `${(img.size / 1024).toFixed(2)} kb`
                                : `${(img.size / (1024 * 1024)).toFixed(2)} mb`}
                        </p>
                    </span>
                </span>
            </div>
        ))
    );

    return (
        <div className='flex items-start gap-14 min-h-screen'>
            <SideBar />
            <div className='w-full mt-5 h-fit bg-slate-300 rounded-md flex flex-col items-center gap-5 p-14'>
                <input type='text' name='title' placeholder='Product Title' value={productData.title} onChange={handleChange} className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none' />
                <input type='text' name='description' placeholder='Product Description' value={productData.description} onChange={handleChange} className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none' />
                <input type='text' name='price' placeholder='Product Price' value={productData.price} onChange={handleChange} className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none' />
                <input type='text' name='discountPercentage' placeholder='Discount Percentage' value={productData.discountPercentage} onChange={handleChange} className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none' />
                <input type='text' name='brand' placeholder='Brand' value={productData.brand} onChange={handleChange} className='w-fit max-md:w-40 p-3 max-md:p-1 rounded-md border-none outline-none' />
                {isLoading ? (
                    <SkewLoader color="#ffffff" />
                ) : (
                    <select name='category' value={productData.category} onChange={handleChange} className='w-fit p-3 max-md:p-1 rounded-md border-none outline-none'>
                        {categories.map(category => (
                            <option key={category._id} value={category.title}>{category.title}</option>
                        ))}
                    </select>
                )}
                <input id='selectThumbnail' accept="image/*" className='hidden' type='file' onChange={handleFileChange} />
                <button onClick={() => document.getElementById('selectThumbnail')?.click()} className='p-2 max-md:p-1 bg-white max-md:text-xs text-sm text-black hover:text-green-400 duration-200 rounded-md'>Choose Thumbnail</button>
                {renderThumbnail()}
                <input multiple id='selectImages' accept="image/*" className='hidden' type='file' onChange={handleFileChange} />
                <button onClick={() => document.getElementById('selectImages')?.click()} className='p-2 max-md:p-1 bg-white max-md:text-xs text-sm text-black hover:text-green-400 duration-200 rounded-md'>Choose Images</button>
                {renderImages()}
                <button onClick={handleSubmit} className='p-3 bg-white text-black hover:text-green-400 duration-200 rounded-md'>Update</button>
            </div>
        </div>
    );
};

export default UpdateProduct;
