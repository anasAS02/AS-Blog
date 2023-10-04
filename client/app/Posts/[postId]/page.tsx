'use client'

import { COMMENTS, CREATE_COMMENT, DELETE_COMMENT, POST, SHOW_IMG, UPDATE_COMMENT } from "@/utils/apis";
import { Box, List, TextField, Typography, ListItem } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react"
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGlobalContext } from "@/app/Context/UserContext";
import Link from "next/link";

export default function Post({params}:any){

    const postId = params.postId;
    const userName = Cookies.get('userName');
    const [post, setPost] = useState<any>();
    const [comment, setComment] = useState<string>('')
    const [comments, setComments] = useState<[]>([]);
    const [oldComment, setOldComment] = useState<any>()
    const [editComment, setEditComment] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { isLoggedIn } = useGlobalContext();

    type commentProps = {
        _id: any,
        userName: string,
        text: string,
        createdAt: string
    }

    useEffect(() => {
        axios.get(POST + postId).then((data) => setPost(data.data.data.foundPost))
        axios.get(COMMENTS+postId).then((data) => setComments(data.data.data?.comments))
    }, [comments, setComments])

    const handleComment = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setComment(value)
    }

    const createComment = async (e: React.MouseEvent) =>{
        e.preventDefault();
        const data = {
            "text": comment,
            "userName": userName,
            "postId": postId
        }
        try{        
            await axios.post(CREATE_COMMENT, data)
            console.log('Comment Added')
            setComment('')
            setError(null);
        }catch(err: any){
            setError(err.response?.data.message)
        }
    }

    const handleUpdate = (id: any) => {
        setEditComment(true);
        const oldComment = (comments.find((comment: commentProps) => comment._id === id));
        if(oldComment){
            setComment(oldComment.text);
            setOldComment(oldComment)
        }
    }

    const updateComment = async (oldComment: commentProps) => {
        try{
            await axios.put(UPDATE_COMMENT + oldComment._id, {text: comment})
            setEditComment(false);
        }catch(err){
            console.log(err)
        }
    }
        
    const handleDelete = async (id: any) => {
        await axios.delete(DELETE_COMMENT + id);
    }

    return(
        <div className='w-full lg-h-full flex flex-col text-white mt-36 max-md:mt-56'>
            <div className='w-full'>
                <Image src={SHOW_IMG + post?.thumbnail} width={600} height={100} className='w-full rounded-md mix-blend-hard-light' alt='post thumbnail'/>
            </div>
            <div className='h-full p-14' dangerouslySetInnerHTML={{ __html: post?.content }}>
            </div>
            <Box className='bg- text-whote p-5 rounded-md mb-8 w-full'>
                 <Typography variant="h5">Comments</Typography>
                    <List>
                        {comments?.map((comment: commentProps, i) => (
                        <ListItem key={i} className='flex flex-col items-start justify-center'>
                            <span className='flex gap-1'>
                                <AccountCircleIcon className='text-4xl' />
                                <span className='flex gap-5 items-center text-gray-300 text-sm'>
                                    <p className='text-yellow-500 text-lg'>
                                        @{comment.userName}
                                    </p>
                                    {comment.createdAt.substring(0, comment.createdAt.indexOf('T'))}
                                </span>
                            </span>
                            <span className='flex flex-col ml-10 text-xl max-md:text-lg'>
                                {comment.text}
                                {userName == comment.userName &&
                                    <span className='flex items-center'>
                                        <EditIcon onClick={() => handleUpdate(comment._id)} className='text-sm duration-200 hover:text-blue-400 cursor-pointer' />
                                        <DeleteIcon onClick={(() => handleDelete(comment._id))} className='text-sm duration-200 hover:text-red-500 cursor-pointer' />
                                    </span>
                                }
                            </span>
                        </ListItem>
                        )) }
                    </List>
                    <span className='flex justify-between items-center gap-5'>
                        <TextField
                            className='bg-slate-100 opacity-95 rounded-lg mt-4'
                            name='comment'
                            placeholder='Enter your comment ...'
                            value={comment}
                            variant="outlined"
                            fullWidth
                            onChange={handleComment}
                        />
                        {error && <p className='text-red-500 text-md mt-3'>{error}</p>}{isLoggedIn ?
                        <SendIcon className='mt-4 text-blue-400 text-2xl hover:text-blue-300 duration-300 cursor-pointer' onClick={editComment ? () => updateComment(oldComment) : createComment} />
                        : <Link href='/Auth/Login' className='mt-4 text-yellow-500 text-xl hover:text-yellow-400 duration-300'>Login first</Link>}
                    </span>
          </Box>
        </div>
    )
}