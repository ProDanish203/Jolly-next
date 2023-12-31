import { AccountProfile } from '@/components/forms';
import { fecthUser } from '@/lib/actions/user.actions';
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

const OnBoarding = async () => {

    const user = await currentUser();
    //@ts-ignore
    const userInfo = await fecthUser(user?.id);
    if(userInfo?.onboarded) redirect("/");

    const userData = {
      id: user?.id,
      objectId: userInfo?._id,
      username: userInfo?.username || user?.username,
      name: userInfo?.name || user?.firstName,
      bio: userInfo?.bio || "",
      image: userInfo?.image || user?.imageUrl,
    } 


  return (
    <main className='mx-auto flex-col flex justify-start py-20 md:px-10 px-5 max-w-3xl'>
        <h1 className='text-text text-lg head-text'>Onboarding</h1>
        <p className='mt-3 text-text'>Just a few steps to complete your profile...</p>

        <section className='text-text bg-bgDark1 p-10 max-md:p-5 mt-9 rounded-md' >
          {/* @ts-ignore */}
            <AccountProfile user={userData} btnTitle="Continue"/>
        </section>
    </main>
  )
}

export default OnBoarding;