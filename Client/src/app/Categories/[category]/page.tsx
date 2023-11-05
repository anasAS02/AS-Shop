import { getCategory } from '@/Utils/Products/getCategory';

export default async function Category ({params}:any) {
  const category = params.category;

  const res = await getCategory(category);
  const products = res.data.data;
  return (
    <div>
      {products.map((pro: any) => (
        <h2 key={pro._id}>{pro.title}</h2>
      ))}
    </div>
  )
}
