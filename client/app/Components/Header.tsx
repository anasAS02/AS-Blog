'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGlobalContext } from '../Context/UserContext'
import axios from "axios";
import { LOGOUT } from "@/utils/apis";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Header(){
    const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
    const [keyword, setKeyword] = useState<string> ('');
    const router = useRouter();

    useEffect(() => {
      const checkToken = () => {
          const token = Cookies.get('token');
          if(token){
              setIsLoggedIn(true);
          }else{
              setIsLoggedIn(false);
          }
      }
      checkToken();
  }, [isLoggedIn, setIsLoggedIn]);

    const handleLogout = async () => {
        await axios.post(LOGOUT);
        Cookies.remove('token');
        Cookies.remove('userName');
        window.location.pathname = '/';
    }

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setKeyword(value)
    }

    const handleSearch = (event: React.MouseEvent) => {
        router.push(`/SearchResults?keyword=${encodeURIComponent(keyword)}`);
        setKeyword('');
    }

    return(
        <div className='flex justify-center'>
            <nav className='bg-zinc-100 opacity-95 p-4 w-5/12 max-md:w-full max-lg:w-7/12 h-14 flex justify-around items-center gap-4 text-black fixed  max-md:h-24 z-50 rounded-full mt-4 max-md:flex-col'>
                <div className='links flex gap-4 items-center'>
                    <Link className='text-gray-700 hover:text-yellow-500 duration-200' href='/'>Home</Link>
                    <Link className='text-gray-700 hover:text-yellow-500 duration-200' href='/Posts/MyPosts'>My posts</Link>
                    {isLoggedIn ? 
                    <button onClick={handleLogout} className='bg-transparent duration-200 text-gray-700 hover:text-red-500'>Logout</button>
                    :
                    <Link className='text-gray-700 hover:text-yellow-500 duration-200' href='/Auth/Login'>Login</Link>
                }
                </div>
                <div className='flex gap-2 items-center'>
                    <input onChange={handleSearchInput} name='keyword' value={keyword} className='w-2/4 p-2 outline-none rounded-xl bg-white duration-200 focus:w-3/4' type='search' placeholder='search for...' />
                    <button onClick={handleSearch} className='bg-transparent duration-200 text-gray-700 hover:text-yellow-500'>Search</button>
                </div>
            </nav>
        </div>
    )
}