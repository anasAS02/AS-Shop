import { getProducts } from '@/Utils/Products/getProducts';
import Image from 'next/image';

export default async function Products ({params}:any) {
  const category = params.category;

  const res = await getProducts();
  const products = res.data.data;
  return (
    <div>
      {products.map((pro: any) => (
        <div key={pro._id}>
          <Image src={pro.thumbnail} alt='..' width={200} height={200} />
          <h2 key={pro._id}>{pro.title}</h2>
        </div>
      ))}
    </div>
  )
}
