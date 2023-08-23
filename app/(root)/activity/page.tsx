import { fecthUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


const Activity = async () => {

   const currUser = await currentUser();
   if(!currUser) return null;

   const userData = await fecthUser(currUser.id);
   if(!userData.onboarded) redirect('/onboarding');

   const activity = await getActivity(userData._id);
   console.log(activity);

   return (
    <section>
      <h1 className='mt-2 mb-5 text-4xl max-sm:text-3xl font-bold text-text'>Activity</h1>
      
      <div className="mt-10">
      {activity.length > 0 ? (
      <>
      {activity.map((reply) => (
         <Link key={reply._id} href={`/post/${reply.parentId}`}>
            <article className="flex flex-row items-center gap-4">
               <div className="relative sm:w-14 sm:h-14 w-10 h-10 object-contain">
               <Image src={reply.author.image} alt={reply.author.username} fill className="rounded-full object-cover"/>
               </div>

               <div className="flex flex-col gap-1">
               <i className="text-gray-400 text-sm">{reply.author.username} commented on your post:</i>
               <p className="text-text">
                  {reply.text}
               </p>
               </div>
            </article>
         </Link>
      ))}
      </>
      ) : (
      <p className="text-text text-lg font-semibold">No Activities yet</p>
      )}
      </div>

   </section>
   )
}
  
export default Activity;