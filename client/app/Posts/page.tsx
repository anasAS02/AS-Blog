'use client'
import { POSTS } from "@/utils/apis";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import PostCard, { postProps } from "../Components/PostCard";

export default function Posts(){
    const userName = Cookies.get('userName');
    const [posts, setPosts] = useState<any>();
    useEffect(() => {
      axios.get(POSTS).then((data) => setPosts(data.data.data.posts))
    }, [])
    
    return(
        <div className='w-full h-full flex flex-col gap-10 mt-16'>
            <h2 className='text-white text-4xl font-bold max-md:text-2xl'>Recent Posts</h2>
            <div className='grid grid-cols-1 gap-10'>
                {posts?.map((post: postProps) => (
                    <PostCard key={post._id} id={post._id} userName={post.userName == userName ? 'me' : post.userName} title={post.title} imgSrc={post.thumbnail} summary={post.summary} createdAt={post.createdAt}/>
                ))}
            </div>
        </div>
    )
}