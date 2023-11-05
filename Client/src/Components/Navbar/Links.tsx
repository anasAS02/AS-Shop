import Link from "next/link"

export const Links = () => {
  return (
    <div className='w-full bg-black p-2 flex items-center gap-5 text-white'>
        {links.map((link) => (
            <Link key={link.id} href={link.href}>{link.title}</Link>
        ))}
    </div>
  )
}
