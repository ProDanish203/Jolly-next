import { PostCard } from '@/components/cards';
import { fetchPosts } from '@/lib/actions/post.actions';
import { currentUser } from '@clerk/nextjs';
import React from 'react'

const Home = async () => {
  
  const {posts, isNext} = await fetchPosts(1, 30);
  const user = await currentUser()
  return (
    <>
    <h1 className='mt-2 mb-5 text-4xl max-sm:text-3xl font-bold text-text'>Home</h1>

    {posts.length === 0 ? (
      <p>No posts to show</p>
    ) : (
     <>
     {posts.map((post) => (
      <PostCard key={post._id} 
      id={post._id}
      currentUserId={user?.id || ""}
      parentId={post.parentId}
      content={post.text}
      author={post.author}
      group={post.group}
      createdAt={post.createdAt}
      comments={post.children}
      />
     ))}
     </> 
    )}
    </>
  )
}

export default Home;