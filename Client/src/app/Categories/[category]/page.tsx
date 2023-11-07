import { getCategory } from '@/Utils/Products/getCategory';
import Image from 'next/image';
import { CategoriesList } from './CategoriesList';

export async function generateMetedata({params}: any){
  const category = params.category;
  return{
    title: category,
    description: `Salla Shop | ${category}`
  }
}

export default async function Category ({params}: any) {
  const category = params.category;

  const res = await getCategory(category);
  const products = res?.data.data;

  return (
    <div className='p-16 flex items-start justify-between gap-10 h-screen'>
      <aside className='flex flex-col gap-5 '>
        <CategoriesList category={category} />
      </aside>
      {products.map((pro: any) => (
        <div key={pro._id}><Image src={pro.images[0]} alt='..' width={200} height={200} /><h2>{pro.title}</h2></div>
      ))}
    </div>
  )
}
