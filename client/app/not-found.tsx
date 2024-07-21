import Link from 'next/link'
import notFoundImg from '../assets/notFound.svg'
import Image from 'next/image'

export default function Custom404() {
    return (
      <main className='min-h-screen flex flex-col justify-center items-center gap-3'>
        <Image src={notFoundImg} alt='Not Found' className='w-[400px] h-2/4' />
        <h2 className='text-3xl text-black'>Page Not Found</h2>
        <Link href='/' className='font-extrabold text-2xl text-white'>Home Page</Link>
      </main>
    )
  }
