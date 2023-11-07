import { getCategory } from '@/Utils/Products/getCategory';
import { ProductCard, ProductData } from '@/Components/Products/Product/ProductCart';
import { CategoriesList } from './CategoriesList';
import { Sort } from './Sort';

export async function generateMetedata({params}: any){
  const category = params.category;
  return{
    title: category,
    description: `Salla Shop | ${category}`
  }
}

export default async function Category ({params}: any) {
  const category = params.category;

  const config = {
    category,
    sortByHighestPrice: 0
  }

  const res = await getCategory(config);
  const products = res?.data.data;

  return (
    <div className='p-16 flex items-start justify-between gap-10 h-full'>
      <aside className='flex flex-col gap-5 '>
        <CategoriesList category={category} />
      </aside>
      <div className='flex flex-col gap-12 justify-center'>
        <Sort />
        <section className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 items-center'>
          {products?.map((product: ProductData) => (
            <ProductCard key={product._id} _id={product._id} category={product.category} thumbnail={product.thumbnail} title={product.title} price={product.price} description={product.description} discountPercentage={product.discountPercentage} />
          ))}
        </section>
      </div>
    </div>
  )
}
