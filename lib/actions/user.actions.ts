"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectDb } from "../mongoose";
import Post from "../models/post.model";
import postcss from "postcss/lib/postcss";
import { SortOrder, FilterQuery } from "mongoose";

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


export async function fetchAllUsers({
    userId,
    pageNo = 1, 
    limit = 30,
    searchString = "",
    sortBy = "desc",
}: {
    userId: string;
    pageNo?: number;
    limit?: number;
    searchString?: string;
    sortBy?: SortOrder;
}){
    try{    
        connectDb();

        const skip = (pageNo - 1) * limit;

        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof User> = {
            id: { $ne: userId}
        }

        if(searchString.trim() !== ""){
            query.$or = [
                {username: {$regex: regex}},
                {name: {$regex: regex}},
            ]
        }

        const sortOptions = {createdAt: sortBy};

        const users = await User.find()
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)

        const totalUsersCount = await User.countDocuments(query);

        const isNext = totalUsersCount > skip + users.length

        return {users, isNext};
    }catch(error:any){
        throw new Error(`Failed to fetch all users: ${error.message}`);
    }
}


export async function getActivity(userId: string){
    try{
        connectDb();
        // Finding all the user's posts
        const userPosts = await Post.find({author: userId}); 

        // finding the replies and storing it in an array
        const childPostIds = userPosts.reduce((acc, userPost) => {
            return acc.concat(userPost.children);
        }, []); 

        const replies = await Post.find({
            _id: {$in: childPostIds},
            author: { $ne: userId }
        }).populate({
            path: "author",
            model: User,
            select: "username image _id"
        })

        return replies;
    }catch(error:any){
        throw new Error(`Failed to fetch activity: ${error.message}`);
    }
}