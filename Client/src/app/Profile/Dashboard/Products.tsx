'use client'
import { useStatusContext } from "@/Utils/Status/statusContext";
import { useEffect, useState } from "react";
import { SkewLoader } from 'react-spinners';
import { ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, SHOW_IMG, UPDATE_PRODUCT } from "@/Utils/Apis";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { config } from "@/Utils/Auth/handleAuth";
import { CategoryData, getCategories } from "@/Utils/Products/getCategories";
import deleteConfirmation from "@/Utils/Status/deleteConfirmation";

const Products = () => {
    const {isLoading, setIsLoading, successMsg, setSuccessMsg, err, setErr} = useStatusContext();

    interface ProductData{
        _id?: string;
        title: string;
        description: string;
        price: string;
        discountPercentage: string;
        stock: string;
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
        stock: '',
        brand: '',
        category: 'laptops'
    });

    const [updateMode, setUpdateMode] = useState<boolean> (false);
    const [productId, setProductId] = useState<any> (null);
    const [products, setProducts] = useState<ProductData[]> ();
    const [images, setImages] = useState<any>(undefined);
    const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const thumbnail = event.target.files?.[0];
        setThumbnail(thumbnail);
    };


    const getProducts = async() => {
        try{
            const res = await axios.get(GET_PRODUCTS, config);
            const data = res.data.data;
            setProducts(data);
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(() => {
        getCategories().then((data) => setCategories(data));
        getProducts();
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
            formData.append('stock', productData.stock);
            formData.append('brand', productData.brand);
            formData.append('category', productData.category);
            if(thumbnail){
                formData.append('thumbnail', thumbnail);
            }
            if (images) {
                for(let i = 0; i < images.length; i++){
                    formData.append('images[]', images[i]);
                }
            }
            const res = await axios.post(url, {formData});
            console.log(res.data);
            // console.log('formData', formData)

            // if(updateMode){
            //     await axios.put(url, formData, config).then((data) => setSuccessMsg(data.data.message));
            //     setUpdateMode(false);
            //     setProductId(null);
            // }else{
            //     await axios.post(url, {formData}, config).then((data) => setSuccessMsg(data.data.message));
            // }
            // setProductData({
            //     title: '',
            //     description: '',
            //     price: '',
            //     discountPercentage: '',
            //     stock: '',
            //     brand: '',
            //     category: 'laptops'
            // });
            // setImages([null]);
            // setErr(null);
            // getProducts();
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
        const findProduct = products?.find((product) => product._id === id);
        if(findProduct){
            setProductData({
                title: findProduct.title,
                description: findProduct.description,
                price: findProduct.price,
                discountPercentage: findProduct.discountPercentage,
                stock: findProduct.stock,
                brand: findProduct.brand,
                category: findProduct.category,
                thumbnail: findProduct.thumbnail,
                images: findProduct.images
            })
            setProductId(id)
        }
    }

    const handleDelete = async (id: any) => {
        deleteConfirmation({ url: DELETE_PRODUCT + id, config, successMsg: null, setSuccessMsg: () => setSuccessMsg(null), func: getProducts });
    }

  return (
    <div>
        <div className='w-full mt-5 max-md:w-3/4 h-fit bg-green-400 rounded-md flex flex-col items-center gap-5 p-14'>
            <input type='text' name='title' placeholder='product title' value={productData.title} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='text' name='description' placeholder='product description' value={productData.description} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='text' name='price' placeholder='product price' value={productData.price} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='text' name='discountPercentage' placeholder='product discountPercentage' value={productData.discountPercentage} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='text' name='stock' placeholder='product stock' value={productData.stock} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <input type='text' name='brand' placeholder='product brand' value={productData.brand} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none' />
            <select name='category' value={productData.category} onChange={handleChange} className='w-fit p-3 rounded-md border-none outline-none'>
                {categories?.map((category) => (
                    <option value={category.title}>{category.title}</option>
                ))}
            </select>
            <input id='selectThumbnail' accept="image/*" className='hidden' type='file' onChange={handleFileChange} />
            <button onClick={() => document.getElementById('selectThumbnail')?.click()} className='p-2 bg-white text-sm text-black hover:text-green-400 duration-200 rounded-md'>Choose thumbnail</button>
            <input multiple id='selectImager' accept="image/*" className='hidden' type='file' onChange={(e) => e.target.files && setImages([...e.target.files])} />
            <button onClick={() => document.getElementById('selectImager')?.click()} className='p-2 bg-white text-sm text-black hover:text-green-400 duration-200 rounded-md'>Choose images</button>
            
            {isLoading ?
                <SkewLoader color="#ffffff" />
                :
                <button onClick={(e) => {updateMode ? handleSubmit(e, UPDATE_PRODUCT + productId) : handleSubmit(e, ADD_PRODUCT)}} className='p-3 bg-white text-black hover:text-green-400 duration-200 rounded-md'>{updateMode ? 'Update' : 'Add'}</button>
            }
        </div>
        <div className='flex flex-col items-center gap-3 mt-10'>
            {products?.map((product: ProductData) => (
                <span key={product._id} className='w-full flex justify-between items-center p-2 rounded-md bg-slate-300 hover:bg-slate-200 duration-200'>
                    <Link href={`/categories/${product._id}`}>
                        <Image width={200} height={200} className='w-[100px] h-[100px] duration-200 scale-105 rounded-md' src={product.thumbnail?.startsWith('https://i.dummyjson.com') ? product.thumbnail : SHOW_IMG + product.thumbnail} alt={product.title} />
                    </Link>
                    <p>{product.title}</p>
                    <p>left: {product.stock}</p>
                    <span>
                        <FontAwesomeIcon icon={faEdit} onClick={() => {handleUpdate(product._id)}} className='mr-3 duration-200 text-blue-500 hover:text-blue-400 cursor-pointer' />
                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(product._id)} className='duration-200 text-red-500 hover:text-red-400 cursor-pointer' />
                    </span>
                </span>
            ))}
        </div>
    </div>
  )
}

export default Products