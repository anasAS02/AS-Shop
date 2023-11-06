import { Features } from "@/Components/Features/Features";
import { Landing } from "@/Components/Landing/Landing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Landing />
      <section className='p-24'>
        <Features />
      </section>
    </main>
  )
}
