import { Features } from "@/Components/Features/Features";
import { Landing } from "@/Components/Landing/Landing";
import { LatestProducts } from "@/Components/Products/Latest/LatestProducts";
import Image from "next/image";
import Cover1 from '@/assets/cover1.jpg';
import { Categories } from "./Categories/Categories";
import { Cards } from "@/Components/Products/Cards/Cards";
import { Sponsors } from "@/Components/Sponsors/Sponsors";
import { Footer } from "@/Components/Footer/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-12">
      <Landing />
      <Features />
      <LatestProducts />
      <Image src={Cover1} style={{ width: '100%', height: '500px' }} alt='Cover' />
      <Categories />
      <Cards />
      <Sponsors />
      <Footer />
    </main>
  )
}
