// ./src/Components/Navbar/Links.tsx

import { CategoryData, getCategories } from "@/Utils/Products/getCategories";
import Link from "next/link";

interface LinksProps {
  categories: CategoryData[];
}

const Links: React.FC<LinksProps> = ({ categories }) => {
  return (
    <div className='w-full bg-zinc-800 p-2 flex justify-center items-center gap-5 text-sm text-white max-md:flex-wrap'>
      <Link href={`/Categories/All-Products`} className='duration-200 hover:text-yellow-500'>All Products</Link>
      {categories.map((category: CategoryData) => (
        <Link key={category._id} href={`/Categories/${category.href}`} className='duration-200 hover:text-yellow-500'>{category.title}</Link>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const categories = await getCategories();

  return {
    props: {
      categories,
    },
    revalidate: 60 * 60,
  };
}

export default Links;
