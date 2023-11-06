import { getProducts } from "@/Utils/Products/getProducts"
import { ProductCard, ProductData } from "../Product/ProductCart";

export const LatestProducts = async () => {
    const res = await getProducts();
    const products = res.data.data;

  return (
    <div className='flex flex-col gap-5'>
        <h2 className='text-2xl font-bold max-md:text-sm'>Latest Products</h2>
        <div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 items-center gap-5'>
            {products.slice(0, 5).map((product: ProductData) => (
                <ProductCard _id={product._id} title={product.title} thumbnail={product.thumbnail} category={product.category} description={product.description} price={product.price} />
            ))}
        </div>
    </div>
  )
}
