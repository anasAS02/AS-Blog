'use client'
import { POSTS } from "@/utils/apis";
import axios from "axios";
import { useEffect, useState } from "react";
import PostCard, { postProps } from "../Components/PostCard";

export default function Posts(){
    const [posts, setPosts] = useState<any>();
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true);
            try{
                await axios.get(POSTS).then((data) => {setPosts(data.data.data.posts); setLoading(false);});
            }catch(err){
                console.log(err)
            }
        }
        getPosts();
    }, []);

    useEffect(() => {
        alert("Please note: Data may take a few seconds to load due to server limitations.");
      }, [])    

    if(loading){
        return(
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-16 w-16"></div>
            </div>
        )    
    }
    
    return(
        <div className='w-full h-full flex flex-col gap-10 mt-16'>
            <h2 className='text-white text-4xl font-bold max-md:text-2xl'>Recent Posts</h2>
            <div className='grid grid-cols-1 gap-10'>
                {posts?.map((post: postProps) => (
                    <PostCard key={post._id} id={post._id} userName={post.userName} title={post.title} imgSrc={post.thumbnail} summary={post.summary} createdAt={post.createdAt}/>
                ))}
            </div>
        </div>
    )
}
