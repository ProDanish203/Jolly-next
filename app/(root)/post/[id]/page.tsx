import { PostCard } from "@/components/cards";
import { AddComment } from "@/components/forms";
import { fetchPost } from "@/lib/actions/post.actions";
import { fecthUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SinglePost = async ({params}: {params: {id: string}}) => {

  const {id} = params;
  if(!id) return null;

  const user = await currentUser();
  if(!user) return null;

  const userInfo  = await fecthUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding');

  const post = await fetchPost(id);

  return (
    <section>
      <PostCard
      id={post._id}
      currentUserId={user?.id || ""}
      parentId={post.parentId}
      content={post.text}
      author={post.author}
      group={post.group}
      createdAt={post.createdAt}
      comments={post.children}
      />

      <div className="mt-7 ">
        <h3 className="text-text sm:text-xl text-lg font-bold mb-2 ml-3">Add Comment</h3>
        <AddComment 
        threadId={post._id}
        currentUserImg={userInfo?.image}
        currentUserId={userInfo?._id || ""}
        />
      </div>

      <div className="mt-5">
        {console.log(post.children)}``
        {post.children.length > 0 && post.children.map((item:any) => (
          <PostCard
          key={item._id}
          id={item._id}
          currentUserId={user?.id || ""}
          parentId={item.parentId}
          content={item.text}
          author={item.author}
          group={post.group}
          createdAt={item.createdAt}
          comments={item.children}
          isComment={true}
          />
        ))}
        
      </div>

    </section>
  )
}

export default SinglePost;