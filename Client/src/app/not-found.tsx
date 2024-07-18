import Link from 'next/link'
import notFoundImg from '../assets/notFound.svg'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

export default function Custom404() {
    return (
      <main className='min-h-screen flex flex-col justify-center items-center gap-3'>
        <Image src={notFoundImg} alt='Not Found' className='w-[400px] h-2/4' />
        <h2 className='text-3xl text-black'>Page Not Found</h2>
        <span className='flex items-center gap-3'>
          <Link href='/' className='font-extrabold text-2xl text-green-500 hover:text-green-400 duration-200'>Home Page</Link>
          <FontAwesomeIcon icon={faGear} className='animate-spin text-2xl text-green-500' />
        </span>
      </main>
    )
  }