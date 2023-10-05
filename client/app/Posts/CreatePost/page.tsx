'use client'
import React, { useRef, useState } from 'react';
// import JoditEditor from 'jodit-react';
import { Input, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { CREATE_POST } from '@/utils/apis';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'; // Import dynamic for conditional rendering

export default function CreatePost(){
    const [content, setContent] = useState<string>('');
    const editor = useRef(null);
    const [selectedImg, setSelectedImg] = useState<File | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const userName = Cookies.get('userName');
    const router = useRouter();


    const [form, setForm] = useState({
        title: '',
        summary: ''
    })

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
        if(form.title == '' || form.summary == '' || content == '' || selectedImg == undefined){
            setError('All fields are required!')
        }
        const formData = new FormData();
            if (selectedImg) {
                formData.append('thumbnail', selectedImg);
            }
            formData.append('title', form.title)
            formData.append('summary', form.summary)
            formData.append('content', content)
            formData.append('userName', userName || 'unknown')
            try{
                await axios.post(CREATE_POST, formData);
                setError(null);
                setSuccess('Post has been created!')
                setTimeout(() => {
                    router.push('/Posts/MyPosts');
                    setSuccess(null)
                }, 2000)
            }catch(err: any){
                console.log(err.response?.data.message)
                if(err.response.status = 500){
                    setError('All fields are required!');
                }else{
                    setError(err.response?.data.message);
                }
            }
    }
    
    const DynamicJoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
    return(
        <div className='flex flex-col gap-5 items-center justify-center mt-32 mb-28'>
            <div className='flex flex-col gap-10 w-[500px] min-h-[600px] bg-slate-100 rounded-md p-5  max-md:w-5/6'>                
                <TextField
                label="title"
                name='title'
                variant="outlined"
                fullWidth
                onChange={handleFormChange}
                />
                <TextField
                label="summary"
                name='summary'
                variant="outlined"
                fullWidth
                onChange={handleFormChange}
                />
                <Input
                id="file-input"
                type="file"
                onChange={handleImgChange}
                inputProps={{ accept: 'image/*' }}
                />
                <DynamicJoditEditor
                ref={editor}
                value={content}
                onBlur={(newContent) => setContent(newContent)}
                onChange={(newContent) => setContent(newContent)}
                className='w-full h-full text-black'
                />
                <button onClick={handleSubmit} className='w-[150px] h-[40px] bg-blue-500 text-white flex justify-center items-center rounded-md'>
                submit</button>
                {error && <p className='text-red-500 bg-white p-5 rounded-md text-md'>{error}</p>}
                {success && <p className='text-green-500 bg-white p-5 rounded-md text-md'>{success}</p>}
            </div>
        </div>
    )
}