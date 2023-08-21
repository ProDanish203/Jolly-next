"use server"
import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectDb } from "../mongoose";

interface Params{
    text:string;
    author: string;
    groupId: string | null;
    path: string;
}

export async function createPost({text, author, groupId, path}:Params){
    try{
        connectDb();
        // Creating the post
        const post = await Post.create({
            text,
            author,
            group: null
        });

        // Updating the post of the user
        await User.findByIdAndUpdate(author, {
            $push: { posts: post._id }
        })

        revalidatePath(path);

    }catch(error){
        throw new Error(`Failed to create post: ${error}`);
    }
}


export const fetchPosts = async (pageNo = 1, noOfPosts = 20) => {
    try{
        connectDb();

        const skip = (pageNo - 1) * noOfPosts

        const posts = await Post.find({parentId: {$in: [null, undefined]}})
            .sort({createdAt: "desc"})
            .skip(skip)
            .limit(noOfPosts)
            .populate({path: 'author', model: User})
            .populate({
                path: "children",
                populate: {
                    path: 'author',
                    model: User,
                    select: '_id name parentId image'
                }
            })

        const totalPostsCount = await Post.countDocuments({ parentId: {$in: [null, undefined]}});

        // @ts-ignore
        // const posts = await postQuery.exec(); 
        
        const isNext = totalPostsCount > skip + posts.length

        return { posts, isNext }

    }catch(error:any){
        throw new Error(`Failed to fetch posts: ${error.message}`);
    }
}