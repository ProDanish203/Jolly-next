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

interface CommentParams{
    parentId: string;
    text:string;
    userId: string;
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


export const fetchPosts = async (pageNo = 1, limit = 20) => {
    try{
        connectDb();

        const skip = (pageNo - 1) * limit

        const posts = await Post.find({parentId: {$in: [null, undefined]}})
            .sort({createdAt: "desc"})
            .skip(skip)
            .limit(limit)
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


// Fecthing single Post
export const fetchPost = async (id:string) => {
    try{
        connectDb();

        const post =  await Post.findById(id)
            .populate({
                path: 'author',
                model: User,
                select: "_id id username image"
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: "_id id username image parentId"
                    },
                    {
                        path: 'children',
                        model: Post,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id username image parentId"
                        }
                    }
                ]
            });

        return post;

    }catch(error:any){
        throw new Error(`Failed to fetch post: ${error.message}`)
    }
}


export const addComment = async ({parentId, text, userId, path}: CommentParams) => {

    try{
        connectDb();

        // Finding the parent post
        const parentPost = await Post.findById(parentId);
        if(!parentPost){
            throw new Error(`Post not found`)
            return;
        }
        // Creating the comment post
        const commentQuery = new Post({
            text,
            author: userId,
            parentId
        })

        const comment = await commentQuery.save();
        
        // Update parent post for comments
        parentPost.children.push(comment._id);
        await parentPost.save();

        revalidatePath(path);

    }catch(error:any){
        throw new Error(`Failed to add comment: ${error.message}`);
    }
}