"use client"

import { useEffect, useState } from 'react';
import { MdDelete, MdFavorite, MdFavoriteBorder } from "react-icons/md";
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
import { createComment, deleteComment, likePost } from './action';
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from 'react-icons/ai';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FaRegComment } from 'react-icons/fa6';
import { FiSend } from "react-icons/fi";
import { Skeleton } from '@/components/ui/skeleton';


type PostItemProps = {
    data: any;
    sessionUserId: string;
};

export const PostItem = ({ data, sessionUserId }: PostItemProps) => {

    const formattedDate = new Date(data.createdAt).toLocaleDateString('da-DK', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const handleDelete = async () => {
        try {
            const result = await deletePost(data);
            if (result.success) {
                toast({
                    title: "Post slettet",
                    description: "Din post er blevet slettet",
                });
                router.refresh();
            } else {
                toast({
                    title: "Fejl",
                    description: result.error || "Noget gik galt.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
            toast({
                title: "Fejl",
                description: "Kunne ikke slette posten.",
                variant: "destructive",
            });
        }
    };
    

    const [liked, setLiked] = useState(false);
    const [likeLoadingState, setLikeLoadingState] = useState(false);
    const router = useRouter();

    const [commentSectionOpen, setCommentSectionOpen] = useState(false);

    const [commentLoading, setCommentLoading] = useState(false);

    const [comment, setComment] = useState('');
    const handleLike = async () => {

        setLikeLoadingState(true);
    
        try {
            const result = await likePost(data._id);
            if (result.success === "Liked" || result.success === "Unliked") {
            } else {
                console.error("Unexpected response from likePost:", result);
            }
        } catch (error) {
            console.error("Failed to like/unlike post:", error);
        } finally {
            router.refresh();
            setLikeLoadingState(false);
        }
    };

    const handleCommentClick = () => {
        setCommentSectionOpen(!commentSectionOpen);
    };

    const handleCommentChange = (value: string) => {
        setComment(value);
    }


    const handleCommentDelete = async (commentId:any) => {

        setCommentLoading(true);

        console.log(`Attempting to delete comment with ID: ${commentId}`);
        try {
            const response = await deleteComment(data._id, commentId);
            if (response.success === "CommentDeleted") {
                toast({
                    title: "Kommentar slettet",
                });
                // Update state to reflect the deleted comment
                data.comments = data.comments.filter((comment:any) => comment._id !== commentId);
                // Re-render the component to show the updated comments
                setCommentSectionOpen(false);
                setCommentSectionOpen(true);
            } else {
                toast({
                    title: "Fejl ved sletning",
                    description: response.failure,
                });
                console.error(`Failed to delete comment: ${response.failure}`);
            }
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }

        setCommentLoading(false);
    };
    

    const handleComment = async (e: React.ChangeEvent<HTMLFormElement>) => {

        setCommentLoading(true);
        e.preventDefault();
        if (!comment) {
            toast({
                title: "Kommentar kan ikke være tom",
            });
            return;
        }
        try {
            await createComment(data._id, comment);
            setComment('');
            toast({
                title: "Kommentar oprettet",
            });
        } catch (error) {
            console.error("Failed to create comment:", error);
        }
        router.refresh();
        setCommentLoading(false);
    };

    const user = data.userId;
    
    const latestComment = data.comments[data.comments.length - 1];

    
    return (
        <div className="w-full border rounded-lg py-4 px-6 my-4">
            {sessionUserId === data.userId._id && (
                <Link className="flex gap-2 items-center" href={`${PAGE_URL}/min-profil`}>
                    <Avatar profilImgUrl={user?.profilImgUrl} size={10}/>
                    <p className="text-lg font-bold">{user?.navn} <span className='font-light text-gray-800 text-sm'>(dig)</span></p>
                </Link>
            )}
            {sessionUserId !== data.userId._id && (
                <Link className="flex gap-2 items-center" href={`${PAGE_URL}/fiskerne/${data.userId._id}`}>
                    <Avatar profilImgUrl={user?.profilImgUrl} size={10}/>
                    <p className="text-lg">{user?.navn}</p>
                </Link>
            )}
            <div className="p-6">
                <div>{formatContent(data.content)}</div>
            </div>
                <div className="w-full flex justify-center">
                    {data.image && data.image.type === "image" && (
                        <img 
                            src={data.image.url} 
                            alt="Post media" 
                            className="w-4/5 rounded-lg h-auto"
                        />
                    )}
                    {data.image && data.image.type === "video" && (
                        <video src={data.image.url} controls className='w-full rounded-lg h-auto'/>
                    )}
                </div>
            <div className='mt-4'>
                {commentSectionOpen && (
                    <>
                        {commentSection({data, handleComment, handleCommentChange, handleCommentDelete, comment, sessionUserId, commentLoading})}
                    </>
                )}

                    {(data.comments && data.comments.length > 0 && !commentSectionOpen) && (

                        
                        <div className='border p-2 rounded-md'>
                            <div className='flex gap-2 items-center'>
                                <Avatar profilImgUrl={latestComment.userId.profilImgUrl} size={8}/>
                                <p>{latestComment.userId.navn}</p>
                                <p>{latestComment.content}</p>
                            </div>
                        </div>
                    )}

                

            </div>
            <div className='flex justify-between items-center mt-2'>
                <div>
                    <p className='text-sm text-gray-600'>{formattedDate}</p>
                </div>
                <div className='flex gap-2'>
                    <div className='flex gap-4 items-center'>                       
                        <div>
                            {commentIcon({data, handleCommentClick})}
                        </div>
                        <div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className='flex gap-1 items-center'>
                                        {likeLoadingState && <p><AiOutlineLoading className='animate-spin' /></p>}
                                        {!likeLoadingState && (
                                            <>
                                                {likeButton({handleLike, liked, data, sessionUserId})}
                                                <p className='tracking-tight'>
                                                    {data.likes.length} {data.likes.length === 1 ? 'like' : 'likes'}
                                                </p>
                                            </>
                                        )}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className='flex flex-col gap-2'>
                                            {data.likes?.map((likeUser: any) => {
                                                return user ? (
                                                    <div key={likeUser._id} className='flex items-center gap-2 p-1 rounded-sm'>
                                                        <Avatar profilImgUrl={likeUser.profilImgUrl} size={8}/>
                                                        {sessionUserId === likeUser._id ? (
                                                            <p className='text-sm'>{likeUser.navn} (dig)</p>
                                                        ) : likeUser ? (
                                                            <p className='text-sm'>{likeUser.navn}</p>
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
                        {alertDialog({handleDelete, data, sessionUser: sessionUserId})}
                    </div>
                </div>
            </div>
        </div>
    );
};

const likeButton = ({ data, handleLike, sessionUserId }: any) => {

    const likedByUser = data.likes.some((like: any) => like._id === sessionUserId);

    return (
        <div className='hover:bg-blue-200 flex items-center justify-center p-1 rounded'>
            {likedByUser ? (
                <MdFavorite size={25} className='text-red-500' onClick={handleLike}/>
            ) : (
                <MdFavoriteBorder size={25} onClick={handleLike} />
            )}
        </div>
    );
};



const commentIcon = ({ data, handleCommentClick }: any) => (
    <div className='flex gap-2 items-center'>
        <div className='hover:bg-blue-200 flex items-center justify-center p-1 rounded'>
            <FaRegComment size={25} onClick={handleCommentClick}/>
        </div>
        <p>{data.comments?.length} kommentarer</p>
    </div>
)

const commentSection = ({ data, handleComment, handleCommentChange, handleCommentDelete, comment, sessionUserId, commentLoading }: any) => {
    return (
        <div className='flex flex-col gap-2'>
            <form className='w-full flex items-center' onSubmit={handleComment}>
                <input
                    onChange={(e) => handleCommentChange(e.target.value)}
                    type='text'
                    placeholder='Skriv en kommentar'
                    className='w-full border rounded-lg p-2'
                    value={comment}
                />
                <button type='submit' className='bg-blue-500 text-white rounded-lg p-2 ml-5'>
                    <FiSend size={20} />
                </button>
            </form>
            {data.comments.length === 0 && (
                <p className='text-gray-600 text-sm'>Ingen kommentarer endnu</p>
            )}
            {commentLoading && (
                <div className='flex items-center gap-2'>
                    <Skeleton className='w-full h-14 p-2' />
                </div>
            )}
            {data.comments.length > 0 && (
                <div className='flex flex-col-reverse gap-2'>
                    {data.comments.map((comment: any) => {
                        return (
                            <div key={comment._id} className='flex justify-between p-2 border rounded-md h-14'>
                                <div className='flex gap-2 items-center'>
                                    <Avatar profilImgUrl={comment.userId.profilImgUrl} size={8} />
                                    <p className='flex gap-4'><span className='text-gray-800 font-bold'>{comment?.userId.navn}</span>{comment.content}</p>
                                </div>
                                {comment.userId._id === sessionUserId && (
                                    <button type='button' onClick={() => handleCommentDelete(comment._id)} className='text-red-500'>Slet</button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};


type AlertDialogProps = {
    handleDelete: () => void;
    sessionUser: string;
    data: any;
};

const alertDialog = ({ handleDelete, sessionUser, data }: AlertDialogProps) => {
    return (
        <>
            {data.userId._id === sessionUser && (
                <AlertDialog>
                    <AlertDialogTrigger>
                        <MdDelete size={20}/>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Er du sikker, du vil slette denne post?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Denne handling kan ikke fortrydes.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuller</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>
                                Slet
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
};

const formatContent = (content: string) => {
    return content.split('\n').map((item, key) => (
        <span key={key}>
            {item}
            <br />
        </span>
    ));
};
