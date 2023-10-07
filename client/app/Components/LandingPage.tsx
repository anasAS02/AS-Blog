import Image from "next/image";
import Landing from '../../assets/landing.webp';
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className='w-full h-full p-6 max-md:p-0 relative mt-32'>
      <Image
        className='w-full h-full rounded-xl mix-blend-hard-light'
        src={Landing}
        alt="Cover"
      />
      <h2 className='text-white text-4xl max-md:text-lg max-md:left-8 max-md:top-2/4 max-md:mt-4 max-lg:mt-0 font-bold absolute top-3/4 left-20 mt-14'>AS Blog | Create your posts now!</h2>
      <Link href='/Auth/Register' className='text-yellow-500 duration-200 hover:text-black underline text-4xl max-md:text-sm max-md:left-8 max-md:top-2/4 absolute top-3/4 left-20 mt-24 max-md:mt-10 max-lg:mt-10'>Join us</Link>
    </div>
  );
}
