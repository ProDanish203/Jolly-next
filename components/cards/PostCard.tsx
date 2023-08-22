import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props{
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        id: string;
        username: string;
        image: string;
    };
    group: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: Date;
    comments: {
        author: {
            image: string;
        }
    }[];
    isComment?: boolean;
}

export const PostCard = ({ 
    id, currentUserId, parentId, content, author, group, createdAt, comments, isComment }: Props) => {
  return (
    <>
    <div className={`${isComment ? "px-0 xs:px-7": "bg-bgDark1"} sm:px-5 py-5 px-2 rounded-md flex flex-col gap-2 items-start w-full sm:mb-12 mb-6`}>
        <div className='flex items-center justify-start'>
            <div className='flex w-full flex-1 flex-row gap-4'>
                <div className='flex flex-col items-center gap-0'>
                    <Link href={`/profile/${author.id}`} className='relative sm:w-14 sm:h-14 w-10 h-10 rounded-full object-cover'>
                        <Image src={author.image} alt={author.username} fill className='object-cover rounded-full'/>    
                    </Link>

                    <div className=' w-[1px] roumded-full bg-gray-700 h-[90%]'/>
                </div>

                <div className='flex justify-center flex-col gap-1 w-fit'>
                    <Link
                    href={`/profile/${author.id}`}
                    className='text-gray-500 max-xs:text-[12px]'>{author.username}</Link>

                    <p className='text-text  max-xs:text-sm my-2'>{content}</p>

                    <div className='flex items-center gap-5'>
                        <div className='flex items-center gap-2'>
                            <i className='far fa-heart text-text cursor-pointer max-xs:text-sm' title='like'></i>
                            <span className='text-gray-200 text-[14px]'>90</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Link href={`/post/${id}`}>
                                <i className='far fa-comment text-text cursor-pointer max-xs:text-sm' title='comment'></i>
                            </Link>
                            <span className='text-gray-200 text-[14px]'>90</span>
                        </div>
                        <i className='far fa-paper-plane text-text cursor-pointer max-xs:text-sm' title='share'></i>
                    </div>

                </div>

            </div>
        </div>
        
        {/* {isComments && comments.length > 0 && ( */}
            <div className='flex items-center gap-2 pl-5 mt-2'>
                <div>
                    <Image src={author.image} width={20} height={20} alt='replies'/>
                </div>
                <Link href={`/post/${id}`}>
                    <p className='text-text text-sm'>{comments.length} replies</p>
                </Link>
            </div>
        {/* )} */}
        
        <div className='pl-2 mt-2'>
            <p className='text-gray-700 text-sm max-sm:text-[12px] lowercase'>Posted: {createdAt.toLocaleTimeString()}, {createdAt.toDateString()}</p>
        </div>

    </div>
    </>
  )
}
