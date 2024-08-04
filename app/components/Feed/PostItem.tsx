"use client"

import { useEffect, useState } from 'react';
import { MdDelete, MdFavorite, MdFavoriteBorder, MdModeComment } from "react-icons/md";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePost } from './deleteAction';
import { toast } from '@/components/ui/use-toast';
import { PAGE_URL } from '@/app/url';
import Link from 'next/link';
import { Avatar } from '@/components/Avatar';
import { createComment, likePost } from './action';
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from 'react-icons/ai';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FaRegComment } from 'react-icons/fa6';

import { FiSend } from "react-icons/fi";


interface User {
    _id: string;
    navn: string;
    profilImgUrl: string;
}

type PostItemProps = {
    data: any;
    userData: User[];
    userId: string;
};

export const PostItem = ({ data, userData, userId }: PostItemProps) => {
    const postUser = userData.find((user: any) => user._id === data.userId);

    // Create a map of user IDs to user objects
    const userMap = new Map(userData.map((user: any) => [user._id, user]));

    const formattedDate = new Date(data.createdAt).toLocaleDateString('da-DK', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const handleDelete = async () => {
        const postId = data._id;
        try {
            await deletePost(postId);
            toast({
                title: "Post slettet",
                description: "Din post er blevet slettet",
            });
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    const [liked, setLiked] = useState(false);
    const [likeLoadingState, setLikeLoadingState] = useState(true);
    const router = useRouter();

    const [commentSectionOpen, setCommentSectionOpen] = useState(false);

    const [comment, setComment] = useState('');

    useEffect(() => {
        if (!data.likes) {
            console.error('data.likes is undefined');
            setLiked(false);
            return;
        }
        
        if (!userId) {
            console.error('userId is undefined');
            setLiked(false);
            return;
        }
        
        const likedByUser = data.likes.includes(userId);
        setLiked(likedByUser);
        setLikeLoadingState(false);
    }, [data.likes, userId]);

    const handleLike = async () => {
        setLikeLoadingState(true);
    
        try {
            const result = await likePost(data._id);
            if (result.success === "Liked" || result.success === "Unliked") {
                // Refresh data to reflect the change
                router.refresh();
            } else {
                // Handle unexpected responses
                console.error("Unexpected response from likePost:", result);
            }
        } catch (error) {
            console.error("Failed to like/unlike post:", error);
        } finally {
            setLikeLoadingState(false);
        }

    };

    const handleCommentClick = () => {

        setCommentSectionOpen(!commentSectionOpen);

    };

    const handleCommentChange = (value: string) => {
        setComment(value);
    }

    const handleComment = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createComment(data._id, comment);
        } catch (error) {
            console.error("Failed to create comment:", error);
        }
    };
    
    

    return (
        <div className="w-full border rounded-lg py-4 px-6 my-4">
            {userId === data.userId && (
                <Link className="flex gap-2 items-center" href={`${PAGE_URL}/min-profil`}>
                    <Avatar profilImgUrl={postUser?.profilImgUrl} size={10}/>
                    <p className="text-lg font-bold">{postUser?.navn} <span className='font-light text-gray-800 text-sm'>(dig)</span></p>
                </Link>
            )}
            {userId !== data.userId && (
                <Link className="flex gap-2 items-center" href={`${PAGE_URL}/fiskerne/${data.userId}`}>
                    <Avatar profilImgUrl={postUser?.profilImgUrl} size={10}/>
                    <p className="text-lg">{postUser?.navn}</p>
                </Link>
            )}
            <div className="p-6">
                <div>{formatContent(data.content)}</div>
            </div>
            {data.media && data.media.length > 0 && data.media.map((media: any) => (
                <div key={media._id} className="w-full flex justify-center">
                    {media.type.startsWith('image') ? (
                        <img 
                            src={media.url} 
                            alt="Post media" 
                            className="w-4/5 rounded-lg h-auto"
                        />
                    ) : (
                        <video src={media.url} controls className='w-full rounded-lg h-auto'/>
                    )}
                </div>
            ))}
            <div>
                {commentSectionOpen && (
                    <>
                        {commentSection({data, handleComment, handleCommentChange})}
                    </>
                )}
            </div>
            <div className='flex justify-between items-center mt-2'>
                <div>
                    <p className='text-sm text-gray-600'>{formattedDate}</p>
                </div>
                <div className='flex gap-2'>
                    <div className='flex gap-4 items-center'>
{/*                         
                        <div>
                            {commentIcon({data, handleCommentClick})}
                        </div>
                         */}
                        <div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className='flex gap-1 items-center'>
                                        {likeLoadingState && <p><AiOutlineLoading className='animate-spin' /></p>}
                                        {!likeLoadingState && (
                                            <>
                                                {likeButton({handleLike, liked})}
                                                <p className='tracking-tight'>
                                                    {data.likes.length} {data.likes.length === 1 ? 'like' : 'likes'}
                                                </p>
                                            </>
                                        )}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className='flex flex-col gap-2'>
                                            {data.likes?.map((likeId: string) => {
                                                const user = userMap.get(likeId);
                                                return user ? (
                                                    <div className='flex items-center gap-2 p-1 rounded-sm'>
                                                        <Avatar profilImgUrl={user.profilImgUrl} size={8}/>
                                                        {userId === likeId ? (
                                                            <p className='text-sm'>{user.navn} (dig)</p>
                                                        ) : user ? (
                                                            <p className='text-sm'>{user.navn}</p>
                                                        ) : (
                                                            <p className='text-sm'>Unknown user</p>
                                                        )}
                                                    </div>
                                                ) : null;
                                            })}
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        {alertDialog({handleDelete, data, sessionUser: userId})}
                    </div>
                </div>
            </div>
        </div>
    );
};

type AlertDialogProps = {
    handleDelete: any;
    sessionUser: string;
    data: any;
};

const likeButton = ({ handleLike, liked }: any) => (
    <div className='hover:bg-blue-200 flex items-center justify-center p-1 rounded'>
        {liked ? (
            <MdFavorite size={25} onClick={handleLike} className='text-red-500'/>
        ) : (
            <MdFavoriteBorder size={25} onClick={handleLike} />
        )}
    </div>
);

const commentIcon = ({ data, handleCommentClick }: any) => (
    <div className='flex gap-2 items-center'>
        <div className='hover:bg-blue-200 flex items-center justify-center p-1 rounded'>
            <FaRegComment size={25} onClick={handleCommentClick}/>
        </div>
        <p>{data.comments?.length} kommentarer</p>
    </div>
)

const commentSection = ({ data, handleComment, handleCommentChange }:any) => {
    return (
        <div className='flex flex-col gap-2'>
            <form className='w-full flex items-center' onSubmit={handleComment}>
                <input
                    onChange={(e) => handleCommentChange(e.target.value)}
                    type='text'
                    placeholder='Skriv en kommentar'
                    className='w-full border rounded-lg p-2'
                />
                <button type='submit' className='bg-blue-500 text-white rounded-lg p-2 ml-5'>
                    <FiSend size={20} />
                </button>
            </form>
            {data.comments.length === 0 && (
                <p className='text-gray-600 text-sm'>Ingen kommentarer endnu</p>
            )}
            {data.comments.length > 0 && (
                <>
                    {data.comments.map((comment:any) => (
                        <div key={comment._id} className='flex gap-2 items-center'>
                            <Avatar profilImgUrl={comment.userId.profilImgUrl} size={8} />
                            <p>{comment.content}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

const alertDialog = ({ handleDelete, sessionUser, data }: AlertDialogProps) => {
    if (sessionUser !== data.userId) {
        return null;
    } else {
        return (
            <div>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <div className='hover:bg-red-200 flex items-center justify-center p-1 rounded'>
                            <MdDelete size={25}/>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Sikker på du vil slette din post?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Du vil ikke kunne genskabe din post efter du har slettet den.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Afbryd</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Slet!</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        )
    }
}

const formatContent = (content: string) => {
    return content.split('\n').map((item, key) => (
        <span key={key}>
            {item}
            <br />
        </span>
    ));
};
