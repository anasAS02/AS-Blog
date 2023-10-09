import { DELETE_POST, MY_POSTS, SHOW_IMG } from "@/utils/apis";
import Image from "next/image";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGlobalContext } from "../Context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
const userName = Cookies.get('userName');

interface PostCardProps{
    id: string,
    userName: string,
    imgSrc: string,
    title: string,
    summary: string,
    createdAt: string
}

export type postProps = {
    _id: string,
    userName: string,
    title: string,
    summary: string,
    thumbnail: string,
    createdAt: string
}

export default function PostCard(props: PostCardProps){
    const { isLoggedIn } = useGlobalContext();
    const postId = props.id;
    const [posts, setPosts] = useState<any>()
    
    useEffect(() => {
        axios.get(MY_POSTS + userName).then((data) => setPosts(data.data.data.posts))
    }, [posts, setPosts])
    
    const handleDelete = async () => {
        try{
            await axios.delete(DELETE_POST + postId);
            location.reload();
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div key={props.id} className='w-full flex justify-start items-center gap-5 max-md:flex-col max-md:items-start'>
            <Link href={`/Posts/${props.id}`}>
                <Image className='rounded-md duration-300 hover:scale-105' src={SHOW_IMG+props.imgSrc}
                width={600} height={300}
                alt='post thumbnail'/>
            </Link>
            <div className='flex flex-col items-start gap-2'>
                <h4 className='text-yellow-500 text-xl max-md:text-sm'>{props.title}</h4>
                <p className='text-white text-xl max-md:text-sm'>{props.summary}</p>
                <p className='text-yellow-500 text-xl max-md:text-sm'><span className='text-white'>By: </span>{props.userName}</p>
                <p className='text-gray-500'>{props.createdAt.substring(0, props.createdAt.indexOf('T'))}</p>
                {isLoggedIn && userName == props.userName &&
                    <span className='flex items-center'>
                        <Link href={`/Posts/EditPost/${postId}`} >
                            <EditIcon className='text-slate-100 text-md duration-200 hover:text-blue-400 cursor-pointer' />
                        </Link>
                        <DeleteIcon onClick={handleDelete} className='text-slate-100 text-md duration-200 hover:text-red-500 cursor-pointer' />
                    </span>
                }
            </div>
        </div>
    )
}