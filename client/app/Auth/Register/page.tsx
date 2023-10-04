"use client"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios'
import { REGISTER } from '@/utils/apis';
import Cookies from 'js-cookie';
export default function Register(){
    const [ form, setForm ] = useState({
            userName: '',
            password: ''
    })
    const [ error, setError ] = useState<string | null>(null);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({...form, [name]: value});
    }
    
    const handleRegister = async () => {
        try{
            const res = await axios.post(REGISTER, form);
            const token = res.data.data.token;
            const userName = res.data.data.userName;
            Cookies.set('token', token);
            Cookies.set('userName', userName);
            setForm({userName: '', password: ''})
            setError(null);
            window.location.pathname = '/';
        }catch(err: any){
            setError(err.response.data.message)
        }
      }
    return(
        <div className='h-screen flex flex-col gap-5 items-center justify-center'>
            <div className='bg-slate-200 p-5 w-fit rounded-2xl'>
            <TextField
                label="userName"
                name='userName'
                variant="outlined"
                fullWidth
                margin="normal"
                value={form.userName}
                onChange={handleFormChange}
            />
            <TextField
                label="Password"
                name='password'
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={handleFormChange}
            />
            <Button
                className='w-fit text-white bg-blue-600 hover:bg-blue-500'
                onClick={handleRegister}
            >
                Register
            </Button>
            <span className='text-sm ml-3 text-black'>Do you already have an account? <Link href='/Auth/Login' className='underline hover:text-yellow-500 duration-200'>Login now!</Link></span>
            {error && <p className='text-red-500 text-md mt-3'>{error}</p>}
            </div>
        </div>
    )
}