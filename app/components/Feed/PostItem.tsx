"use client"

import { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";

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
  } from "@/components/ui/alert-dialog"
import { deletePost } from './deleteAction';
import { toast } from '@/components/ui/use-toast';


type PostItemProps = {

    data: any;
    userData: any;
    userId: string;

};

export const PostItem = ({ data, userData, userId }: PostItemProps) => {
    const postUser = userData.find((user: any) => user._id === data.userId);

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
            })
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    return (
        <div className="w-full border rounded-lg py-4 px-6 my-4">
            <div className="flex gap-2 items-center">
                <div className="w-10 h-10 border rounded-full" />
                <p className="text-lg">{postUser?.navn}</p>
            </div>
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
                        <video src={media.url} controls  className='w-full rounded-lg h-auto'/>
                    )}
                </div>
            ))}
            <div className='flex justify-between items-center mt-2'>
                <div>
                    <p className='text-sm text-gray-600'>{formattedDate}</p>
                </div>
                {alertDialog({handleDelete, data, sessionUser: userId})}
            </div>
        </div>
    );
};

type AlertDialogProps = {

    handleDelete: any;
    sessionUser: string;
    data: any;

};

const alertDialog = ({handleDelete, sessionUser, data}: AlertDialogProps) => {

    if (sessionUser !== data.userId) {
        return <p>test</p>
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
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
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
