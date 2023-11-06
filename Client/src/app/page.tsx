import { Features } from "@/Components/Features/Features";
import { Landing } from "@/Components/Landing/Landing";
import { LatestProducts } from "@/Components/Products/Latest/LatestProducts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Landing />
      <section className='p-24 flex justify-center items-center flex-col gap-12'>
        <Features />
        <LatestProducts />
      </section>
    </main>
  )
}
