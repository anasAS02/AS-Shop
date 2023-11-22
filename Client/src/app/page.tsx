import { Features } from "@/Components/Features/Features";
import { Landing } from "@/Components/Landing/Landing";
import { LatestProducts } from "@/Components/Products/Latest/LatestProducts";
import { Categories } from "./Categories/Categories";
import { Cards } from "@/Components/Products/Cards/Cards";
import { Sponsors } from "@/Components/Sponsors/Sponsors";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-12">
      <Landing />
      <Features />
      <LatestProducts />
      <Categories />
      <Cards />
      <Sponsors />
    </main>
  )
}
