import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { PostCard } from "../cards";
import { currentUser } from "@clerk/nextjs";

interface Props{
    currentUserId: string;
    profileId: string;
    accountType: string;
}

export const PostsTab = async ({currentUserId, profileId, accountType}: Props) => {

    const user = await currentUser()
    if(!user) return null;

    const posts = await fetchUserPosts(profileId);
    if(!posts) redirect('/');

  return (
    <section className="mt-6">
    {posts.posts.map((post:any) => (
        <PostCard
        id={post._id}
        currentUserId={user?.id || ""}
        parentId={post.parentId}
        content={post.text}
        author={
            accountType === "User" 
            ? {username: posts.username, image: posts.image, id: posts.id} 
            : {username: post.username, image: post.image, id: post.id} 
        }
        group={post.group}
        createdAt={post.createdAt}
        comments={post.children}
        />
    ))}
    </section>
  )
}
