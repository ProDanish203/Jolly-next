"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectDb } from "../mongoose";
import Post from "../models/post.model";
import postcss from "postcss/lib/postcss";

interface Params{
    userId:string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

export async function updateUser({
    userId, username, name, bio, image, path 
}: Params): Promise<void>{
    connectDb();

    try{
        await User.findOneAndUpdate(
            {id: userId},
            {
                username: username.toLowerCase(),
                name, bio, image, 
                onboarded: true
            },
            { upsert: true }
        )
    
        if(path === '/profile/edit'){
            revalidatePath(path)
        }
    }catch(error: any){
        throw new Error(`Failed to update profile: ${error.message}`)
    }
}

export async function fecthUser(userId: string){
    try{
        connectDb();

        return await User.
            findOne({id: userId})
            // .populate({
            //     path: 'groups',
            //     model: Groups
            // })

    }catch(error: any){  
        throw new Error(`Failed to fecth User: ${error.message}`);
    }
}

export async function fetchUserPosts(userId:string){
    try{
        connectDb();

        const posts = await User.findOne({id: userId})
            .populate({
                path: 'posts', 
                model: Post,
                populate: {
                    path: "children",
                    model: Post,
                    populate: {
                        path: "author",
                        model: User,
                        select: "username image id _id"
                    }
                }
            })

        return posts;

    }catch(error:any){
        throw new Error(`Failed to fecth User: ${error.message}`);
    }
}