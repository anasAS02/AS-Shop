import React from 'react'
import ProductComp from './Product';
import axios from 'axios';
import { GET_PRODUCT } from '@/Utils/Apis';

export async function generateMetadata({params}: any) {
    const productId = params.productId;
    const res = await axios.get(GET_PRODUCT + productId);
    const product = res.data.data[0];
    return{
        title: product.title,
        description: product.description,
    }
}

const Product = ({params}: any) => {
    const productId = params.productId;
  return (
    <ProductComp productId={productId} />
  )
}

export default Product;