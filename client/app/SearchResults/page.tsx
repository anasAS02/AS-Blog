'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { SEARCH } from '@/utils/apis';
import PostCard, { postProps } from "../Components/PostCard";

const SearchResult = () => {
  const router = useSearchParams();
  const [posts, setPosts] = useState<null | []>(null);
  const searchParams = useSearchParams()
 
  const keyword = searchParams.get('keyword')

  useEffect(() => {
    const search = async () => {
      const res = await axios.get(SEARCH + keyword);
      const data = res.data.data.result;
      setPosts(data);
    }
    search();
  }, [keyword])
  
  return (
    <div className='w-full flex flex-col gap-10 mt-36 p-5'>
      <h2 className='text-white text-4xl font-bold'>Search Results</h2>
      {posts? 
      <div className='grid grid-cols-1 gap-10'>
                {posts?.map((post: postProps) => (
                    <PostCard key={post._id} id={post._id} userName={post.userName} title={post.title} imgSrc={post.thumbnail} summary={post.summary} createdAt={post.createdAt}/>
                ))}
            </div>
        :
        <h2 className='text-red-500 text-3xl'>No results found.</h2>
        }
    </div>
  );
};

export default SearchResult;
