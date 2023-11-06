import { Features } from "@/Components/Features/Features";
import { Landing } from "@/Components/Landing/Landing";
import { LatestProducts } from "@/Components/Products/Latest/LatestProducts";
import Image from "next/image";
import Cover1 from '@/assets/cover1.jpg';
import { Categories } from "./Categories/Categories";
import { Cards } from "@/Components/Products/Cards/Cards";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Landing />
      <section className='p-24 flex justify-center items-center flex-col gap-12'>
        <Features />
        <LatestProducts />
      </section>
      <Image src={Cover1} style={{ width: '100%', height: '500px' }} alt='Cover' />
      <section className='p-24 flex justify-center items-center flex-col gap-12'>
        <Categories />
        <Cards />
      </section>
    </main>
  )
}
