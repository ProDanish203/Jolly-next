import { NewPost } from "@/components/forms";
import { fecthUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const CreatePost = async () => {

    const user = await currentUser();
    if(!user) return null;

    const userData = await fecthUser(user.id);
    if(!userData.onboarded) redirect('/onboarding');

  return (
    <>
    <section className="">
        <h1 className="sm:text-4xl text-3xl font-bold text-text">Create Post</h1>

        <NewPost userId={userData._id}/>
    </section>
    </>
  )
}

export default CreatePost