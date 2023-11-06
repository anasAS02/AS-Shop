import { getProducts } from "@/Utils/Products/getProducts"
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const LatestProducts = async () => {
    const res = await getProducts();
    const products = res.data.data;

  return (
    <div className='flex flex-col gap-5'>
        <h2 className='text-2xl font-bold max-md:text-sm'>Latest Products</h2>
        <div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 items-center gap-5'>
            {products.slice(0, 5).map((product: any) => (
                <span key={product._id} className='p-2 duration-300 border-2 border-transparent rounded-md   hover:border-green-400 flex flex-col gap-3 items-center relative'>
                    <Image src={product.thumbnail} style={{width: '250px', height: '250px'}} width={800} height={800} objectFit="contain" alt={product.title} />
                    <span className='text-center'>
                        <p className='text-sm text-right text-green-600'>{product.category}</p>
                        <p className='text-lg'>{product.title}</p>
                        <p className='text-sm text-gray-400'>{product.description}</p>
                        <p className='text-lg'>${product.price}</p>
                    </span>
                    <span className='flex items-center gap-3'>
                        <button className='duration-200 p-3 max-md:p-1 hover:bg-blue-400 text-black hover:text-white font-bold  flex items-center gap-2 rounded-md'> 
                        <FontAwesomeIcon icon={faCartPlus} className='w-[18px] h-[18px]' />
                        Add To Cart</button>
                        <FontAwesomeIcon icon={faHeart} className='w-[18px] h-[18px] text-gray-400 cursor-pointer' />
                    </span>
                </span>
            ))}
        </div>
    </div>
  )
}
