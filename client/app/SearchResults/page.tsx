'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { SEARCH } from '@/utils/apis';
import PostCard, { postProps } from "../Components/PostCard";
import Cookies from 'js-cookie';
import { Slide } from '@mui/material';

const SearchResult = () => {
  const userName = Cookies.get('userName');
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
    <div className={`w-full ${posts&& posts.length > 0 ? '' : 'h-full'} flex flex-col gap-10 mt-36 p-5 mb-72`}>
      <h2 className='text-white text-4xl font-bold'>Search Results</h2>
      {posts && posts.length > 0 ?
      <div className='grid grid-cols-1 gap-10'>
                {posts?.map((post: postProps) => (
                  <Slide key={post._id}>
                    <PostCard key={post._id} id={post._id} userName={post.userName == userName ? 'me' : post.userName} title={post.title} imgSrc={post.thumbnail} summary={post.summary} createdAt={post.createdAt}/>
                  </Slide>
                ))}
            </div>
        :
        <h2 className='text-red-500 text-4xl font-bold'>No results found.</h2>
        }
    </div>
  );
};

export default SearchResult;
