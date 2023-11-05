import { getProducts } from '@/Utils/Products/getProducts';

export default async function Products ({params}:any) {
  const category = params.category;

  const res = await getProducts();
  const products = res.data.data;
  return (
    <div>
      {products.map((pro: any) => (
        <h2 key={pro._id}>{pro.title}</h2>
      ))}
    </div>
  )
}
