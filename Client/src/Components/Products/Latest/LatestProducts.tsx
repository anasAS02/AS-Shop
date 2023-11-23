'use client'
import { useEffect, useState } from 'react';
import { getProducts } from '@/Utils/Products/getProducts';
import { ProductCard, ProductData } from '../Product/ProductCard';
import { calcPrice } from '@/Utils/Products/calcPrice';

const LatestProducts = () => {
  const [products, setProducts] = useState<ProductData[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response?.data.data);
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='flex flex-col gap-5 p-24'>
      <h2 className='text-2xl font-bold max-md:text-sm'>Latest Products</h2>
      <div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 items-center gap-5'>
        {products?.slice(0, 5).map((product: ProductData) => (
          <ProductCard
            style={true}
            key={product._id}
            quantity={1}
            _id={product._id}
            total={calcPrice(product.price, product.discountPercentage || 0)}
            description={product.description}
            images={product.images}
            discountPercentage={product.discountPercentage}
            title={product.title}
            thumbnail={product.thumbnail}
            category={product.category}
            brand={product.brand}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
