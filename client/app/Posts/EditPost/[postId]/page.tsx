'use client'
import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { Input, TextField } from '@mui/material';
import axios from 'axios';
import { POST, UPDATE_POST } from '@/utils/apis';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function EditPost({params}: any){
    const [content, setContent] = useState<string>('');
    const editor = useRef(null);
    const [selectedImg, setSelectedImg] = useState<File | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [postUserName, setPostUserName] = useState<string | null>(null);
    const router = useRouter();
    const postId = params.postId;
    const userName = Cookies.get('userName');
    const [form, setForm] = useState({
        title: '',
        summary: ''
    })
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(POST + postId);
                const postData = res.data.data.foundPost;
                setForm({title: postData.title, summary: postData.summary}),
                setContent(postData.content),
                setPostUserName(userName || 'unknown');
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    }, [postId])


    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm({...form, [name]: value})
    }

    const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedImg(file);
      };
      
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const data = new FormData();
        if (selectedImg) {
            data.append('thumbnail', selectedImg);
        }
        data.append('title', form.title)
        data.append('summary', form.summary)
        data.append('content', content)

        try{
            await axios.put(UPDATE_POST + postId, data);

            setError(null);
            setSuccess('Post has been updated!')
            setTimeout(() => {
                router.push('/Posts/MyPosts');
                setSuccess(null)
            }, 2000)

        }catch(err: any){
            setError(err.response?.data.message)
            if(err.response.status = 500){
                setError('post thumbnail is required!');
            }else{
                setError(err.response?.data.message);
            }
        }
    }

    return(
        userName == postUserName ? 
        <div className='flex flex-col gap-5 items-center justify-center  mt-32 mb-28'>
            <div className='flex flex-col gap-10 w-[500px] min-h-[600px] bg-slate-100 rounded-md p-5  max-md:w-5/6'>
            <TextField
            label="title"
            name='title'
            variant="outlined"
            fullWidth
            onChange={handleFormChange}
            value={form.title}
            />
            <TextField
            label="summary"
            name='summary'
            variant="outlined"
            fullWidth
            onChange={handleFormChange}
            value={form.summary}
            />
            <Input
            id="file-input"
            type="file"
            onChange={handleImgChange}
            inputProps={{ accept: 'image/*' }}
            />
                <JoditEditor
                    className='w-full h-full text-black bg-black'
                    ref={editor}
                    value={content}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={(newContent) => setContent(newContent)}
                    />
                    <button onClick={handleSubmit} className='w-[150px] h-[40px] bg-blue-500 text-white flex justify-center items-center rounded-md'>
                    submit</button>
                    {error && <p className='text-red-500 bg-white p-5 rounded-md text-md'>{error}</p>}
                    {success && <p className='text-green-500 bg-white p-5 rounded-md text-md'>{success}</p>}
                </div>
        </div>
        :
        <></>
    )
}