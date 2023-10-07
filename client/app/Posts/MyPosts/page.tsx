'use client'
import Link from "next/link";
import { useGlobalContext } from "@/app/Context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { MY_POSTS } from "@/utils/apis";
import Cookies from "js-cookie";
import PostCard, { postProps } from "@/app/Components/PostCard";

export default function MyPosts(){
    const [posts, setPosts] = useState<any>()
    const { isLoggedIn } = useGlobalContext();
    const userName = Cookies.get('userName');
    useEffect(() => {
        axios.get(MY_POSTS + userName).then((data) => setPosts(data.data.data.posts))
    }, [userName])

    return(
        <>
        {isLoggedIn ?
            <div className={`w-full ${posts?.length > 0 ? '' : 'h-full'} flex flex-col gap-10 mt-36 p-5 mb-56`}>
            <div className='flex gap-5 items-center justify-between'>
                <h2 className='text-white text-4xl font-bold  max-md:text-2xl'>My Posts</h2>
                <Link className='p-3 bg-zinc-800 duration-300 text-white hover:bg-zinc-700' href='/Posts/CreatePost'>Create Post</Link>
            </div>
            {
                posts?.length > 0 ?
                <div className='grid grid-cols-1 gap-10'>
                {posts?.map((post: postProps) => (
                    <PostCard key={post._id} id={post._id} userName={post.userName} title={post.title} imgSrc={post.thumbnail} summary={post.summary} createdAt={post.createdAt}/>
                ))}
                </div>
                :
                <h2 className='text-white text-3xl font-bold max-md:text-lg'>No posts have been made yet.</h2>
            }
        </div>
            :
        <span className='h-screen flex gap-2 flex-col items-center justify-center'>
            <span className='bg-slate-100 rounded-lg p-5 w-2/4 text-center max-md:w-3/4'>
                <h2 className='text-red-500 text-3xl'>You must be logged in</h2>
                <Link className='duration-200 hover:text-yellow-500 text-black' href='/Auth/Login'>Login</Link>
            </span>
        </span>
        }
    </>
    )
}